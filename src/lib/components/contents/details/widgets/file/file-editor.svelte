<!--
  @component
  Implement the editor for the File and Image widgets.
  @see https://decapcms.org/docs/widgets/#file
  @see https://decapcms.org/docs/widgets/#image
-->
<script>
  import { AlertDialog, Button, ConfirmationDialog, TextArea } from '@sveltia/ui';
  import DOMPurify from 'isomorphic-dompurify';
  import { _ } from 'svelte-i18n';
  import SelectAssetsDialog from '$lib/components/assets/shared/select-assets-dialog.svelte';
  import Image from '$lib/components/common/image.svelte';
  import { getAssetURL, getMediaFieldURL } from '$lib/services/assets';
  import { entryDraft } from '$lib/services/contents/editor';
  import { formatSize, getDataURL } from '$lib/services/utils/files';

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
  // svelte-ignore unused-export-let
  export let fieldLabel;
  /**
   * @type {FileField}
   */
  export let fieldConfig;
  /**
   * @type {string | undefined}
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

  /**
   * @type {Asset}
   */
  let asset;
  /**
   * @type {File}
   */
  let file;
  /**
   * @type {string}
   */
  let url;
  /**
   * @type {string}
   */
  let credit;
  let showSelectAssetsDialog = false;
  let showSizeLimitDialog = false;
  let showPhotoCreditDialog = false;
  let photoCredit = '';

  $: ({
    widget: widgetName,
    // Widget-specific options
    choose_url: canEnterURL = true,
    media_library: {
      config: { max_file_size: maxFileSize = /** @type {number | undefined} */ (undefined) } = {},
    } = {},
  } = fieldConfig);
  $: isImageWidget = widgetName === 'image';

  /**
   * Handle selected asset.
   * @param {SelectedAsset} selectedAsset Selected asset details.
   */
  const onAssetSelect = async (selectedAsset) => {
    ({ asset, file, url, credit } = selectedAsset);

    if (asset) {
      currentValue = await getAssetURL(asset, { pathOnly: true });
    }

    if (file) {
      // Check the max file size
      // @see https://decapcms.org/docs/beta-features/#image-widget-file-size-limit
      if (isImageWidget && Number.isInteger(maxFileSize) && file.size > maxFileSize) {
        showSizeLimitDialog = true;
      } else {
        // Use the `data:` URL temporarily, and replace it later; avoid `blob:` here because it will
        // be unavailable event after Vite HMR
        currentValue = await getDataURL(file);
        // Cache the file itself for later upload
        $entryDraft.files[locale][keyPath] = file;
      }
    }

    if (url) {
      currentValue = url;
    }

    if (credit) {
      photoCredit = DOMPurify.sanitize(credit, { ALLOWED_TAGS: ['a'], ALLOWED_ATTR: ['href'] });
      showPhotoCreditDialog = true;
    }
  };
</script>

<div role="none" class="image-widget">
  {#if isImageWidget && currentValue}
    {#await getMediaFieldURL(currentValue, $entryDraft.originalEntry) then src}
      <Image {src} variant="tile" checkerboard={true} />
    {/await}
  {/if}
  <div role="none">
    {#if typeof currentValue === 'string'}
      <div
        id="{fieldId}-value"
        tabindex="0"
        class="filename"
        role="textbox"
        aria-readonly={readonly}
        aria-invalid={invalid}
        aria-required={required}
        aria-labelledby="{fieldId}-label"
        aria-errormessage="{fieldId}-error"
      >
        {#if file}
          {file.name}
        {:else if !currentValue.startsWith('data:')}
          {currentValue}
        {/if}
      </div>
    {/if}
    <div role="none">
      <Button
        disabled={readonly}
        variant="tertiary"
        label={currentValue ? $_('replace') : $_('select')}
        aria-label={currentValue ? $_(`replace_${widgetName}`) : $_(`select_${widgetName}`)}
        aria-controls="{fieldId}-value"
        on:click={() => {
          showSelectAssetsDialog = true;
        }}
      />
      {#if currentValue}
        <Button
          disabled={readonly}
          variant="tertiary"
          label={$_('remove')}
          aria-label={$_(`remove_${widgetName}`)}
          aria-controls="{fieldId}-value"
          on:click={() => {
            currentValue = '';
            asset = undefined;
            file = undefined;
            url = undefined;
            credit = undefined;
          }}
        />
      {/if}
    </div>
  </div>
</div>

<SelectAssetsDialog
  kind={isImageWidget ? 'image' : 'any'}
  {canEnterURL}
  bind:open={showSelectAssetsDialog}
  on:select={({ detail }) => {
    onAssetSelect(detail);
  }}
/>

<AlertDialog bind:open={showSizeLimitDialog} title={$_('assets_dialog.large_file.title')}>
  {$_('assets_dialog.large_file.description', { values: { size: formatSize(maxFileSize) } })}
</AlertDialog>

<ConfirmationDialog
  bind:open={showPhotoCreditDialog}
  title={$_('assets_dialog.photo_credit.title')}
  okLabel={$_('copy')}
  on:ok={() => {
    navigator.clipboard.writeText(photoCredit);
  }}
>
  <div role="none">{$_('assets_dialog.photo_credit.description')}</div>
  <div role="none">
    <TextArea
      flex
      readonly
      value={photoCredit}
      on:click={(event) => {
        /** @type {HTMLTextAreaElement} */ (event.target).focus();
        /** @type {HTMLTextAreaElement} */ (event.target).select();
      }}
    />
  </div>
</ConfirmationDialog>

<style lang="scss">
  .image-widget {
    display: flex !important;
    align-items: center;
    gap: 16px;

    :global(.preview) {
      flex: none;
      width: 160px !important;
      height: 160px !important;
      border-width: 1px;
      border-color: var(--sui-control-border-color);
      border-radius: var(--sui-control-medium-border-radius);
    }

    & > div {
      flex: auto;
      overflow: hidden;

      .filename {
        margin: var(--sui-focus-ring-width);
        padding: 4px;
        word-break: break-all;

        &:empty {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
</style>
