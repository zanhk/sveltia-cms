<script>
  import { Icon, Menu, MenuButton, MenuItemCheckbox, MenuItemRadio } from '@sveltia/ui';
  import { _ } from 'svelte-i18n';
  import { writable } from 'svelte/store';

  export let label = '';
  export let disabled = false;
  /**
   * @type {boolean}
   */
  export let multiple = false;
  /**
   * @type {string}
   */
  export let noneLabel = '';
  /**
   * @type {import('svelte/store').Writable<EntryListView | AssetListView>}
   */
  export let currentView = writable({});
  /**
   * @type {ViewFilter[]}
   */
  export let filters = [];

  $: ariaControls = $$restProps['aria-controls'];
</script>

<MenuButton variant="ghost" label={label || $_('filter')} {disabled}>
  <Icon slot="end-icon" name="arrow_drop_down" />
  <Menu slot="popup" aria-label={$_('filtering_options')}>
    {#if multiple}
      {#each filters as { label: _label, field, pattern }}
        {@const index = ($currentView.filters || []).findIndex(
          (f) => f.field === field && f.pattern === pattern,
        )}
        <MenuItemCheckbox
          label={_label}
          checked={index > -1}
          on:change={() => {
            currentView.update((view) => {
              const updatedFilters = view.filters ? [...view.filters] : [];

              if (index > -1) {
                updatedFilters.splice(index, 1);
              } else {
                updatedFilters.push({ field, pattern });
              }

              return { ...view, filters: updatedFilters };
            });
          }}
        />
      {/each}
    {:else}
      <MenuItemRadio
        label={noneLabel || $_('sort_keys.none')}
        checked={!$currentView.filter}
        aria-controls={ariaControls}
        on:select={() => {
          currentView.update((view) => ({
            ...view,
            filter: undefined,
          }));
        }}
      />
      {#each filters as { label: _label, field, pattern }}
        <MenuItemRadio
          label={_label}
          checked={$currentView.filter?.field === field && $currentView.filter?.pattern === pattern}
          aria-controls={ariaControls}
          on:select={() => {
            currentView.update((view) => ({
              ...view,
              filter: { field, pattern },
            }));
          }}
        />
      {/each}
    {/if}
  </Menu>
</MenuButton>
