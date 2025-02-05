export const strings = {
  // Pages & Navigation
  collections: 'Collections',
  contents: 'Contents',
  entries: 'Entries',
  assets: 'Assets',
  media: 'Media',
  workflow: 'Workflow',
  editorial_workflow: 'Editorial Workflow',
  notifications: 'Notifications',
  site_config: 'Site Configuration',
  settings: 'Settings',
  account: 'Account',
  live_site: 'Live Site',
  git_repository: 'Git Repository',
  help: {
    keyboard_shortcuts: 'Keyboard Shortcuts',
    documentation: 'Documentation',
    release_notes: 'Release Notes',
    issue: 'Report Issue',
    feedback: 'Share Feedback',
  },

  // Account
  user_name: 'User Name',
  password: 'Password',
  sign_in: 'Sign In',
  sign_in_with_x: 'Sign In with {service}',
  signed_in_as_x: 'Signed In as {name}',
  work_with_local_repo: 'Work with Local Repository',
  working_with_local_repo: 'Working with Local Repository',
  sign_out: 'Sign Out',

  // Common terms
  create: 'New',
  select: 'Select',
  select_all: 'Select All',
  clear_selection: 'Clear Selection',
  upload: 'Upload',
  copy: 'Copy',
  download: 'Download',
  delete: 'Delete',
  save: 'Save',
  saving: 'Saving…',
  replace: 'Replace',
  remove: 'Remove',
  remove_x: 'Remove {name}',
  clear: 'Clear',
  expand: 'Expand',
  collapse: 'Collapse',
  insert: 'Insert',
  searching: 'Searching…',
  global: 'Global',
  primary: 'Primary',
  secondary: 'Secondary',
  collection: 'Collection',
  folder: 'Folder',
  api_key: 'API Key',

  // Entrance
  welcome_to_sveltia_cms: 'Welcome to Sveltia CMS',
  loading_site_config: 'Loading Site Configuration…',
  loading_site_data: 'Loading Site Data…',
  loading_site_data_error: 'There was an error while loading site data.',
  unexpected_error: 'Unexpected Error',

  // Global toolbar
  visit_live_site: 'Visit Live Site',
  switch_page: 'Switch Page',
  search_placeholder: 'Search for entries and assets…',
  create_entry_or_asset: 'Create Entry or Asset',
  asset: 'Asset',
  show_notifications: 'Show Notifications',
  show_account_menu: 'Show Account Menu',

  // Library
  content_library: 'Content Library',
  asset_library: 'Asset Library',
  collection_assets: 'Collection Assets',
  entry_list: 'Entry List',
  file_list: 'File List',
  asset_list: 'Asset List',
  x_collection: '“{collection}” Collection',
  x_asset_folder: '“{folder}” Asset Folder',
  viewing_x_collection_many_entries:
    'You’re now viewing the “{collection}” collection, which has {count} entries.',
  viewing_x_collection_one_entry:
    'You’re now viewing the “{collection}” collection, which has one entry.',
  viewing_x_collection_no_entry:
    'You’re now viewing the “{collection}” collection, which has no entry yet.',
  viewing_x_asset_folder_many_assets:
    'You’re now viewing the “{folder}” asset folder, which has {count} assets.',
  viewing_x_asset_folder_one_asset:
    'You’re now viewing the “{folder}” asset folder, which has one asset.',
  viewing_x_asset_folder_no_asset:
    'You’re now viewing the “{folder}” asset folder, which has no asset yet.',
  collection_not_found: 'Collection not found',
  file_not_found: 'File not found.',
  switch_view: 'Switch View',
  list_view: 'List View',
  grid_view: 'Grid View',
  sort: 'Sort',
  sorting_options: 'Sorting Options',
  sort_keys: {
    none: 'None',
    name: 'Name',
    commit_author: 'Updated by',
    commit_date: 'Updated on',
  },
  ascending: '{label}, A to Z',
  ascending_date: '{label}, old to new',
  descending: '{label}, Z to A',
  descending_date: '{label}, new to old',
  filter: 'Filter',
  filtering_options: 'Filtering Options',
  group: 'Group', // Verb
  grouping_options: 'Grouping Options',
  file_type: 'File Type',
  all: 'All',
  image: 'Image',
  video: 'Video',
  audio: 'Audio',
  document: 'Document',
  other: 'Other',
  show_assets: 'Show Assets',
  hide_assets: 'Hide Assets',
  show_info: 'Show Info',
  hide_info: 'Hide Info',
  asset_folders: 'Asset Folders',
  all_assets: 'All Assets',
  uncategorized: 'Uncategorized',
  search_results_for_x: 'Search Results for “{terms}”',
  viewing_search_results:
    'You’re now viewing search results for “{terms}”. We’ve found {entries} and {assets}.',
  many_entries: '{count} entries',
  one_entry: 'one entry',
  no_entry: 'no entry',
  many_assets: '{count} assets',
  one_asset: 'one asset',
  no_asset: 'no asset',
  no_files_found: 'No files found.',
  no_entries_found: 'No entries found.',
  drop_files_or_browse: 'Drop a file here or click to browse:',
  drop_files_here: 'Drop files here',
  delete_asset: 'Delete Asset',
  delete_assets: 'Delete Assets',
  delete_selected_asset: 'Delete Selected Asset',
  delete_selected_assets: 'Delete Selected Assets',
  confirm_deleting_this_asset: 'Are you sure to delete this asset?',
  confirm_deleting_selected_asset: 'Are you sure to delete the selected asset?',
  confirm_deleting_selected_assets: 'Are you sure to delete the selected {count} assets?',
  confirm_deleting_all_assets: 'Are you sure to delete all the assets?',
  delete_entry: 'Delete Entry',
  delete_entries: 'Delete Entries',
  delete_selected_entry: 'Delete Selected Entry',
  delete_selected_entries: 'Delete Selected Entries',
  confirm_deleting_this_entry: 'Are you sure to delete this entry?',
  confirm_deleting_selected_entry: 'Are you sure to delete the selected entry?',
  confirm_deleting_selected_entries: 'Are you sure to delete the selected {count} entries?',
  confirm_deleting_all_entries: 'Are you sure to delete all the entries?',
  upload_files: 'Upload New Files',
  confirm_uploading_file: 'Are you sure to save the following file to the “{folder}” folder?',
  confirm_uploading_files:
    'Are you sure to save the following {count} files to the “{folder}” folder?',
  no_entries_created: 'This collection has no entries yet.',
  create_new_entry: 'Create New Entry',
  no_files_in_collection: 'No files available in this collection.',
  asset_info: 'Asset Info',
  select_asset_show_info: 'Select an asset to show the info.',
  duplicate_entry: 'Duplicate Entry',
  entry_duplicated: 'Entry has been duplicated. It’s now a new draft.',
  entry_validation_error: 'One field has an error. Please correct it to save the entry.',
  entry_validation_errors: '{count} fields have an error. Please correct them to save the entry.',
  entry_saved: 'Entry has been saved.',
  entry_deleted: 'Entry has been deleted.',
  entries_deleted: '{count} entries have been deleted.',
  asset_saved: 'Asset has been saved.',
  assets_saved: '{count} assets have been saved.',
  asset_deleted: 'Asset has been deleted.',
  assets_deleted: '{count} assets have been deleted.',

  // Content editor
  content_editor: 'Content Editor',
  cancel_editing: 'Cancel Editing',
  creating_x: 'Creating {name}',
  creating_x_collection_entry: 'You’re now creating a new entry in the “{collection}” collection.',
  editing_x_in_x: 'Editing {collection} / {entry}',
  editing_x_collection_entry:
    'You’re now editing the “{entry}” entry in the “{collection}” collection.',
  editing_x_collection_file:
    'You’re now editing the “{file}” file in the “{collection}” collection.',
  show_editor_options: 'Show Editor Options',
  editor_options: 'Editor Options',
  show_preview: 'Show Preview',
  sync_scrolling: 'Sync Scrolling',
  switch_locale: 'Switch Locale',
  locale_content_errors: 'One more more fields in this locale content have an error.',
  edit: 'Edit',
  preview: 'Preview',
  edit_x_locale: 'Edit {locale} Content',
  preview_x_locale: 'Preview {locale} Content',
  content_preview: 'Content Preview',
  show_content_options_x_locale: 'Show {locale} Content Options',
  content_options_x_locale: '{locale} Content Options',
  x_field: '“{field}” Field',
  show_field_options: 'Show Field Options',
  field_options: 'Field Options',
  unsupported_widget_x: 'Unsupported widget: {name}',
  enable_x_locale: 'Enable {locale}',
  reenable_x_locale: 'Reenable {locale}',
  disable_x_locale: 'Disable {locale}',
  locale_x_has_been_disabled: 'The {locale} content has been disabled.',
  locale_x_now_disabled:
    'The {locale} content is now disabled. It will be deleted when you save the entry.',
  copy_from: 'Copy from…',
  copy_from_x: 'Copy from {locale}',
  translate_from: 'Translate from…',
  translate_from_x: 'Translate from {locale}',
  revert_changes: 'Revert Changes',
  revert_all_changes: 'Revert All Changes',
  required: 'Required',
  editor: {
    translation: {
      none: 'Nothing has been translated.',
      started: 'Translating…',
      error: 'There was an error while translating.',
      complete: {
        one: 'Translated the field from {source}.',
        many: 'Translated {count} fields from {source}.',
      },
    },
    copy: {
      none: 'Nothing has been copied.',
      complete: {
        one: 'Copied the field from {source}.',
        many: 'Copied {count} fields from {source}.',
      },
    },
  },
  validation: {
    value_missing: 'This field is required.',
    range_underflow: {
      select_many: 'You have to select at least {min} item.',
      select_one: 'You have to select at least {min} items.',
      add_many: 'You have to add at least {min} item.',
      add_one: 'You have to add at least {min} items.',
    },
    range_overflow: {
      select_many: 'You cannot select more than {max} item.',
      select_one: 'You cannot select more than {max} items.',
      add_many: 'You cannot add more than {max} item.',
      add_one: 'You cannot add more than {max} items.',
    },
  },
  saving_entry: {
    error: {
      title: 'Error',
      description: 'There was an error while saving the entry. Please try again later.',
    },
  },

  // Media details
  viewing_x_asset_details: 'You’re viewing the details of the “{name}” asset.',
  asset_editor: 'Asset Editor',
  no_preview_available: 'No Preview Available.',
  public_url: 'Public URL',
  file_path: 'File Path',
  kind: 'Kind',
  size: 'Size',
  dimensions: 'Dimensions',
  duration: 'Duration',
  used_in: 'Used in',

  // Widgets
  select_file: 'Select File',
  select_image: 'Select Image',
  replace_file: 'Replace File',
  replace_image: 'Replace Image',
  remove_file: 'Remove File',
  remove_image: 'Remove Image',
  remove_this_item: 'Remove This Item',
  move_up: 'Move Up',
  move_down: 'Move Down',
  add_x: 'Add {name}',
  select_list_type: 'Select List Type',
  assets_dialog: {
    title: {
      file: 'Select File',
      image: 'Select Image',
    },
    search_for_file: 'Search for Files',
    search_for_image: 'Search for Images',
    locations: 'Locations',
    location: {
      this_repository: 'This Repository',
      external_locations: 'External Locations',
      stock_photos: 'Stock Photos',
    },
    error: {
      invalid_key: 'Your API Key is invalid or expired. Please double check and try again.',
      search_fetch_failed: 'There was an error while searching assets. Please try again later.',
      image_fetch_failed:
        'There was an error while downloading the selected asset. Please try again later.',
    },
    available_images: 'Available Images',
    enter_url: 'Enter URL',
    enter_file_url: 'Enter URL of the file:',
    enter_image_url: 'Enter URL of the image:',
    large_file: {
      title: 'Large File',
      description: 'This file exceeds the maximum size of {size}. Please choose another.',
    },
    photo_credit: {
      title: 'Photo Credit',
      description: 'Use the following credit if possible:',
    },
  },

  // Content preview
  boolean: {
    true: 'Yes',
    false: 'No',
  },

  // Integrations
  cloud_storage: {
    invalid: 'The service is not configured properly.',
    auth: {
      initial: 'Sign into {service} to insert media on the storage to entry fields.',
      requested: 'Signing in…',
      error: 'User name or password is incorrect. Please double check and try again.',
    },
  },

  // Configuration
  config: {
    error: {
      fetch_failed: 'The configuration file could not be retrieved.',
      parse_failed: 'The configuration file could not be parsed.',
      no_collection: 'Collections are not defined in the configuration file.',
      no_backend: 'The backend is not defined in the configuration file.',
      unsupported_backend: 'The configured “{name}” backend is not supported.',
      no_media_folder: 'The media folder is not defined in the configuration file.',
      unexpected: 'There was an unexpected error while validating the configuration file.',
      try_again: 'Please solve the issue and try again.',
    },
  },

  // Backends
  unsupported: {
    browser:
      'Local development is not supported in your browser. Please use Chrome or Edge instead.',
  },

  // Editorial Workflow
  status: {
    drafts: 'Drafts',
    in_review: 'In Review',
    ready: 'Ready',
  },

  // Settings
  categories: 'Categories',
  prefs: {
    error: {
      permission_denied:
        'Browser storage (Cookie) access has been denied. Please check the permission and try again.',
    },
    appearance: {
      title: 'Appearance',
      theme: 'Theme',
      select_theme: 'Select Theme',
    },
    theme: {
      auto: 'Auto',
      dark: 'Dark',
      light: 'Light',
    },
    languages: {
      title: 'Languages',
      ui_language: {
        title: 'User Interface Language',
        select_language: 'Select Language',
      },
      translator: {
        title: '{service} Translator',
        field_label: '{service} API Authentication Key',
        description:
          'Sign up for <a {homeHref}>{service} API</a> and enter <a {apiKeyHref}>your Authentication Key</a> here to enable quick translation of text entry fields.',
      },
    },
    media: {
      title: 'Media',
      stock_photos: {
        title: '{service} Free Images',
        field_label: '{service} API Key',
        description:
          'Sign up for <a {homeHref}>{service} API</a> and enter <a {apiKeyHref}>your API Key</a> here to insert free stock photos to image entry fields.',
        credit: 'Photos provided by {service}',
      },
    },
    advanced: {
      title: 'Advanced',
      developer_mode: {
        title: 'Developer Mode',
        description:
          'Enable some features, including detailed console logs and native context menus.',
        switch_label: 'Enable Developer Mode',
      },
    },
  },

  // Keyboard shortcuts
  keyboard_shortcuts: {
    search: 'Search for entries and assets',
    create_entry: 'Create a new entry',
    save_entry: 'Save an entry',
  },

  // File types
  file_type_labels: {
    avif: 'AVIF image',
    bmp: 'Bitmap image',
    gif: 'GIF image',
    ico: 'Icon',
    jpeg: 'JPEG image',
    jpg: 'JPEG image',
    png: 'PNG image',
    svg: 'SVG image',
    tif: 'TIFF image',
    tiff: 'TIFF image',
    webp: 'WebP image',
    avi: 'AVI video',
    mp4: 'MP4 video',
    mpeg: 'MPEG video',
    ogv: 'OGG video',
    ts: 'MPEG video',
    webm: 'WebM video',
    '3gp': '3GPP video',
    '3g2': '3GPP2 video',
    aac: 'AAC audio',
    mid: 'MIDI',
    midi: 'MIDI',
    mp3: 'MP3 audio',
    opus: 'OPUS audio',
    wav: 'WAV audio',
    weba: 'WebM audio',
    csv: 'CSV spreadsheet',
    doc: 'Word document',
    docx: 'Word document',
    odp: 'OpenDocument presentation',
    ods: 'OpenDocument spreadsheet',
    odt: 'OpenDocument text',
    pdf: 'PDF document',
    ppt: 'PowerPoint presentation',
    pptx: 'PowerPoint presentation',
    rtf: 'Rich text document',
    xls: 'Excel spreadsheet',
    xlsx: 'Excel spreadsheet',
  },
};
