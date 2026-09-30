# WordPress Plugins

`LicenseDockWordPress` connects a WordPress plugin you sell to your store. Once it's in your plugin:

- New versions appear in the customer's dashboard under **Plugins** and **Dashboard → Updates**, and install with the normal Update button
- Your settings page can activate the customer's license key against their site's domain
- Each site that updates is activated against the key on its first update, so the store knows which domains run your plugin and the activation limit applies

It's a drop-in class: two PHP files, a few lines in your main plugin file.

## Requirements

- PHP 7.4 or later on the customer's site
- A LicenseDock product for the plugin, with a version uploaded and its zip ticked **Include in auto-updates**
- The version string in LicenseDock in the same format as the `Version:` header in your plugin, so `version_compare()` can order them

Selling a theme? See [WordPress Themes](/licensedock/integrations/wordpress-themes). It works the same way, with its own class.

## Getting the Files

Download the SDK from your account at contona.com, next to the LicenseDock package. Unzip `licensedock-sdk-v2.1.0.zip`:

```
sdk/
├── LicenseDockClient.php
├── wordpress/LicenseDockWordPress.php
└── README.md
```

Ship **both** PHP files inside your plugin. `LicenseDockWordPress` extends `LicenseDockClient`.

Either layout works:

```
my-plugin/
├── my-plugin.php
└── licensedock/
    ├── LicenseDockClient.php
    └── LicenseDockWordPress.php
```

```
my-plugin/
├── my-plugin.php
└── licensedock/
    ├── LicenseDockClient.php
    └── wordpress/LicenseDockWordPress.php
```

`LicenseDockWordPress.php` loads `LicenseDockClient.php` from its own folder or the folder above. If it finds neither, it throws a `RuntimeException` naming the missing file.

## Setup

In your main plugin file:

```php
if (!class_exists('LicenseDockWordPress')) {
    require_once __DIR__ . '/licensedock/LicenseDockWordPress.php';
}

$my_plugin_ld = new LicenseDockWordPress(
    'https://your-store.com',     // store URL
    42,                           // product ID in LicenseDock
    plugin_basename(__FILE__),    // e.g. my-plugin/my-plugin.php
    'my-plugin'                   // plugin slug
);

$my_plugin_ld->setLicenseKey(get_option('my_plugin_license_key', ''));
$my_plugin_ld->init();
```

That's enough for updates. Run it on every load – `init()` registers the WordPress hooks.

Keep the `class_exists()` guard. A site can run several plugins that each ship the SDK, and the first copy loaded is the one used. From SDK 2.1.0 the files skip their own declarations when the classes already exist, but a plugin carrying an older copy does not, so the guard in your plugin is what keeps the site running.

The product's **Downloads → Integration → WordPress** tab in the LicenseDock admin shows this code with your store URL and product ID filled in.

### Constructor

| Argument | Type | Notes |
|----------|------|-------|
| `$storeUrl` | string | Your store's root URL, e.g. `https://your-store.com`. The SDK adds `/api/index.php/v1/licensedock` itself |
| `$productId` | int | The product ID in LicenseDock. For a plugin sold inside a bundle, use the plugin's own product ID |
| `$pluginFile` | string | The plugin basename, `folder/main-file.php`. Must match WordPress's own key for the plugin, so use `plugin_basename(__FILE__)` |
| `$slug` | string | The plugin slug, usually the folder name |

HTTP calls go through `wp_remote_get()` / `wp_remote_post()`, so the site's proxy and SSL settings apply. The timeout is 15 seconds.

### Methods

| Method | Notes |
|--------|-------|
| `setLicenseKey(string $key)` | The key used for update checks and downloads. Call before `init()` |
| `init()` | Registers the update hooks |
| `activate(string $key, string $identifier = '', string $name = '')` | Activates the key. The identifier defaults to the site's domain |
| `validate(string $key, string $identifier = '')` | Checks the key. The identifier defaults to the site's domain |
| `deactivate(string $key, string $identifier = '')` | Frees the slot. The identifier defaults to the site's domain |
| `setVersion(string $version)` | Optional. Overrides the installed version read from the plugin header |
| `setSendIdentifier(bool $send)` | Pass `false` to stop sending the domain with downloads |
| `clearUpdateCache()` | Forgets the cached update check and activation state |

The site domain is the host of `get_site_url()`, lowercased and without `www.`.

Every call returns the result object described on [PHP Client](/licensedock/integrations/php#result-object): `success`, `data`, `message`, `code`.

## License Key Settings Page

A minimal settings page that activates the key when the admin saves it:

```php
add_action('admin_menu', function () {
    add_options_page(
        'My Plugin License',
        'My Plugin License',
        'manage_options',
        'my-plugin-license',
        'my_plugin_license_page'
    );
});

function my_plugin_license_page()
{
    global $my_plugin_ld;

    if (isset($_POST['my_plugin_license_key']) && check_admin_referer('my_plugin_license')) {
        $key    = sanitize_text_field(wp_unslash($_POST['my_plugin_license_key']));
        $result = $my_plugin_ld->activate($key);

        if ($result->success) {
            update_option('my_plugin_license_key', $key);
            $my_plugin_ld->setLicenseKey($key);
            $my_plugin_ld->clearUpdateCache();

            echo '<div class="notice notice-success"><p>License activated for this site.</p></div>';
        } else {
            // Limit reached, invalid or expired key, wrong product, store unreachable.
            echo '<div class="notice notice-error"><p>' . esc_html($result->message) . '</p></div>';
        }
    }

    $key = get_option('my_plugin_license_key', '');
    ?>
    <div class="wrap">
        <h1>My Plugin License</h1>
        <form method="post">
            <?php wp_nonce_field('my_plugin_license'); ?>
            <input type="text" name="my_plugin_license_key" class="regular-text"
                   value="<?php echo esc_attr($key); ?>">
            <?php submit_button('Save and activate'); ?>
        </form>
    </div>
    <?php
}
```

Activate on save, never on page load. Each call is an HTTP request to your store, and activation is [rate limited](/licensedock/api/#rate-limiting) to 20 calls per key per hour.

The SDK would activate the site anyway on its first update. Activating on save reports a bad key while the admin is still on the screen.

To branch on the error, use `$result->code`. The codes are listed in the [API Reference](/licensedock/api/#error-codes). A connection failure has an empty `code` and the reason in `message`.

### Removing a key

Free the slot when the admin clears the key or moves the plugin to another site:

```php
$old = get_option('my_plugin_license_key', '');
if ($old !== '') {
    $my_plugin_ld->deactivate($old);
    delete_option('my_plugin_license_key');
}
```

### Gating features

To unlock paid features, validate and cache the answer:

```php
function my_plugin_is_licensed()
{
    global $my_plugin_ld;

    $cached = get_transient('my_plugin_license_ok');
    if ($cached !== false) {
        return $cached === 'yes';
    }

    $key = get_option('my_plugin_license_key', '');
    if ($key === '') {
        return false;
    }

    $result = $my_plugin_ld->validate($key);

    // Store unreachable, busy or failing: don't lock the customer out over it.
    if (!$result->success && in_array($result->code, ['', 'RATE_LIMITED', 'INTERNAL_ERROR'], true)) {
        return true;
    }

    $ok = $result->success && !empty($result->data->valid) && !empty($result->data->identifier_activated);
    set_transient('my_plugin_license_ok', $ok ? 'yes' : 'no', DAY_IN_SECONDS);

    return $ok;
}
```

`validate()` returns license problems as data. An unknown, suspended or expired key gives `success = true` with `data->valid === false`. Read `data->status` for the reason.

## Automatic Updates

### Add an Update URI header

Add an `Update URI` line to your main plugin file's header, pointing at your store:

```php
/**
 * Plugin Name: My Plugin
 * Version:     1.4.0
 * Update URI:  https://your-store.com/my-plugin
 */
```

This is WordPress's own mechanism for plugins updated from somewhere other than WordPress.org (WordPress 5.8 and later). With it:

- WordPress asks your store for updates directly, through the `update_plugins_{host}` filter, and the SDK answers
- WordPress never offers a WordPress.org plugin that happens to share your plugin's folder name

The host must be your store's. The path after it isn't used.

Without the header, or on WordPress before 5.8, the SDK adds the update to WordPress's plugin update list itself. Customers see the same result either way.

### How it works

`init()` hooks these WordPress filters:

- `update_plugins_{your store's host}` – answers WordPress when the plugin declares an `Update URI` on your store
- `pre_set_site_transient_update_plugins` – the fallback without the header. The SDK asks your store for the latest version and compares it with the installed one. A newer version is offered with a package URL pointing at the [download endpoint](/licensedock/api/downloads)
- `plugins_api` – fills the **View details** modal with the name, version and the version's **Release Notes** from LicenseDock, shown under **Changelog**. Lines that start with `-`, `*` or `•` become a list, as on the customer's account page

WordPress downloads the package from your store itself, with the license key in the URL. The store checks the key before serving the file.

### Auto-updates

Customers can turn on **Enable auto-updates** for your plugin on the **Plugins** screen, and WordPress then installs new versions in the background. The SDK reports the plugin as up to date when it is, which WordPress needs to show that link at all times.

### Installed version

The installed version is read from the `Version:` header of `$pluginFile`. `setVersion()` overrides it:

```php
$my_plugin_ld->setVersion(MY_PLUGIN_VERSION);
```

If neither gives a version, no update is offered.

### Caching

- The update check is cached for **6 hours** per plugin, in a transient.
- Clicking **Check again** on **Dashboard → Updates** clears the cache, and so does finishing any update.
- A connection failure isn't cached, so a brief outage at your store doesn't hide updates for six hours.

Call `clearUpdateCache()` after saving a new key, so the next check uses it.

## Domain Activation on First Update

Added in SDK 2.0.0.

When the SDK builds an update offer, it puts the site's domain on the download URL as `identifier`. Before it does, it makes sure the domain is activated on the key:

1. It calls validate with the domain
2. If the domain is already activated, it uses it
3. If not, it calls activate, which takes a slot on the license
4. A successful result is cached for 6 hours

So each site that updates appears on the license in your store, and the activation limit applies to updates too. Before 2.0.0 the SDK sent no domain, and one key could update any number of sites.

### When activation fails

If the domain can't be activated – the limit is reached, the key is invalid or expired, the store can't be reached – the SDK hands WordPress a download URL **without** an identifier. Your product's **Download API Access** setting decides what happens:

| Download API Access | Result |
|---------------------|--------|
| Not set (with *Requires License* = Yes) | The update installs |
| License key | The update installs |
| License key + activated identifier | Refused with `ACTIVATION_REQUIRED`. WordPress reports the download as failed |
| Account only | Refused with `ACCOUNT_DOWNLOAD_REQUIRED` – don't use this for WordPress plugins |

WordPress fetches the package itself, so the SDK can't see a refusal and retry. It resolves the activation before handing over the URL. A failed activation isn't cached, so the next update check tries again.

An expired or suspended license is still offered the update, and the download is refused with `LICENSE_EXPIRED` or `LICENSE_INVALID`. Without a license key, the update is offered and the download is refused with `INVALID_REQUEST`. Tell customers on your settings page that updates need an active license.

### What the customer sees

When an update is waiting that your store will refuse, the SDK shows a warning on the **Dashboard**, **Plugins**, **Themes** and **Updates** screens, and under the plugin's update row. It names the product, gives the reason and links to your store:

| Reason | Shown when |
|--------|------------|
| No license key | The product needs a key and none is entered |
| Key not valid for this product | The key doesn't cover this product |
| License not active | Expired, suspended or revoked |
| No free activation | The product is set to *License key + activated identifier* and the site couldn't be activated |
| Account only | The product is set to *Account only* |

The warning uses what the last update check returned, so it adds no requests to your store. It clears once the update installs, or after **Check again** when the cause is fixed.

To reword or translate it:

```php
add_filter('licensedock_blocked_update_message', function ($html, $reason, $slug) {
    return $html; // $reason: no_key, invalid_key, inactive, not_activated or account
}, 10, 3);
```

### Opting out

```php
$my_plugin_ld->setSendIdentifier(false);
```

Downloads then carry the key only. No slot is taken on update and the store can't attribute downloads to sites. A product set to *License key + activated identifier* refuses every update.

## Checking Your Setup

- **Dashboard → Updates → Check again** on a test site with an older version installed shows the update
- The license in **Components → LicenseDock → Licenses** lists the test site's domain after the first update
- **Components → LicenseDock → Downloads** shows the download, with the domain. Switch the filter to **Refused** to see refusals and their reason codes

## Upgrading From SDK 2.0.0

Nothing you call has changed. 2.1.0 adds:

- [Theme support](/licensedock/integrations/wordpress-themes)
- The `Update URI` route. Add the header to your plugin to use it
- The **Enable auto-updates** link at all times. In 2.0.0 it only appeared while an update was waiting
- A warning naming why an update can't be installed. In 2.0.0 customers saw only "Download failed. Forbidden"
- The **Changelog** section of **View details** shows the version's release notes. In 2.0.0 it was always empty
- Two plugins on one site that both ship the SDK no longer cause a fatal error

Replace both files in your plugin.

## Upgrading From SDK 1.1.0

2.0.0 changes behaviour on your customers' sites:

- Sites now take activation slots when they update. A customer who ran one key on more sites than the plan allows keeps updating on the sites that fit, and the rest update without an identifier, as described in [When activation fails](#when-activation-fails)
- Your store shows which domains run the plugin
- The two files no longer need a fixed folder layout

Replace both files in your plugin, and check the plan activation limits before you release.
