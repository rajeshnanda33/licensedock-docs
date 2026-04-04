# Installation

## Requirements

- Joomla 5.x
- PHP 8.1 or higher
- MySQL 8.0 or MariaDB 10.4+

## Install the Package

1. Download the `pkg_licensedock.zip` package from your account
2. In Joomla admin, go to **System → Install → Extensions**
3. Upload the package file and click **Upload & Install**

The package installs everything you need automatically:

| What's installed | Purpose |
|-----------------|---------|
| LicenseDock Component | The main component (admin + site) |
| Webservices Plugin | Enables the API for license checks and downloads |
| User Plugin | Cleans up data when a user is deleted |
| Task Plugin | Sends emails, handles renewals, and cleans up expired sessions |

## Enable Plugins

After installation, ensure the following plugins are enabled:

1. Go to **System → Plugins**
2. Search for "licensedock"
3. Enable all LicenseDock plugins

## Next Steps

- [Configure your store](/licensedock/getting-started/configuration) – set currency, gateway keys, and store details
- [Quick Start guide](/licensedock/getting-started/quick-start) – create your first product and make a test sale
