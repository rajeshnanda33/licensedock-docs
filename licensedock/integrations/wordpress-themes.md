# WordPress Themes

`LicenseDockWordPressTheme` connects a WordPress theme you sell to your store. It behaves like the [plugin SDK](/licensedock/integrations/wordpress):

- New versions appear under **Appearance → Themes** and **Dashboard → Updates**, and install with the normal Update button
- Customers can turn on **Enable auto-updates** for the theme
- Your settings page can activate the license key against the site's domain
- Each site that updates is activated against the key on its first update, so the activation limit applies

## Requirements

- PHP 7.4 or later on the customer's site
- SDK 2.1.0 or later
- A LicenseDock product for the theme, with a version uploaded and its zip ticked **Include in auto-updates**
- The version in LicenseDock in the same format as the `Version:` line in your theme's `style.css`

## Getting the Files

Download the SDK from your account at contona.com, next to the LicenseDock package, and unzip `licensedock-sdk-v2.1.0.zip`. Ship three files inside your theme:

```
my-theme/
├── style.css
├── functions.php
└── licensedock/
    ├── LicenseDockClient.php
    └── wordpress/
        ├── LicenseDockWordPress.php
        └── LicenseDockWordPressTheme.php
```

`LicenseDockWordPressTheme` extends the plugin class, which extends `LicenseDockClient`, so all three are needed.

## Setup

In `functions.php`:

```php
if (!class_exists('LicenseDockWordPressTheme')) {
    require_once get_template_directory() . '/licensedock/wordpress/LicenseDockWordPressTheme.php';
}

$my_theme_ld = new LicenseDockWordPressTheme(
    'https://your-store.com',  // store URL
    42                         // product ID in LicenseDock
);

$my_theme_ld->setLicenseKey(get_option('my_theme_license_key', ''));
$my_theme_ld->init();
```

Use `get_template_directory()`, which is always your theme's folder. `get_stylesheet_directory()` points at the child theme when one is active.

### Child themes

The SDK updates the **parent** of the active theme. Customers are told to customise through a child theme, and WordPress still runs the parent's `functions.php`, so the updater runs and updates your theme while the child's changes stay in place.

To update a different folder, pass its name as the third argument:

```php
new LicenseDockWordPressTheme('https://your-store.com', 42, 'my-theme');
```

### Add an Update URI header

Add an `Update URI` line to `style.css`, pointing at your store:

```css
/*
Theme Name: My Theme
Version:    2.3.0
Update URI: https://your-store.com/my-theme
*/
```

This is WordPress's own mechanism for themes updated from somewhere other than WordPress.org (WordPress 6.1 and later). With it, WordPress asks your store for updates directly through the `update_themes_{host}` filter, and never offers a WordPress.org theme that happens to share your folder name.

Without the header, or on WordPress before 6.1, the SDK adds the update to WordPress's theme update list itself. Customers see the same result either way.

## License Key Screen

The methods match the plugin SDK: `activate()`, `validate()`, `deactivate()`, `setVersion()`, `setSendIdentifier()` and `clearUpdateCache()`. See [WordPress Plugins](/licensedock/integrations/wordpress#methods).

A license screen usually sits under **Appearance**:

```php
add_action('admin_menu', function () {
    add_theme_page('My Theme License', 'Theme License', 'manage_options', 'my-theme-license', 'my_theme_license_page');
});
```

The page itself is the same as the [plugin example](/licensedock/integrations/wordpress#license-key-settings-page): activate the key when it is saved, store it, then call `setLicenseKey()` and `clearUpdateCache()`.

## Update Details

On a theme update, WordPress shows a **View version details** link and opens it in a popup frame. Most stores send a header that refuses to be shown inside another site's frame, so the SDK serves the details from the customer's own admin instead: the version and its **Release Notes** from LicenseDock. Lines that start with `-`, `*` or `•` become a list.

The page is only shown to users who can update themes.

## Things to Know

- **Theme code only runs while the theme is active.** A copy that is installed but not active isn't checked for updates. This is how every theme updater behaves.
- **Themes on WordPress.org can't do this.** The theme directory doesn't allow a theme to fetch updates from anywhere else. If your free theme is on WordPress.org, sell the premium part as a plugin and use the [plugin SDK](/licensedock/integrations/wordpress).
- When the store will refuse the update, the same warning as for plugins appears on the Dashboard, Themes and Updates screens. See [What the customer sees](/licensedock/integrations/wordpress#what-the-customer-sees).
- Downloads, domain activation and what happens when activation fails all work as for plugins. See [Domain Activation on First Update](/licensedock/integrations/wordpress#domain-activation-on-first-update).

## Checking Your Setup

- Install an older version of the theme on a test site, activate it, and click **Dashboard → Updates → Check again**
- The update appears with a **View version details** link showing the release notes
- After updating, the license in **Components → LicenseDock → Licenses** lists the test site's domain
