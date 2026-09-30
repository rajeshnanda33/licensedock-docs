# Installation

## Requirements

- Joomla
- The PHP version your Joomla release requires, with the OpenSSL extension (gateway keys and the SMTP password are encrypted with it)
- MySQL or MariaDB
- HTTPS on the live site – Store Health flags a store served over plain HTTP

Optional PHP extensions:

| Extension | Used for |
|-----------|----------|
| GD | Converting the store logo (for example WebP) so it can be drawn on PDF invoices. Without it, invoices render without the logo |
| Zip (`ZipArchive`) | Reading `.xlsx` files in the [importer](/licensedock/admin/imports). CSV files work without it |

## Install the Package

1. Download `pkg_licensedock.zip` from your account
2. In Joomla admin, go to **System → Install → Extensions**
3. Upload the package and click **Upload & Install**

The package installs the component and five plugins:

| Extension | Purpose |
|-----------|---------|
| `com_licensedock` | The component (admin, site and API) |
| `plg_webservices_licensedock` | Registers the REST API routes, including the gateway webhook URLs |
| `plg_user_licensedock` | Keeps the customer email in step with the Joomla user, and cleans up when a user is deleted – see [Privacy & GDPR](/licensedock/admin/privacy) |
| `plg_task_licensedock` | Scheduled tasks: email queue, reminders and expiry, abandoned checkout recovery – see [Scheduled Tasks](/licensedock/admin/scheduled-tasks) |
| `plg_pagecache_licensedock` | Keeps checkout and account pages out of Joomla's page cache |
| `plg_content_licensedock` | Product shortcodes for articles and modules |

## Languages

English (`en-GB`) and German (`de-DE`) are included for the storefront, checkout, admin, emails and invoices. Other languages use Joomla's standard language files: add a translation under **System → Languages** or with language overrides.

## Plugins After Install

On a fresh install, the web services, user, task and page cache plugins are enabled automatically. The content plugin is left disabled – enable it under **System → Plugins** when you want product shortcodes.

On an update, plugin states are left as they are, so a plugin you disabled on purpose stays disabled.

Store Health checks that the four core plugins are enabled. Without the web services plugin, gateway webhooks return 404 and orders never complete.

## Set Up Scheduled Tasks

Emails, reminders, expiry and abandoned checkout recovery run through Joomla's Task Scheduler. After install, create three tasks under **System → Scheduled Tasks → New**:

| Task | Execution Rule | Value |
|------|----------------|-------|
| LicenseDock - Process Email Queue | Interval, Minutes | 5 |
| LicenseDock - Reminders & Expiration | Interval, Hours | 1 |
| LicenseDock - Abandoned Checkout Recovery | Interval, Minutes | 15 |

Then point a real cron job at the scheduler. See [Scheduled Tasks](/licensedock/admin/scheduled-tasks) for the web cron and CLI cron commands.

## Activate Your License

Go to **Components → LicenseDock → Settings**. The **LicenseDock License** card at the top of the page takes your license key and activates it for the current domain. The card shows the status, domains used and the expiry date.

The same key authorises LicenseDock updates through Joomla's own updater – there is no separate Download Key to enter. Local and reserved addresses cannot be activated, so a local or staging copy does not use up a domain.

## Uninstalling

Uninstalling removes the extensions but keeps your data. Every `#__licensedock_*` table stays in the database, and reinstalling restores full access. To remove the data permanently, drop those tables yourself.

## Next Steps

- [Configuration](/licensedock/getting-started/configuration) – store details, currency, email, invoices
- [Quick Start](/licensedock/getting-started/quick-start) – your first product and test sale
