<!--
  @component
  Implement the preview for the String widget.
  @see https://decapcms.org/docs/widgets/#string
-->
<script>
  /**
   * @type {LocaleCode}
   */
  // svelte-ignore unused-export-let
  export let locale;
  /**
   * @type {string}
   */
  // svelte-ignore unused-export-let
  export let keyPath;
  /**
   * @type {StringField}
   */
  export let fieldConfig;
  /**
   * @type {string}
   */
  export let currentValue;

  $: ({ name: fieldName } = fieldConfig);

  $: isURL = (() => {
    try {
      // eslint-disable-next-line no-new
      new URL(currentValue);
      return true;
    } catch {
      return false;
    }
  })();
</script>

{#if typeof currentValue === 'string' && currentValue.trim()}
  {#if fieldName === 'title'}
    <p class="title">{currentValue}</p>
  {:else if isURL}
    <p><a href={currentValue}>{currentValue}</a></p>
  {:else}
    <p>{currentValue}</p>
  {/if}
{/if}

<style lang="scss">
  .title {
    font-size: var(--sui-font-size-xxx-large);
    font-weight: 600;
  }
</style>
