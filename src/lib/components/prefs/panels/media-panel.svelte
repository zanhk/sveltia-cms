<script>
  import { TabPanel, TextInput } from '@sveltia/ui';
  import DOMPurify from 'isomorphic-dompurify';
  import { _ } from 'svelte-i18n';
  import { prefs } from '$lib/services/prefs';
  import { allStockPhotoServices } from '$lib/services/integrations/media-libraries';
</script>

<TabPanel id="prefs-tab-media">
  {#each Object.entries(allStockPhotoServices) as [serviceId, service] (serviceId)}
    {@const { serviceLabel, developerURL, apiKeyURL } = service}
    <section>
      <h4>
        {$_('prefs.media.stock_photos.title', { values: { service: serviceLabel } })}
      </h4>
      <p>
        {@html DOMPurify.sanitize(
          $_('prefs.media.stock_photos.description', {
            values: {
              service: serviceLabel,
              homeHref: `href="${developerURL}"`,
              apiKeyHref: `href="${apiKeyURL}"`,
            },
          }),
          { ALLOWED_TAGS: ['a'], ALLOWED_ATTR: ['href', 'target', 'rel'] },
        )}
      </p>
      <div role="none">
        <TextInput
          bind:value={$prefs.apiKeys[serviceId]}
          flex
          spellcheck="false"
          aria-label={$_('prefs.media.stock_photos.field_label', {
            values: { service: serviceLabel },
          })}
        />
      </div>
    </section>
  {/each}
</TabPanel>
