# Check Updates

Check if a newer version is available for a product. This endpoint is public – no license key required.

## Request

```
GET /api/index.php/v1/licensedock/updates/{product_id}
```

### Parameters

| Parameter | Type | In | Required | Description |
|-----------|------|-----|----------|-------------|
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

| Code | Status | When |
|------|--------|------|
| `INVALID_REQUEST` | 400 | Missing or invalid `product_id` |

---

## Joomla Update Server Integration

If you sell Joomla extensions through LicenseDock, your customers can receive updates directly in their Joomla admin panel. Here's how to set it up.

### How Joomla Updates Work

Joomla's built-in updater follows this flow:

```
Extension manifest → Update server URL → Fetches update XML → Shows "Update Available" → Downloads package
```

1. Your extension's manifest declares an update server URL
2. Joomla periodically fetches that URL and expects **XML** describing available versions
3. If a newer version exists, Joomla shows it in **System → Updates**
4. When the user clicks Update, Joomla downloads the package from the `downloadurl` in the XML

### Step 1: Create an Update XML File

LicenseDock's `/updates/` endpoint returns JSON (for generic software). For Joomla's native updater, you need an XML file in Joomla's format.

Host this XML file on your website (e.g., `https://licensedock.com/updates/my-extension.xml`):

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
        <infourl title="My Extension">https://licensedock.com/my-extension</infourl>
        <downloads>
            <downloadurl type="full" format="zip">https://yoursite.com/api/index.php/v1/licensedock/downloads/42</downloadurl>
        </downloads>
        <targetplatform name="joomla" version="5\.[0-9]+" />
        <php_minimum>8.1</php_minimum>
    </update>
</updates>
```

::: tip
Update this XML each time you release a new version. You can automate this as part of your release process.
:::

### Step 2: Add the Update Server to Your Manifest

In your extension's manifest XML (`pkg_myextension.xml` or component XML), declare the update server:

```xml
<updateservers>
    <server type="extension" name="My Extension Updates">
        https://licensedock.com/updates/my-extension.xml
    </server>
</updateservers>
```

### Step 3: License Key for Downloads (dlid)

The download endpoint requires a license key. Joomla uses a convention called **Download Key** (`dlid`) for this.

Your customers enter their license key in **System → Update Sites** → click on your extension → paste their key in the **Download Key** field.

Joomla automatically appends `&dlid=LICENSE_KEY` to the download URL. LicenseDock's download endpoint accepts both `license_key` and `dlid` parameters for this reason.

So the final download URL Joomla constructs looks like:

```
https://yoursite.com/api/index.php/v1/licensedock/downloads/42?dlid=ABCD-1234-EFGH-5678
```

### Step 4: Tell Your Customers

In your extension's documentation, instruct customers to:

1. Install the extension
2. Go to **System → Update Sites**
3. Find your extension in the list and click on it
4. Paste their **License Key** into the **Download Key** field
5. Save

That's it – they'll now receive updates in their Joomla admin like any other extension.

### Error Handling

When Joomla's updater hits the download endpoint with a `dlid` parameter, LicenseDock returns plain text error messages (not JSON) so Joomla can display them properly:

| Situation | Response |
|-----------|----------|
| Missing or empty `dlid` | `Download ID (license key) is required` |
| Invalid license key | `License not found` |
| Expired license | `License has expired` |
| Inactive license | `License is not active` |
| Wrong product | `License does not match this product` |
