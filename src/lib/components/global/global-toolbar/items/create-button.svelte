<script>
  import { Divider, Icon, Menu, MenuButton, MenuItem } from '@sveltia/ui';
  import { _ } from 'svelte-i18n';
  import FilePicker from '$lib/components/assets/shared/file-picker.svelte';
  import { uploadingAssets } from '$lib/services/assets';
  import { siteConfig } from '$lib/services/config';
  import { goto } from '$lib/services/navigation';

  /**
   * @type {import('svelte').SvelteComponent}
   */
  let filePicker;
</script>

<MenuButton
  variant="ghost"
  iconic
  popupPosition="bottom-right"
  aria-label={$_('create_entry_or_asset')}
>
  <Icon slot="start-icon" name="add" />
  <Menu slot="popup" aria-label={$_('create_entry_or_asset')}>
    {#each $siteConfig.collections ?? [] as collection (collection.name)}
      {@const {
        name,
        label,
        label_singular: labelSingular,
        folder,
        hide = false,
        create = false,
      } = collection}
      {#if folder && !hide}
        <MenuItem
          label={labelSingular || label || name}
          disabled={!create}
          on:click={() => {
            goto(`/collections/${name}/new`);
          }}
        />
      {/if}
    {/each}
    <Divider />
    <MenuItem
      label={$_('asset')}
      on:click={() => {
        goto(`/assets`);
        filePicker.open();
      }}
    />
  </Menu>
</MenuButton>

<FilePicker
  bind:this={filePicker}
  on:change={({ target }) => {
    $uploadingAssets = {
      folder: $siteConfig.media_folder,
      files: [.../** @type {HTMLInputElement} */ (target).files],
    };
  }}
/>
