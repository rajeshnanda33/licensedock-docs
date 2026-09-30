# Downloads

Stream the latest file of a product. What the endpoint asks for depends on the product's **Download API Access** setting.

## Request

```
GET /api/index.php/v1/licensedock/downloads/{product_id}
```

### Parameters

| Parameter | Type | In | Required | Notes |
|-----------|------|-----|----------|-------|
| `product_id` | integer | URL | Yes | Product ID |
| `license_key` | string | Query | Depends on the setting | The license key |
| `dlid` | string | Query | – | Alias for `license_key`, sent by Joomla's updater. Also switches errors to HTML, see [Errors](#errors) |
| `identifier` | string | Query | Depends on the setting | An activation identifier (domain, device, email, instance). Normalised by the plan's activation type |

### Example

```bash
# License key
curl -fL -o release.zip \
  "https://yoursite.com/api/index.php/v1/licensedock/downloads/42?license_key=A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6"

# License key + activated identifier
curl -fL -o release.zip \
  "https://yoursite.com/api/index.php/v1/licensedock/downloads/42?license_key=A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6&identifier=example.com"
```

Use `-f` with curl. Without it, a refusal is written into `release.zip` and you end up with a "package" that is really a JSON error.

## Download API Access

Set per product in **Components → LicenseDock → Products → [product] → Details → Download API Access**. It controls the API only. Emailed download links follow **Settings → Delivery Method**.

| Setting | What `/downloads` needs |
|---------|------------------------|
| **Not set** | Decided from the product's own settings on every request – see below |
| **License key** | A valid key. Where it is used isn't checked |
| **License key + activated identifier** | A valid key and an `identifier` already activated on that license |
| **Account only** | Never served by the API. The customer downloads from their account |
| **Public** | Nothing. Anyone can download |

**Not set** resolves like this:

| Product | Behaves as |
|---------|-----------|
| *Requires License* = Yes | License key |
| *Requires License* = No, paid | Account only |
| *Requires License* = No, free | Public |

A product counts as paid if it has ever had a price above zero, has ever sold for money, or is included in a paid bundle.

Those rules are also a floor. The setting can make a product stricter, never more open:

- *Public* on a paid product still behaves as *Account only*.
- *License key* or *License key + activated identifier* on a product with *Requires License* = No can't apply, because no key exists. The product behaves as *Account only* if paid, *Public* if free.

The product edit screen shows the mode currently in force under the field.

### Sending an identifier

Sending `identifier` opts in to being checked against it, whatever the setting. An identifier that isn't activated is refused with `ACTIVATION_NOT_FOUND`, even when the product only asks for a key. Send one only after activating it.

Under *Public*, `identifier` is only logged.

The [update check](/licensedock/api/updates) returns `download_requires`, so a client can find out what it needs before it tries.

## Response

### Success (200)

The file is streamed as an attachment:

```
Content-Type: application/octet-stream
Content-Disposition: attachment; filename="my-extension-2.1.0.zip"; filename*=UTF-8''my-extension-2.1.0.zip
Content-Length: 5242880
Cache-Control: no-cache, no-store, must-revalidate
X-Content-Type-Options: nosniff
```

The file served is the one the update check describes: the most recently uploaded published version, files ticked **Include in auto-updates** only, scoped to the license's plan. See [Which Version Is Returned](/licensedock/api/updates#which-version-is-returned).

### Errors

By default errors are JSON:

```json
{
  "error": {
    "code": "LICENSE_EXPIRED",
    "message": "License has expired."
  }
}
```

When the request carries `dlid`, or an `Accept` header containing `text/html`, errors are an HTML page with the same HTTP status. It shows your store's brand name, the error code and message, what to do next, and a link to the customer's account. That covers a customer clicking a link and Joomla's updater, which sends `dlid`.

| Code | HTTP | When |
|------|------|------|
| `DOWNLOAD_NOT_FOUND` | 404 | Product doesn't exist or isn't published |
| `INVALID_REQUEST` | 400 | The setting needs a key and none was sent |
| `ACCOUNT_DOWNLOAD_REQUIRED` | 403 | The product is *Account only* |
| `LICENSE_INVALID` | 403 | Key doesn't exist, or its status isn't `active` |
| `LICENSE_EXPIRED` | 403 | License is past `expires_at` |
| `PRODUCT_MISMATCH` | 403 | The key doesn't cover this product, directly or through a bundle |
| `ACTIVATION_REQUIRED` | 403 | *License key + activated identifier* and no `identifier` was sent |
| `ACTIVATION_NOT_FOUND` | 403 | An `identifier` was sent and it isn't activated on this license |
| `DOWNLOAD_NOT_FOUND` | 404 | No published file for this license's plan |
| `FILE_NOT_FOUND` | 404 | The download record exists but the file is missing on the server |
| `RATE_LIMITED` | 429 | Too many requests. See below |
| `INTERNAL_ERROR` | 500 | Unexpected server failure |

The endpoint stops at the first failure, in the order listed.

`ACTIVATION_REQUIRED` and `ACTIVATION_NOT_FOUND` are separate on purpose. The first means "send an identifier". The second means "activate the one you sent". A client can fix either itself.

## Rate Limits

| Limit | Scope |
|-------|-------|
| 60 requests per 60 seconds | Per IP |
| 30 refused downloads per hour | Per license key |
| 20 downloads per hour | Per key + identifier, when `identifier` is sent |
| 20 per activation slot per hour, 400 at most | Per key, when no `identifier` is sent. Joomla's updater lands here |

## Logging

Every served download is logged with the user, product, license, file name, version, client IP and the normalised identifier. Every refusal is logged with the license, identifier and reason code.

View them in **Components → LicenseDock → Downloads**. Switch the filter to **Refused** for refusals, grouped by license and reason and kept for 90 days. Check it after tightening a product's Download API Access, to see which customers it stopped.

## Security

- **Path containment** – the served file must resolve inside the configured download directory
- **Forced binary type** – files are always served as `application/octet-stream` with `nosniff`, so an uploaded SVG or HTML file can't run in the browser
- **No direct access** – keep download files outside the web root, or block them in `.htaccess` / nginx. LicenseDock streams them itself
