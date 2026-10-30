# Changelog

Return the release notes of every published version as Joomla changelog XML. Public, no license key.

Put this address in `<changelogurl>` in a Joomla extension. Joomla reads it to show the **Changelog** button in **System → Manage → Extensions** and **System → Update → Extensions**. See [Joomla Extensions](/licensedock/integrations/joomla#optional-a-changelog-button).

## Request

```
GET /api/index.php/v1/licensedock/changelog/{product_id}
```

### Parameters

| Parameter | Type | In | Required | Notes |
|-----------|------|-----|----------|-------|
| `product_id` | integer | URL | Yes | Product ID |

### Example

```bash
curl "https://yoursite.com/api/index.php/v1/licensedock/changelog/42"
```

## Response

Always `200` with `Content-Type: application/xml`, cached for an hour (`Cache-Control: public, max-age=3600`). Joomla reads it, so it uses Joomla's changelog format instead of the JSON envelope of the other endpoints.

```xml
<?xml version="1.0" encoding="utf-8"?>
<changelogs>
    <changelog>
        <element>my-extension</element>
        <type>package</type>
        <version>2.1.0</version>
        <security>
            <item><![CDATA[Escape titles in the admin list]]></item>
        </security>
        <fix>
            <item><![CDATA[Crash on save]]></item>
        </fix>
        <addition>
            <item><![CDATA[Zoom]]></item>
        </addition>
    </changelog>
    <changelog>
        <element>my-extension</element>
        <type>package</type>
        <version>2.0.0</version>
        ...
    </changelog>
</changelogs>
```

- One `<changelog>` per published version, in the order of the product's **Downloads** tab
- Each line goes into a Joomla group by its label or heading, see [Writing release notes](/licensedock/products/downloads#writing-release-notes). A line with neither goes into `<change>`
- `<element>` is the product's alias. Joomla ignores it and shows the `<changelog>` whose `<version>` exactly equals the version installed or offered
- A product that doesn't exist or has no published version returns an empty `<changelogs></changelogs>`, and Joomla shows no button

Item text is plain text: HTML in your release notes is shown as typed.
