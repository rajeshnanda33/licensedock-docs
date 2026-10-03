# Installation

## Requirements

- Joomla 6
- PHP 8.3 or later
- MySQL or MariaDB

## Install the Package

1. Download `pkg_dcleads.zip` from your account at [contona.com](https://contona.com/joomla-extensions/dcleads)
2. In Joomla admin, go to **System → Install → Extensions**
3. Upload the package and click **Upload & Install**

The package installs three extensions:

| Extension | Purpose |
|-----------|---------|
| `com_dcleads` | The component: forms, leads, settings and the form menu item |
| `mod_dcleads_form` | **DC Leads - Form** module, shows a form in any module position |
| `plg_system_dcleads` | **System - DC Leads**, records the landing page, referrer and ad tags of each visit |

On a fresh install the system plugin is enabled automatically. On an update its state is left as it is. Without it, leads do not record where they came from – the [Dashboard](/dcleads/admin/dashboard) flags this.

Three starter forms are created on install: **Contact**, **Request a quote** and **Call me back**. See [Quick Start](/dcleads/getting-started/quick-start).

The component menu has four screens: **Dashboard**, **Leads**, **Forms** and **Settings**.

## Activate Your License

1. Go to **Components → DC Leads → Settings**
2. On the **License** tab, paste your key into **License key**
3. Click **Save**

The key is checked against the store when you save it, and the **Status** line below the field shows the result:

| Status | Meaning |
|--------|---------|
| Active. Valid until ... | Updates are on |
| Not activated. | No key entered |
| Your DC Leads license has expired, so updates are paused. | Renew to get updates again |
| This DC Leads license is already in use on the maximum number of sites. | The key is in use on its maximum number of sites |
| That key belongs to a different product. | The key is for another extension |
| That DC Leads license key was not recognised, or it is no longer active. | Check the key |
| The license server could not be reached. | The last known status applies; the key is checked again later |

The license status is checked again at most once a day, when the Dashboard is opened. Changing or clearing the key frees this domain on the old key.

Forms, leads and emails keep working without a license or after it lapses. The license is needed for updates only.

## Updates

Updates arrive through Joomla's own updater at **System → Update → Extensions** while the license is active. There is no separate Download Key to enter – saving the license key sets it for you.

## Uninstalling

What happens to your data depends on **Keep leads when uninstalling** under **Settings → General**:

| Setting | On uninstall |
|---------|--------------|
| Yes (default) | Forms and leads stay in the database. Reinstalling brings them back |
| No | The `#__dc_leads` and `#__dc_lead_forms` tables are dropped. There is no undo |

Export your leads to CSV before uninstalling with this setting off. See [Leads](/dcleads/leads/#export-to-csv).

## Next Steps

- [Quick Start](/dcleads/getting-started/quick-start) – put a form on a page and send a test lead
- [Email Settings](/dcleads/settings/email) – who gets new lead emails
