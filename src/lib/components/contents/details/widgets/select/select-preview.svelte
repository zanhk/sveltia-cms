<!--
  @component
  Implement the preview for the Select widget.
  @see https://decapcms.org/docs/widgets/#select
-->
<script>
  import { isObjectArray } from '$lib/services/utils/misc';

  /**
   * @type {LocaleCode}
   */
  export let locale;
  /**
   * @type {string}
   */
  // svelte-ignore unused-export-let
  export let keyPath;
  /**
   * @type {SelectField}
   */
  export let fieldConfig;
  /**
   * @type {string | string[]}
   */
  export let currentValue;

  $: ({ options, multiple } = fieldConfig);
  $: hasLabels = isObjectArray(options);
  $: listFormatter = new Intl.ListFormat(locale, { style: 'narrow', type: 'conjunction' });

  /**
   * Get the display label by value.
   * @param {any} value Value.
   * @returns {string} Label.
   */
  const getLabel = (value) =>
    hasLabels
      ? /** @type {{ label: string, value: string }[]} */ (options).find((o) => o.value === value)
          ?.label || value
      : value;
</script>

{#if multiple && Array.isArray(currentValue) && currentValue.length}
  <p>{listFormatter.format(currentValue.map(getLabel))}</p>
{:else if currentValue !== undefined}
  <p>{getLabel(currentValue)}</p>
{/if}
