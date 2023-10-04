import equal from 'fast-deep-equal';
import { flatten } from 'flat';
import moment from 'moment';
import { _, locale } from 'svelte-i18n';
import { derived, get, writable } from 'svelte/store';
import { getOptions } from '$lib/components/contents/details/widgets/relation/helper';
import {
  allEntries,
  getEntriesByCollection,
  getFieldByKeyPath,
  selectedCollection,
  selectedEntries,
} from '$lib/services/contents';
import { editorLeftPane, editorRightPane } from '$lib/services/contents/editor';
import { getPropertyValue } from '$lib/services/contents/entry';
import { prefs } from '$lib/services/prefs';
import { getDateTimeParts } from '$lib/services/utils/datetime';
import LocalStorage from '$lib/services/utils/local-storage';
import { stripSlashes } from '$lib/services/utils/strings';

const storageKey = 'sveltia-cms.contents-view';
/**
 * @see https://decapcms.org/docs/configuration-options/#sortable_fields
 */
const defaultSortableFields = ['title', 'name', 'date', 'author', 'description'];

/**
 * View settings for the selected folder collection.
 * @type {import('svelte/store').Writable<EntryListView>}
 */
export const currentView = writable({});

/**
 * Transform summary template.
 * @param {string} summary Original summary.
 * @param {string} tf Transformation.
 * @param {Field} fieldConfig Field configuration.
 * @returns {string} Transformed summary.
 * @see https://decapcms.org/docs/beta-features/#summary-string-template-transformations
 */
const transformSummary = (summary, tf, fieldConfig) => {
  if (tf === 'upper') {
    return String(summary).toUpperCase();
  }

  if (tf === 'lower') {
    return String(summary).toLowerCase();
  }

  if (tf.startsWith('date') && fieldConfig) {
    const [, format] = tf.match(/^date\('(.*?)'\)$/);

    const { time_format: timeFormat, picker_utc: pickerUTC = false } =
      /** @type {DateTimeField} */ (fieldConfig);

    const dateOnly = timeFormat === false;

    return (
      pickerUTC ||
      (dateOnly && !!summary?.match(/^\d{4}-[01]\d-[0-3]\d$/)) ||
      (dateOnly && !!summary.match(/T00:00(?::00)?(?:\.000)?Z$/))
        ? moment.utc(summary)
        : moment(summary)
    ).format(format);
  }

  if (tf.startsWith('default')) {
    const [, defaultValue] = tf.match(/^default\('?(.*?)'?\)$/);

    return summary ?? defaultValue;
  }

  if (tf.startsWith('ternary')) {
    const [, truthyValue, falsyValue] = tf.match(/^ternary\('?(.*?)'?,\s*'?(.*?)'?\)$/);

    return summary ? truthyValue : falsyValue;
  }

  if (tf.startsWith('truncate')) {
    const [, number, string = ''] = tf.match(/^truncate\((\d+)(?:,\s*'?(.*?)'?)?\)$/);
    const max = Number(number);
    const truncated = String(summary).substring(0, max);

    return String(summary).length > max ? `${truncated}${string}` : truncated;
  }

  return summary;
};

/**
 * Parse the collection summary template to generate the summary to be displayed on the entry list.
 * @param {Collection} collection Entry’s collection.
 * @param {Entry} entry Entry.
 * @param {EntryContent} content Entry content.
 * @returns {string} Formatted summary.
 * @see https://decapcms.org/docs/configuration-options/#summary
 */
export const formatSummary = (collection, entry, content) => {
  const {
    name: collectionName,
    folder: collectionFolder,
    identifier_field: identifierField,
    summary: summaryTemplate,
    _i18n: { defaultLocale = 'default' },
  } = collection;

  // Fields other than `title` should be defined with `identifier_field` as per the Netlify/Decap
  // CMS document, but actually `name` also works as a fallback. We also use the label` property and
  // the entry slug.
  if (!summaryTemplate) {
    return content[identifierField] || content.title || content.name || content.label || entry.slug;
  }

  const valueMap = flatten(content);
  const entryPath = entry.locales[defaultLocale].path;

  /**
   * @param {string} tag Field name or one of special tags.
   * @returns {string} Replaced string.
   */
  const replace = (tag) => {
    const [fieldName, ...transformations] = tag.split(/\s*\|\s*/);
    const fieldConfig = getFieldByKeyPath(collectionName, undefined, fieldName, valueMap);

    let summary = (() => {
      if (tag === 'slug') {
        return entry.slug;
      }

      if (tag === 'dirname') {
        return stripSlashes(entryPath.replace(/[^/]+$/, '').replace(collectionFolder, ''));
      }

      if (tag === 'filename') {
        return entryPath.split('/').pop().split('.').shift();
      }

      if (tag === 'extension') {
        return entryPath.split('/').pop().split('.').pop();
      }

      if (tag === 'commit_date') {
        return entry.commitDate || '';
      }

      if (tag === 'commit_author') {
        return entry.commitAuthor?.name || entry.commitAuthor?.login || entry.commitAuthor?.email;
      }

      const fieldValue = valueMap[fieldName];

      // Resolve the displayed value for a relation field
      if (fieldConfig?.widget === 'relation') {
        const relFieldConfig = /** @type {RelationField} */ (fieldConfig);
        const refEntries = getEntriesByCollection(relFieldConfig.collection);
        const refOptions = getOptions(defaultLocale, relFieldConfig, refEntries);
        const label = refOptions.find((option) => option.value === fieldValue)?.label;

        return label || fieldValue;
      }

      return fieldValue;
    })();

    if (!summary) {
      return '';
    }

    if (!transformations.length) {
      if (summary instanceof Date) {
        const { year, month, day } = getDateTimeParts({ date: summary });

        return `${year}-${month}-${day}`;
      }

      return String(summary);
    }

    transformations.forEach((tf) => {
      summary = transformSummary(summary, tf, fieldConfig);
    });

    return String(summary);
  };

  return summaryTemplate.replace(/{{(.+?)}}/g, (_match, tag) => replace(tag)).trim();
};

/**
 * Sort the given entries.
 * @param {Entry[]} entries Entry list.
 * @param {SortingConditions} [conditions] Sorting conditions.
 * @returns {Entry[]} Sorted entry list.
 * @see https://decapcms.org/docs/configuration-options/#sortable_fields
 */
const sortEntries = (entries, { key, order } = {}) => {
  if (!key || !order) {
    return entries;
  }

  const _entries = [...entries];
  const { defaultLocale = 'default' } = get(selectedCollection)._i18n;

  const type =
    { slug: String, commit_author: String, commit_date: Date }[key] ||
    (_entries.length ? getPropertyValue(_entries[0], defaultLocale, key)?.constructor : String) ||
    String;

  const valueMap = Object.fromEntries(
    _entries.map((entry) => [entry.slug, getPropertyValue(entry, defaultLocale, key)]),
  );

  _entries.sort((a, b) => {
    const aValue = valueMap[a.slug];
    const bValue = valueMap[b.slug];

    if (aValue === undefined || bValue === undefined) {
      return 0;
    }

    if (type === String) {
      return aValue.localeCompare(bValue);
    }

    if (type === Date) {
      return Number(aValue) - Number(bValue);
    }

    return aValue - bValue;
  });

  if (order === 'descending') {
    _entries.reverse();
  }

  return _entries;
};

/**
 * Filter the given entries.
 * @param {Entry[]} entries Entry list.
 * @param {FilteringConditions} [conditions] Filtering conditions.
 * @returns {Entry[]} Filtered entry list.
 * @see https://decapcms.org/docs/configuration-options/#view_filters
 */
const filterEntries = (entries, { field, pattern } = { field: undefined, pattern: undefined }) => {
  if (!field) {
    return entries;
  }

  const { defaultLocale = 'default' } = get(selectedCollection)._i18n;
  const regex = typeof pattern === 'string' ? new RegExp(pattern) : undefined;

  return entries.filter((entry) => {
    const value = getPropertyValue(entry, defaultLocale, field);

    if (value === undefined) {
      return false;
    }

    if (regex) {
      return !!String(value).match(regex);
    }

    return value === pattern;
  });
};

/**
 * Group the given entries.
 * @param {Entry[]} entries Entry list.
 * @param {GroupingConditions} [conditions] Grouping conditions.
 * @returns {{ name: string, entries: Entry[] }[]} Grouped entries, where each group object contains
 * a name and an entry list. When ungrouped, there will still be one group object named `*`.
 * @see https://decapcms.org/docs/configuration-options/#view_groups
 */
const groupEntries = (entries, { field, pattern } = { field: undefined, pattern: undefined }) => {
  if (!field) {
    return entries.length ? [{ name: '*', entries }] : [];
  }

  const sortCondition = get(currentView).sort;
  const { defaultLocale = 'default' } = get(selectedCollection)._i18n;
  const regex = typeof pattern === 'string' ? new RegExp(pattern) : undefined;
  const groups = {};
  const otherKey = get(_)('other');

  entries.forEach((entry) => {
    const value = getPropertyValue(entry, defaultLocale, field);
    /**
     * @type {string}
     */
    let key = undefined;

    if (value !== undefined) {
      if (regex) {
        [key = otherKey] = String(value).match(regex) || [];
      } else {
        key = value;
      }
    }

    if (!(key in groups)) {
      groups[key] = [];
    }

    groups[key].push(entry);
  });

  // Sort groups by key
  const sortedGroups = Object.entries(groups)
    .map(([name, _entries]) => ({ name, entries: _entries }))
    .sort(({ name: aKey }, { name: bKey }) => aKey.localeCompare(bKey));

  // Keep the descending order if already sorted, especially on the date field
  if (sortCondition?.key === field && sortCondition?.order === 'descending') {
    sortedGroups.reverse();
  }

  return sortedGroups;
};

/**
 * View settings for all the folder collections.
 * @type {import('svelte/store').Writable<{ [key: string]: EntryListView }>}
 */
const entryListSettings = writable({}, (set) => {
  (async () => {
    try {
      set((await LocalStorage.get(storageKey)) || {});
    } catch {
      //
    }
  })();
});

/**
 * Get a field’s label by key
 * @param {Collection} collection Collection.
 * @param {string} key Field name, which can be dot notation like `name.en` for a nested field,
 * or one of other entry metadata property keys: `slug`, `commit_author` and `commit_date` .
 * @returns {string} Label. For a nested field, it would be something like `Name – English`.
 */
const getSortFieldLabel = (collection, key) => {
  if (['name', 'commit_author', 'commit_date'].includes(key)) {
    return get(_)(`sort_keys.${key}`);
  }

  if (key.includes('.')) {
    return key
      .split('.')
      .map((_key, index, arr) => {
        if (_key.match(/^\d+$/)) {
          return undefined;
        }

        const __key = arr.slice(0, index + 1).join('.');

        return getFieldByKeyPath(collection.name, undefined, __key, {})?.label || _key;
      })
      .filter(Boolean)
      .join(' – ');
  }

  return collection.fields?.find(({ name }) => name === key)?.label || key;
};

/**
 * List of sort fields for the selected folder collection.
 * @type {import('svelte/store').Readable<{ key: string, label: string }[]>}
 */
export const sortFields = derived(
  [selectedCollection, allEntries, locale],
  ([_collection, _allEntries], set) => {
    const { files, sortable_fields: customSortableFields } = _collection || {};

    // Disable sorting for file collections
    if (files) {
      set([]);

      return;
    }

    const { commitAuthor, commitDate } = _allEntries?.[0] || {};

    const _sortFields = (
      Array.isArray(customSortableFields) ? customSortableFields : defaultSortableFields
    ).filter((fieldName) => !!getFieldByKeyPath(_collection.name, undefined, fieldName, {}));

    if (commitAuthor && !_sortFields.includes('author')) {
      _sortFields.push('commit_author');
    }

    if (commitDate && !_sortFields.includes('date')) {
      _sortFields.push('commit_date');
    }

    set(_sortFields.map((key) => ({ key, label: getSortFieldLabel(_collection, key) })));
  },
);

/**
 * List of all the entries for the selected folder collection.
 * @type {import('svelte/store').Readable<Entry[]>}
 */
export const listedEntries = derived(
  [allEntries, selectedCollection],
  ([_allEntries, _collection], set) => {
    if (_allEntries && _collection) {
      set(getEntriesByCollection(_collection.name));
    } else {
      set([]);
    }
  },
);

/**
 * Sorted, filtered and grouped entries for the selected folder collection.
 * @type {import('svelte/store').Readable<{ name: string, entries: Entry[] }[]>}
 */
export const entryGroups = derived(
  [listedEntries, currentView],
  ([_listedEntries, _currentView], set) => {
    /**
     * @type {Entry[]}
     */
    let entries = [..._listedEntries];

    // Reset the groups if the current collection is empty or a file collection
    if (!entries.length || !!entries[0].fileName) {
      set([]);
    } else {
      entries = sortEntries(entries, _currentView?.sort);
      entries = filterEntries(entries, _currentView?.filter);
      set(groupEntries(entries, _currentView?.group));
    }
  },
);

listedEntries.subscribe((entries) => {
  selectedEntries.set([]);

  if (get(prefs).devModeEnabled) {
    // eslint-disable-next-line no-console
    console.info('listedEntries', entries);
  }
});

selectedCollection.subscribe((collection) => {
  if (!collection) {
    return;
  }

  if (get(prefs).devModeEnabled) {
    // eslint-disable-next-line no-console
    console.info('selectedCollection', collection);
  }

  const {
    name: collectionName,
    identifier_field: customIdField,
    fields = [],
    _i18n: { defaultLocale = 'default' },
  } = collection;

  // Reset the editor panes
  editorLeftPane.set({ mode: 'edit', locale: defaultLocale });
  editorRightPane.set({ mode: 'preview', locale: defaultLocale });

  // This only works for folder/entry collections
  if (!fields.length) {
    return;
  }

  /**
   * @type {EntryListView}
   */
  const defaultView = {
    type: 'list',
    sort: {
      // Every folder collection should have at least the `title` (or `name`) field, or the
      // `identifier_field` property.
      // @see https://decapcms.org/docs/configuration-options/#identifier_field
      key: customIdField || fields.find((f) => defaultSortableFields.includes(f.name))?.name,
      order: 'ascending',
    },
  };

  const view = get(entryListSettings)[collectionName] || defaultView;

  if (!equal(view, get(currentView))) {
    currentView.set(view);
  }
});

currentView.subscribe((view) => {
  const { name } = get(selectedCollection) || {};
  const savedView = get(entryListSettings)[name] || {};

  if (!equal(view, savedView)) {
    entryListSettings.update((settings) => ({ ...settings, [name]: view }));
  }
});

entryListSettings.subscribe((settings) => {
  if (!settings || !Object.keys(settings).length) {
    return;
  }

  (async () => {
    try {
      if (!equal(settings, await LocalStorage.get(storageKey))) {
        await LocalStorage.set(storageKey, settings);
      }
    } catch {
      //
    }
  })();
});
