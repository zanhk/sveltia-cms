<!--
  @component
  Implement the editor for the Relation widget.
  @see https://decapcms.org/docs/widgets/#relation
  @todo Support search fields.
-->
<script>
  import { getOptions } from '$lib/components/contents/details/widgets/relation/helper';
  import SelectEditor from '$lib/components/contents/details/widgets/select/select-editor.svelte';
  import { getEntriesByCollection, getFile } from '$lib/services/contents';

  /**
   * @type {LocaleCode}
   */
  export let locale;
  /**
   * @type {string}
   */
  export let keyPath;
  /**
   * @type {string}
   */
  export let fieldId;
  /**
   * @type {string}
   */
  export let fieldLabel;
  /**
   * @type {RelationField}
   */
  export let fieldConfig;
  /**
   * @type {string}
   */
  export let currentValue;
  /**
   * @type {boolean}
   */
  export let readonly = false;
  /**
   * @type {boolean}
   */
  export let required = false;
  /**
   * @type {boolean}
   */
  export let invalid = false;

  $: ({
    // Widget-specific options
    collection: collectionName,
    file: fileName,
    // search_fields: searchFields,
  } = fieldConfig);

  $: refEntries = fileName
    ? [getFile(collectionName, fileName)]
    : getEntriesByCollection(collectionName);
  $: options = getOptions(locale, fieldConfig, refEntries);
</script>

<SelectEditor
  {locale}
  {keyPath}
  {fieldId}
  {fieldLabel}
  fieldConfig={{ ...fieldConfig, options }}
  bind:currentValue
  {readonly}
  {required}
  {invalid}
  sortOptions={true}
/>
