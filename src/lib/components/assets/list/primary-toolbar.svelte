<script>
  import { Button, Icon, Spacer, Toolbar } from '@sveltia/ui';
  import { _, locale as appLocale } from 'svelte-i18n';
  import DeleteAssetsDialog from '$lib/components/assets/shared/delete-assets-dialog.svelte';
  import FilePicker from '$lib/components/assets/shared/file-picker.svelte';
  import { selectedAssetFolderPath, selectedAssets, uploadingAssets } from '$lib/services/assets';
  import { getFolderLabelByPath } from '$lib/services/assets/view';
  import { siteConfig } from '$lib/services/config';

  /**
   * @type {import('svelte').SvelteComponent}
   */
  let filePicker;
  let showDeleteDialog = false;

  $: folderLabel = $appLocale ? getFolderLabelByPath($selectedAssetFolderPath) : '';
</script>

<Toolbar variant="primary" aria-label={$_('folder')}>
  <h2 role="none">
    {folderLabel}
    {#if $selectedAssetFolderPath}
      <span role="none">/{$selectedAssetFolderPath}</span>
    {/if}
  </h2>
  <Spacer flex />
  <Button
    variant="secondary"
    disabled={!$selectedAssets.length}
    label={$_('delete')}
    aria-label={$selectedAssets.length === 1
      ? $_('delete_selected_asset')
      : $_('delete_selected_assets')}
    on:click={() => {
      showDeleteDialog = true;
    }}
  >
    <Icon slot="start-icon" name="delete" />
  </Button>
  <!-- @todo Implement these actions. -->
  <!--
  <Button
    variant="secondary"
    disabled={$selectedAssets.length !== 1}
    label={$_('copy')}
    on:click={() => {
      //
    }}
  >
    <Icon slot="start-icon" name="file_copy" />
  </Button>
  <Button
    variant="secondary"
    disabled={!$selectedAssets.length}
    label={$_('download')}
    on:click={() => {
      //
    }}
  >
    <Icon slot="start-icon" name="download" />
  </Button>
  -->
  <Button
    variant="primary"
    label={$_('upload')}
    aria-label={$_('upload_files')}
    on:click={() => {
      filePicker.open();
    }}
  >
    <Icon slot="start-icon" name="cloud_upload" />
  </Button>
</Toolbar>

<FilePicker
  bind:this={filePicker}
  multiple={true}
  on:change={({ target }) => {
    $uploadingAssets = {
      folder: $selectedAssetFolderPath || $siteConfig.media_folder,
      files: [.../** @type {HTMLInputElement} */ (target).files],
    };
  }}
/>

<DeleteAssetsDialog bind:open={showDeleteDialog} assets={$selectedAssets} />
