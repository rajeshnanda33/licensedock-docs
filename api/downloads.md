# Downloads

Download a product file securely. The endpoint verifies the license before serving the file.

## Request

```
GET /api/index.php/v1/licensedock/downloads/{product_id}
```

### Parameters

| Parameter | Type | In | Required | Description |
|-----------|------|-----|----------|-------------|
| `product_id` | integer | URL | Yes | Product ID |
| `license_key` | string | Query | Yes* | The license key |
| `dlid` | string | Query | Yes* | Alternative to `license_key` (Joomla convention) |
| `identifier` | string | Query | No | Activation identifier to verify |

*Either `license_key` or `dlid` must be provided. The `dlid` parameter exists for compatibility with Joomla's update system.

### Example

```bash
# Using license_key
curl -OJ "https://yoursite.com/api/index.php/v1/licensedock/downloads/42?license_key=ABCD-1234-EFGH-5678"

# Using dlid (Joomla update system)
curl -OJ "https://yoursite.com/api/index.php/v1/licensedock/downloads/42?dlid=ABCD-1234-EFGH-5678"

# With activation identifier
curl -OJ "https://yoursite.com/api/index.php/v1/licensedock/downloads/42?license_key=ABCD-1234-EFGH-5678&identifier=example.com"
```

## Response

### Success (200)

Returns the file as a binary download:

```
Content-Type: application/zip
Content-Disposition: attachment; filename="my-extension-2.1.0.zip"
Content-Length: 5242880
Cache-Control: no-cache, no-store, must-revalidate
```

### Errors (JSON mode)

When using `license_key`, errors return JSON:

```json
{
  "error": {
    "code": "LICENSE_EXPIRED",
    "message": "License has expired"
  }
}
```

| Code | Status | When |
|------|--------|------|
| `INVALID_REQUEST` | 400 | Missing `product_id` or license key |
| `LICENSE_NOT_FOUND` | 403 | License key doesn't exist |
| `LICENSE_INACTIVE` | 403 | License is not active |
| `LICENSE_EXPIRED` | 403 | License has expired |
| `PRODUCT_MISMATCH` | 403 | License doesn't belong to this product |
| `ACTIVATION_NOT_FOUND` | 403 | Identifier not activated on this license |
| `DOWNLOAD_NOT_FOUND` | 404 | No download available for this product |
| `FILE_NOT_FOUND` | 404 | Download record exists but file missing from server |
| `RATE_LIMITED` | 429 | Too many requests (60 per minute per IP) |

### Errors (Joomla mode)

When using `dlid`, errors return **plain text** with the HTTP status code – no JSON wrapper. This is for compatibility with Joomla's updater, which expects simple error messages.

## Validation Flow

The download endpoint validates in this order:

1. **License exists** – is the key valid?
2. **License active** – status must be `active`
3. **License not expired** – `expires_at` must be in the future (or null for lifetime)
4. **Product match** – license must belong to the requested product
5. **Activation check** – if `identifier` is provided, it must be activated on this license
6. **File exists** – product must have a published download with a file on disk

### Identifier Normalization

If you pass an `identifier`, it's normalized based on the plan's activation type before checking:

| Type | Input | Normalized |
|------|-------|------------|
| `domain` | `https://www.example.com/path` | `example.com` |
| `seat` | `User@Email.com` | `user@email.com` |
| `device` | `MacBook-Pro-ABC123` | `MacBook-Pro-ABC123` (unchanged) |
| `instance` | `server-prod-01` | `server-prod-01` (unchanged) |

## Download Logging

Every successful download is logged with:

- User ID, product ID, license ID
- File name and version
- Client IP address
- Activation identifier (if provided)
- Timestamp

View download logs in the admin panel for analytics and auditing.

## Security

- **Path traversal protection** – file paths are validated with `realpath()` against the base download directory
- **Rate limiting** – 60 requests per 60 seconds per IP address
- **No direct file access** – download files are stored outside the web root with `.htaccess` protection
