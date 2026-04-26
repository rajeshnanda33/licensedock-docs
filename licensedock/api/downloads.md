# Downloads

Stream a product file. The endpoint verifies the license before delivering the file.

## Request

```
GET /api/index.php/v1/licensedock/downloads/{product_id}
```

### Parameters

| Parameter | Type | In | Required | Notes |
|-----------|------|-----|----------|-------|
| `product_id` | integer | URL | Yes | Product ID |
| `license_key` | string | Query | Yes* | The license key |
| `dlid` | string | Query | Yes* | Alias for `license_key` (Joomla update system) |
| `identifier` | string | Query | No | Activation identifier to verify before serving |

*Either `license_key` or `dlid` must be present.

### Example

```bash
# License key
curl -OJ "https://yoursite.com/api/index.php/v1/licensedock/downloads/42?license_key=A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6"

# Joomla update system
curl -OJ "https://yoursite.com/api/index.php/v1/licensedock/downloads/42?dlid=A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6"

# With activation check
curl -OJ "https://yoursite.com/api/index.php/v1/licensedock/downloads/42?license_key=A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6&identifier=example.com"
```

## Response

### Success (200)

Streams the file directly:

```
Content-Type: application/zip
Content-Disposition: attachment; filename="my-extension-2.1.0.zip"
Content-Length: 5242880
Cache-Control: no-cache, no-store, must-revalidate
```

### Errors – JSON Mode

When called with `license_key`, errors are JSON:

```json
{
  "error": {
    "code": "LICENSE_EXPIRED",
    "message": "License has expired"
  }
}
```

| Code | HTTP | When |
|------|------|------|
| `INVALID_REQUEST` | 400 | Missing `product_id` or license key |
| `LICENSE_NOT_FOUND` | 403 | License key doesn't exist |
| `LICENSE_INACTIVE` | 403 | License status isn't `active` |
| `LICENSE_EXPIRED` | 403 | License is past `expires_at` |
| `PRODUCT_MISMATCH` | 403 | License doesn't belong to this product |
| `ACTIVATION_NOT_FOUND` | 403 | `identifier` was supplied but isn't activated |
| `DOWNLOAD_NOT_FOUND` | 404 | No published download for this product |
| `FILE_NOT_FOUND` | 404 | Download record exists but the file is missing |
| `RATE_LIMITED` | 429 | More than 60 requests in 60 seconds from this IP |

### Errors – Plain-Text Mode

When called with `dlid`, errors are plain text with the appropriate HTTP status. This keeps Joomla's updater happy:

```
HTTP/1.1 403
Content-Type: text/plain

License has expired
```

## Validation Order

The endpoint stops at the first failure:

1. `product_id` and license key are present
2. License key exists
3. License `status` is `active`
4. License hasn't expired
5. License belongs to the requested product
6. If `identifier` was supplied, it's activated on the license
7. Product has a published download
8. The file exists on disk and is inside the download base directory

## Identifier Normalisation

If `identifier` is supplied, it's normalised based on the plan's activation type. See [API conventions](/licensedock/api/#identifier-normalisation).

## Download Logging

Every successful download is logged with:

- User ID, product ID, license ID
- File name, version
- Client IP
- Activation identifier (if supplied)
- Timestamp

View the log in **Components → LicenseDock → Downloads**.

## Security

- **Path traversal protection** – served files must resolve inside the configured download base directory
- **Rate limiting** – 60 requests per 60 seconds per IP
- **No direct access** – store download files outside the web root, or block them with `.htaccess` / nginx config. LicenseDock streams files itself
