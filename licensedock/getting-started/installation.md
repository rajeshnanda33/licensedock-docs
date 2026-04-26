# Installation

## Requirements

- Joomla 5.x
- PHP 8.1 or higher
- MySQL 8.0 or MariaDB 10.4+

## Install the Package

1. Download `pkg_licensedock.zip` from your account
2. In Joomla admin, go to **System → Install → Extensions**
3. Upload the package and click **Upload & Install**

The package installs the component and four plugins:

| Extension | Purpose |
|-----------|---------|
| `com_licensedock` | The component (admin + site + API) |
| `plg_webservices_licensedock` | Registers the REST API routes |
| `plg_user_licensedock` | Cleans up customer data when a Joomla user is deleted |
| `plg_task_licensedock` | Scheduled tasks: email queue, renewal reminders, abandoned-checkout recovery |
| `plg_pagecache_licensedock` | Excludes checkout, account, and download pages from the page cache |

## Enable the Plugins

After install, go to **System → Plugins**, search for `licensedock`, and enable all five.

## Set Up Scheduled Tasks

LicenseDock relies on Joomla's task scheduler for emails, renewal reminders, and abandoned-checkout recovery. After install:

1. Go to **System → Scheduled Tasks → New**
2. Add **LicenseDock – Process Email Queue** (run every 5 minutes)
3. Add **LicenseDock – Renewal Reminders** (run every hour)

For reliable execution under load, point a real cron job at Joomla's web cron URL rather than relying on the lazy scheduler.

## Next Steps

- [Configuration](/licensedock/getting-started/configuration) – store details, currency, email, gateways
- [Quick Start](/licensedock/getting-started/quick-start) – your first product and test sale
