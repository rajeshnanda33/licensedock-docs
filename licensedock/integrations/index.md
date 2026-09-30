# Integrations

Your software talks to your store through the [REST API](/licensedock/api/). How much code that takes depends on the platform.

## Which Integration Do I Use?

| Your software | Use | What you get |
|---------------|-----|--------------|
| **WordPress plugin** | [WordPress SDK](/licensedock/integrations/wordpress) – `LicenseDockWordPress` | Updates in the WordPress dashboard, license activation, the site domain activated automatically |
| **WordPress theme** | [WordPress SDK](/licensedock/integrations/wordpress-themes) – `LicenseDockWordPressTheme` | The same, for themes, child themes included |
| **Joomla extension** | [Joomla's own updater](/licensedock/integrations/joomla) – no SDK | Updates in Joomla's admin, with the Download Key as the license key |
| **Other PHP** | [PHP client](/licensedock/integrations/php) – `LicenseDockClient` | Activate, validate, deactivate, update checks. A reference client to copy and adapt |
| **Anything else** – desktop, Electron, CLI, mobile, other languages | The [REST API](/licensedock/api/) directly | Form-encoded HTTP calls and JSON responses |

## Getting the SDK

The SDK is a separate download. Download it from your account at contona.com, next to the LicenseDock package. The file is `licensedock-sdk-v2.1.0.zip`:

```
sdk/
├── LicenseDockClient.php                    ← PHP client, and the base class for WordPress
├── wordpress/LicenseDockWordPress.php       ← WordPress plugins
├── wordpress/LicenseDockWordPressTheme.php  ← WordPress themes
└── README.md
```

The SDK needs PHP 7.4 or later. It runs inside your software on your customers' servers, so its PHP requirement is separate from your store's.

## Per-Product Code in the Admin

Every product shows integration code already filled in with its own ID and your store URL. Open **Components → LicenseDock → Products → [product] → Downloads** and scroll to **Integration**. There are three tabs:

| Tab | Shows |
|-----|-------|
| **Joomla** | The product's download URL, a sample update XML, the manifest lines, reading the key, activating the domain, and the installer plugin that sends the domain with each update |
| **WordPress** | The SDK setup and activate-on-save snippets |
| **REST API** | curl requests and responses for each endpoint, and the error codes |

Copy from there to skip replacing placeholders by hand. The URLs work as soon as the product is saved, and serve a file once you upload a version.

## What You Need From the Store

| Value | Where |
|-------|-------|
| Store URL | Your site's root URL, e.g. `https://yoursite.com` |
| Product ID | The ID column in **Products** |
| Activation type | Per plan: `domain`, `device`, `seat` or `instance`. It decides what your software sends as `identifier` |
| Download API Access | Per product, on the Details tab. Decides what `/downloads` asks for. See [Downloads](/licensedock/api/downloads#download-api-access) |

## Activation Types

Set per plan. Your software sends a generic `identifier` and the store normalises it by the plan's type.

| Type | Send |
|------|------|
| `domain` | The site's host, e.g. `customer-site.com` |
| `device` | A stable machine fingerprint |
| `seat` | The user's email address |
| `instance` | A server hostname or ID |
