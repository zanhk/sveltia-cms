<script>
  import { GridCell, GridRow } from '@sveltia/ui';
  import { _ } from 'svelte-i18n';
  import EmptyState from '$lib/components/common/empty-state.svelte';
  import ListContainer from '$lib/components/common/list-container.svelte';
  import ListingGrid from '$lib/components/common/listing-grid.svelte';
  import { selectedCollection } from '$lib/services/contents';
  import { goto } from '$lib/services/navigation';
</script>

<ListContainer aria-label={$_('file_list')}>
  {#if $selectedCollection.files?.length}
    <ListingGrid
      viewType="list"
      aria-label={$_('files')}
      aria-rowcount={$selectedCollection.files.length}
    >
      {#each $selectedCollection.files as { name, label } (name)}
        <GridRow
          on:click={() => {
            goto(`/collections/${$selectedCollection.name}/entries/${name}`);
          }}
        >
          <GridCell class="title">
            {label}
          </GridCell>
        </GridRow>
      {/each}
    </ListingGrid>
  {:else}
    <EmptyState>
      <span role="none">{$_('no_files_in_collection')}</span>
    </EmptyState>
  {/if}
</ListContainer>
