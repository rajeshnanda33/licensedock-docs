# Check Updates

Return the latest published download for a product. Public – no license key required.

## Request

```
GET /api/index.php/v1/licensedock/updates/{product_id}
```

### Parameters

| Parameter | Type | In | Required | Notes |
|-----------|------|-----|----------|-------|
| `product_id` | integer | URL | Yes | Product ID |

### Example

```bash
curl "https://yoursite.com/api/index.php/v1/licensedock/updates/42"
```

## Response

### Update Available (200)

```json
{
  "data": {
    "update_available": true,
    "name": "My Joomla Extension",
    "version": "2.1.0",
    "download_url": "/api/index.php/v1/licensedock/downloads/42",
    "changelog": "- Fixed critical bug\n- Added new feature",
    "date": "2026-04-03T10:30:00Z",
    "file_size": 5242880
  }
}
```

### No Update (200)

```json
{
  "data": {
    "update_available": false
  }
}
```

::: info
"No update available" is returned as data, not as an error – it's a valid response.
:::

### Errors

| Code | HTTP | When |
|------|------|------|
| `INVALID_REQUEST` | 400 | Missing or non-integer `product_id` |
| `RATE_LIMITED` | 429 | More than 60 requests in 60 seconds from this IP |

---

## Joomla Update Server Integration

If you sell Joomla extensions through LicenseDock, your customers can receive updates directly in their Joomla admin panel.

### How Joomla Updates Work

```
Extension manifest → Update server URL → Update XML → "Update Available" → Download package
```

1. Your extension's manifest declares an update server URL
2. Joomla periodically fetches that URL and expects **XML** describing available versions
3. If a newer version exists, Joomla shows it in **System → Updates**
4. When the user clicks Update, Joomla downloads from the `downloadurl` in the XML

### Step 1: Create an Update XML File

LicenseDock's `/updates/` endpoint returns JSON for generic software clients. For Joomla's native updater, host an XML file in Joomla's expected format (e.g. `https://yoursite.com/updates/my-extension.xml`):

```xml
<?xml version="1.0" encoding="utf-8"?>
<updates>
    <update>
        <name>My Joomla Extension</name>
        <description>My Joomla Extension Package</description>
        <element>pkg_myextension</element>
        <type>package</type>
        <version>2.1.0</version>
        <client>administrator</client>
        <infourl title="My Extension">https://yoursite.com/my-extension</infourl>
        <downloads>
            <downloadurl type="full" format="zip">https://yoursite.com/api/index.php/v1/licensedock/downloads/42</downloadurl>
        </downloads>
        <targetplatform name="joomla" version="5\.[0-9]+" />
        <php_minimum>8.1</php_minimum>
    </update>
</updates>
```

::: tip
Update this XML each time you release a new version. Automate it as part of your release process.
:::

### Step 2: Add the Update Server to Your Manifest

In your extension's manifest XML, declare the update server:

```xml
<updateservers>
    <server type="extension" name="My Extension Updates">
        https://yoursite.com/updates/my-extension.xml
    </server>
</updateservers>
```

### Step 3: License Key for Downloads (dlid)

Joomla calls a license key the **Download Key** (`dlid`). Customers enter their key in **System → Update Sites → [your extension] → Download Key**.

Joomla appends `&dlid=LICENSE_KEY` to the download URL automatically. LicenseDock's download endpoint accepts both `license_key` and `dlid` for this reason.

The final URL Joomla constructs:

```
https://yoursite.com/api/index.php/v1/licensedock/downloads/42?dlid=A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6
```

### Step 4: Tell Your Customers

In your extension's docs, instruct customers to:

1. Install the extension
2. Go to **System → Update Sites**
3. Click on your extension
4. Paste their **License Key** into the **Download Key** field
5. Save

They'll now receive updates in their Joomla admin like any other extension.

### Plain-Text Errors for Joomla

When Joomla calls the download endpoint with `dlid`, LicenseDock returns errors as plain text (not JSON) so Joomla displays them in the update UI:

| Situation | Response |
|-----------|----------|
| Missing or empty `dlid` | `Download ID (license key) is required` |
| Invalid license key | `License not found` |
| Expired license | `License has expired` |
| Inactive license | `License is not active` |
| Wrong product | `License does not match this product` |
