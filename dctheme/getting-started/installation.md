# Installation

## Requirements

- Joomla 6.0 or 6.1
- PHP 8.3 or later

## Install the Package

1. Download `pkg_dctheme.zip` from your account at [contona.com](https://contona.com/joomla-extensions/dctheme)
2. In Joomla admin, go to **System → Install → Extensions**
3. Upload the package and click **Upload & Install**

The confirmation lists the template, the eight modules and the two plugins, with buttons for **Add your license key**, **The plugins** and **The modules**. Every module is listed in **Content → Site Modules** under a name starting with **DC Theme -**.

On a fresh install both plugins, **System - DC Theme** and **Sample Data - DC Theme**, are enabled for you.

The package also adds a **Social image** custom field for articles, in a field group named **DC Theme**. See [Branding](/dctheme/template/branding#share-image).

## Make DC Theme the Site Template

Go to **System → Site Template Styles** and set **DC Theme - Default** as the default style. Every setting in these docs lives on that style: open it to see the tabs Brand, Identity, Features, Social, Layout, Analytics and Reference.

The template is inheritable, so you can create a child template from it in **System → Site Templates**.

## Activate Your License

1. Go to **System → Plugins** and open **System - DC Theme**
2. Paste your key into **License key**
3. Click **Save**

The key is checked as soon as you save, and the result is shown as a message and in the read-only **Status** field, for example `Active. Valid until 1 October 2027.`

| Status | Meaning |
|--------|---------|
| Active | Updates are on. The expiry date is shown when the license has one |
| Your DC Theme license has expired, so updates are paused. | Renew to get updates again |
| This DC Theme license is already in use on the maximum number of sites. | The key has no free activations left |
| That key belongs to a different product. | You pasted a key for another extension |
| That DC Theme license key was not recognised, or it is no longer active. | Check the key in your account |

The license is activated for the domain in the **Live Site** URL in Global Configuration, or the domain you reached the admin on when that is empty. A leading `www.` is ignored.

After that, the key is checked again once a day when an administrator who can manage plugins opens the admin. If the license server cannot be reached, the last known status stays in place.

Until a key is active, administrators see a notice linking to the plugin. If the plugin is disabled or uninstalled, the template style shows a warning that updates cannot be downloaded.

## Updates

Updates arrive through Joomla's own updater in **System → Update → Extensions**. The license key is written to the package's update site for you, so there is no separate Download Key to enter.

When the license lapses, updates pause and the site keeps working exactly as before. The license plugin only runs in the admin, so the front end never depends on a license check.

:::tip
Keep your own CSS in `user.css` and it survives every update – see [Extras](/dctheme/template/extras#your-own-css-and-javascript).
:::

## Next Steps

- [Sample Data](/dctheme/getting-started/sample-data) – build the example site in one click
- [Branding](/dctheme/template/branding) – logo, icons, site name and copyright line
- [Colours](/dctheme/template/colours) – palettes, custom colours and dark mode
