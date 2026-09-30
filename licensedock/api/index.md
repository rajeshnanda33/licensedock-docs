# API Reference

LicenseDock provides a REST API for license activation, license checks, update checks and file downloads. Your software calls it on your store.

To wire the API into a WordPress plugin, a Joomla extension or other PHP code, start with [Integrations](/licensedock/integrations/). This section is the raw contract.

## Base URL

```
https://yoursite.com/api/index.php/v1/licensedock/
```

## Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | [`/licenses/activate`](/licensedock/api/activate) | Register an activation |
| POST | [`/licenses/deactivate`](/licensedock/api/deactivate) | Remove an activation |
| POST | [`/licenses/validate`](/licensedock/api/validate) | Check license status |
| GET | [`/updates/{product_id}`](/licensedock/api/updates) | Latest published version of a product |
| GET | [`/downloads/{product_id}`](/licensedock/api/downloads) | Download the latest published file |

## Authentication

The routes are public. The license key is the credential. Joomla API tokens are not used.

Pass the key as `license_key`. Every endpoint also accepts `dlid` as an alias, because that is the name Joomla's updater uses.

## Sending Parameters

POST endpoints read **form fields** (`application/x-www-form-urlencoded`). GET endpoints read the query string.

```bash
curl -X POST https://yoursite.com/api/index.php/v1/licensedock/licenses/validate \
  -d "license_key=A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6" \
  -d "product_id=42"
```

::: warning
A JSON request body is ignored. The endpoint sees no parameters and answers `400 INVALID_REQUEST`. Send form fields.
:::

A request without an `Accept` header is treated as `Accept: application/json`.

### `product_id` on license calls

Activate, deactivate and validate take an optional `product_id`. Send it. A key that belongs to a different product is then refused with `PRODUCT_MISMATCH`. Without it, any valid key from your store is accepted, whatever product it was bought for.

A key for a bundle covers each product inside that bundle, so a bundle key passes the check for each included product ID.

## Response Format

### Success

```json
{
  "data": {
    "key": "value"
  }
}
```

HTTP `200`, `Content-Type: application/json`.

### Error

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable description"
  }
}
```

The HTTP status reflects the error class. Branch on `code`. Messages may change between versions.

The download endpoint is the one exception: it streams a file on success, and can answer errors with an HTML page. See [Downloads](/licensedock/api/downloads#errors).

## Error Codes

| Code | HTTP | Returned by | When |
|------|------|-------------|------|
| `INVALID_REQUEST` | 400 | all | A parameter is missing, too long (over 255 characters), or malformed |
| `LICENSE_INVALID` | 403 | activate, deactivate, download | Key not found, or its status isn't `active`. One code for both, so nobody can probe which keys exist |
| `LICENSE_EXPIRED` | 403 | activate, download | License is past `expires_at`. A license expiring at this exact second counts as expired |
| `PRODUCT_MISMATCH` | 403 | activate, deactivate, validate, download | The key is valid but belongs to a different product |
| `ACTIVATION_LIMIT_REACHED` | 403 | activate | No free activation slots. The payload also carries `activation_limit` and `activations_used` |
| `ACTIVATION_NOT_FOUND` | 404 / 403 | deactivate (404), download (403) | The identifier sent isn't activated on this license |
| `ACTIVATION_REQUIRED` | 403 | download | The product needs an activated identifier and none was sent |
| `ACCOUNT_DOWNLOAD_REQUIRED` | 403 | download | The product is only delivered through the customer's account |
| `DOWNLOAD_NOT_FOUND` | 404 | download | Product doesn't exist, isn't published, or has no published file for this license's plan |
| `FILE_NOT_FOUND` | 404 | download | The download record exists but its file is missing on the server |
| `RATE_LIMITED` | 429 | all | Too many requests. Back off and retry. It says nothing about the license |
| `INTERNAL_ERROR` | 500 | all | Unexpected server failure. Safe to retry |

Treat a code you don't recognise as a generic failure. Later versions may add codes.

**Validate is the exception.** An unknown, inactive or expired key comes back as `200` with `valid: false`. Read `valid` and `status` there. See [Validate License](/licensedock/api/validate).

## Rate Limiting

Every limit uses a sliding window and answers `429 RATE_LIMITED` when exceeded.

| Limit | Applies to |
|-------|-----------|
| 60 requests per 60 seconds, per IP, per endpoint | All five endpoints |
| 20 requests per hour, per license key, per endpoint | Activate, deactivate, validate |
| 40 unknown or inactive keys per hour, per IP | Shared across all endpoints. Counts only keys that fail to resolve |
| 30 refused downloads per hour, per license key | Download |
| 20 downloads per hour, per key + identifier | Download, when `identifier` is sent |
| 20 downloads per hour per activation slot, capped at 400 | Download, when no `identifier` is sent. A single-slot license still gets 20; an unlimited license gets 400 |

A working client stays far below these. Cache validation results on your side and don't validate on every page load.

## Identifier Normalisation

Endpoints that take an `identifier` normalise it by the plan's activation type before storing or comparing it:

| Type | Input | Stored as |
|------|-------|-----------|
| `domain` | `https://www.Example.com:8080/path` | `example.com` |
| `seat` | `User@Example.com` | `user@example.com` |
| `device` | `MacBook-Pro-ABC123` | unchanged (trimmed) |
| `instance` | `prod-api-01` | unchanged (trimmed) |

For `domain`, the scheme, a leading `www.`, the port and any path are removed, then the value is lowercased. A domain that normalises to nothing (for example `http://`) is refused with `INVALID_REQUEST`.

## Conventions

- Timestamps are ISO 8601 in UTC: `2026-03-20T03:21:26Z`
- The update check's `date` is a calendar date only: `2026-03-20`
- Absent values are `null`
- JSON is encoded with `JSON_UNESCAPED_SLASHES`
- License keys look like `A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6`
