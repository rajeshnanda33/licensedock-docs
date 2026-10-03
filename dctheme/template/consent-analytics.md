# Consent and Analytics

DC Theme adds Google and Meta tracking tags and a cookie consent bar without any extra extension. Both are set on the **Analytics** tab of **System → Site Template Styles → DC Theme - Default**.

## Analytics Tags

| Setting | Default | Description |
|---------|---------|-------------|
| Measure this site | Yes | Turn off on a staging copy. Turning it off also removes the consent bar |
| Google Tag Manager | Empty | A container ID such as `GTM-ABC1234` |
| Google tag | Empty | A tag ID such as `GT-ABC1234`. Hidden when Tag Manager is set |
| Google Analytics | Empty | A measurement ID such as `G-ABC1234XY`. Hidden when Tag Manager or a Google tag is set |
| Google Ads | Empty | A conversion ID such as `AW-123456789`. Hidden when Tag Manager or a Google tag is set |
| Meta pixel | Empty | The numeric ID from Meta Events Manager. Hidden when Tag Manager is set |

Fill in only what you use. With every field empty, no tag and no consent bar is added.

The fields hide each other to stop a visit being counted twice:

- **Tag Manager** loads everything else itself, so add Analytics, Ads and Meta inside your container
- **Google tag** already carries Analytics and Ads. Meta is not Google, so it stays
- **Google Analytics** and **Google Ads** together share one `gtag.js` loader

The form checks each ID's format, and an ID in the wrong format is never written to the page. A **Google Ads** ID alone does not count enquiries – each conversion also needs its conversion label on the page where it happens.

### Staging and Local Sites

No tag is written when the site is reached on `localhost`, `127.0.0.1`, or an address ending in `.test`, `.local`, `.localhost`, `.invalid` or `.example`, or when Joomla debug mode is on. A copy of a live site therefore does not send developer visits to the live reports.

The consent bar still appears there, so you can check its wording and placement before going live. For a staging copy on a public domain, set **Measure this site** to No.

## Cookie Consent

In the **Cookie consent** group:

| Setting | Default | Description |
|---------|---------|-------------|
| How to ask | Ask first | How visitors are asked about cookies – see the modes below |
| Where it appears | Bar at the foot | **Bar at the foot**, **Box in the middle** or **Card in the corner**. The box is the hardest to walk past, the card the quietest |
| Settings button | Yes | Adds a **Cookie settings** button that opens a panel to turn analytics and advertising on and off separately |
| Opening sentence | Empty | Leave empty and the bar names the purposes your tags serve |
| Cookie page | None | A menu item linked from the bar, usually your cookie or privacy policy |

The last four only show for **Ask first** and **Tell only**.

### Modes

| Mode | Bar | Tags |
|------|-----|------|
| Ask first | **Reject** and **Accept** | Nothing is measured until the visitor agrees. Lawful anywhere |
| Tell only | **OK** | Everyone is measured, the bar just says so. Many countries do not allow it |
| Another extension asks | None | Tags load with consent denied, waiting for a consent extension to grant it. The page carries no consent bar of its own |
| Measure without asking | None | Tags run with no consent step |

DC Theme uses Google Consent Mode: Google tags start with analytics and advertising storage denied, and the bar grants them when the visitor agrees. The Meta pixel stays revoked until advertising is accepted.

### What the Visitor Sees

With **Opening sentence** empty, the bar writes its own text from the tags you set, for example: *We use cookies to measure how the site is used and how well our advertising works. That means sharing some data with Google and Meta.*

The settings panel has three groups: **Necessary** (always on), **Analytics** and **Advertising**. Google Analytics counts as analytics; Google Ads and the Meta pixel count as advertising; Tag Manager and the Google tag count as both. The choice is stored in a `dc_consent` cookie and remembered for a year.

The stored answer is read in the browser, not on the server, so the bar works with Joomla's page cache.

### Let Visitors Change Their Answer

On your cookie page, add a button or link with `data-dc-consent-open="true"` and it reopens the choice:

```html
<button type="button" data-dc-consent-open="true">Change your cookie choice</button>
```

Keep the `="true"`. Joomla's text filter drops an attribute with no value. The button hides itself on sites with no bar.

### Using a Consent Extension

Set **How to ask** to **Another extension asks**. DC Theme draws no bar, loads the Google tags with every consent type denied and holds the Meta pixel revoked, for the extension to grant. For anything the built-in bar does not do, such as cookie scanning or region rules, use a dedicated consent extension this way.

## Next Steps

- [Extras](/dctheme/template/extras) – back to top, WhatsApp, social profiles, reveal on scroll
