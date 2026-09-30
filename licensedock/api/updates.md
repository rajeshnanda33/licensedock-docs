# Check Updates

Return the latest published version of a product. Public – the license key is optional.

Use this for custom updaters (desktop apps, CLI tools, your own PHP). WordPress plugins get this through the [WordPress SDK](/licensedock/integrations/wordpress). Joomla extensions use Joomla's own updater, see [Joomla update server integration](#joomla-update-server-integration).

## Request

```
GET /api/index.php/v1/licensedock/updates/{product_id}
```

### Parameters

| Parameter | Type | In | Required | Notes |
|-----------|------|-----|----------|-------|
| `product_id` | integer | URL | Yes | Product ID |
| `license_key` | string | Query | No | Scopes the result to the license's plan and adds the license's state. `dlid` is accepted as an alias |

### Example

```bash
# Public: latest version with an all-plans file
curl "https://yoursite.com/api/index.php/v1/licensedock/updates/42"

# Licensed: plan-scoped, with license state
curl "https://yoursite.com/api/index.php/v1/licensedock/updates/42?license_key=A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6"
```

## Response

### Version available (200)

```json
{
  "data": {
    "update_available": true,
    "name": "My Extension",
    "version": "2.1.0",
    "download_url": "https://yoursite.com/api/index.php/v1/licensedock/downloads/42",
    "download_requires": "license_key",
    "release_notes": "Bug fixes and improvements.",
    "date": "2026-04-03",
    "file_size": 5242880,
    "requires_license": true
  }
}
```

With a `license_key` that covers the product, four fields are added:

```json
{
  "data": {
    "update_available": true,
    "...": "the fields above, plus",
    "license_status": "active",
    "license_expires_at": "2027-04-03T00:00:00Z",
    "auto_renew": true,
    "next_payment_at": "2027-03-03T00:00:00Z"
  }
}
```

| Field | Notes |
|-------|-------|
| `update_available` | `true` when a published version exists. The API doesn't know which version the caller has installed – compare `version` with it yourself |
| `name` | Product title |
| `version` | Version string as entered in the admin |
| `download_url` | Absolute URL of the [download endpoint](/licensedock/api/downloads). `null` when the product is set to *Account only* |
| `download_requires` | What `/downloads` will ask for. See the table below |
| `release_notes` | The version's release notes, or `null` |
| `date` | Release date (`Y-m-d`). The release date set in the admin, or the upload date |
| `file_size` | Size in bytes of the file an updater would receive |
| `requires_license` | The product's *Requires License* setting |
| `license_status` | `active`, `expired`, `suspended`, `revoked` or `cancelled`. An active license past its expiry date reports `expired` |
| `license_expires_at` | `null` for a license that doesn't expire |
| `auto_renew` | `true` when the license renews through a recurring subscription |
| `next_payment_at` | Next renewal date, or `null` |

`download_requires` values:

| Value | Send to `/downloads` |
|-------|----------------------|
| `"license_key"` | The license key |
| `"activated_identifier"` | The license key and an identifier that is already activated |
| `"account"` | Nothing works. The file is only available from the customer's account |
| `null` | Nothing. The download is public |

### No version (200)

```json
{
  "data": {
    "update_available": false,
    "requires_license": true,
    "download_requires": "license_key"
  }
}
```

A product that doesn't exist answers the same way, with `download_requires: null`. No update is data, so it isn't an error.

### Errors

| Code | HTTP | When |
|------|------|------|
| `RATE_LIMITED` | 429 | More than 60 requests in 60 seconds from this IP |
| `INTERNAL_ERROR` | 500 | Unexpected server failure |

## Which Version Is Returned

- Only **published** versions count.
- Only files ticked **Include in auto-updates** count. A version whose files are all unticked (a manual, an SDK, source code) is never offered.
- The **most recently uploaded** version wins. The release date shown to customers doesn't change which version is served.
- Without a key, only files available to all plans count. With a key, files restricted to that license's plan count too, and the plan-specific file is preferred.
- A bundle key sees the all-plans files of each product in the bundle.

## License State Doesn't Hide Updates

The update check reports a new version whatever the license state – expired, suspended or revoked. A customer who installed the product still learns a newer version exists, and `license_status` tells your software which renewal message to show.

The download endpoint is where access is enforced. An expired key gets the metadata here and `403 LICENSE_EXPIRED` from `/downloads`.

## Joomla Update Server Integration

Joomla's updater reads its own XML format, so Joomla extensions don't call this endpoint. Joomla fetches your update XML and downloads the package from the [download endpoint](/licensedock/api/downloads) with the customer's key as `dlid`.

The full setup – update XML, manifest, Download Key, sending the site domain – is on [Joomla Extensions](/licensedock/integrations/joomla).
