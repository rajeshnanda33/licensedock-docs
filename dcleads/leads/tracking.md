# Campaign Tracking

Each lead records where the visitor came from: the page they landed on, the site that sent them and the ad tags on their first tagged visit. This is done by the **System - DC Leads** plugin, which is enabled on install. Nothing that identifies the person is stored.

## What Is Captured

| Value | Shown as | Captured |
|-------|----------|----------|
| Landing page | Landed on | The path and query of the first page the visitor opened on your site in this session |
| Referrer | Came from | The page that linked to your site, from the first request in the session. Links from your own site are ignored |
| `utm_source` | Source | From the URL |
| `utm_medium` | Medium | From the URL |
| `utm_campaign` | Campaign | From the URL |
| `utm_term` | Keyword | From the URL |
| `utm_content` | Ad | From the URL |
| `gclid`, `gbraid`, `wbraid` | Click id | Google Ads click IDs. `gbraid` and `wbraid` replace `gclid` for some iPhone clicks |
| `fbclid` | Click id | Meta (Facebook and Instagram) click ID |

Each value is cut to 150 characters (landing page and referrer to 255).

## When It Is Captured

Tracking is per visitor session, and the first touch wins:

- The landing page and referrer are taken from the first page of the session.
- The tags are taken from the first URL in the session that carries any of them. Later tagged URLs in the same session do not overwrite them.
- Everything is attached to the lead when the form is sent.

A visitor who arrives from an ad, browses a few pages and then fills in the contact form is still credited to that ad.

## Click IDs Without UTM Tags

When a URL has a click ID but no `utm_source`, DC Leads fills in the source and medium:

| Click ID | Source | Medium |
|----------|--------|--------|
| `gclid`, `gbraid` or `wbraid` | `google` | `cpc` |
| `fbclid` | `facebook` | `paid-social` |

A `utm_medium` on the URL is kept.

## Where You See It

- **Leads list** – the **Source** column shows the campaign, else the source, else the referring site's domain, else **Direct**. The **By campaign** card counts leads and wins per campaign.
- **Lead detail** – the **Where it came from** card lists the form, **Landed on**, **Campaign**, **Source**, **Medium**, **Keyword**, **Ad**, **Click id** and **Came from**. It shows **Direct** when no tags or referrer were recorded.
- **CSV export** – one column per value. See [Export to CSV](/dcleads/leads/#export-to-csv).
- **Filters** – filter the lead list by campaign.

## Tagging Your Ads

Add UTM tags to the landing page URL in each ad, for example:

```
https://example.com/quote?utm_source=google&utm_medium=cpc&utm_campaign=spring-sale&utm_term=roof+repair
```

Google Ads and Meta add their click IDs on their own when auto-tagging is on.

## If Leads Show No Source

- Check that **System - DC Leads** is enabled under **System → Plugins**. The [Dashboard](/dcleads/admin/dashboard) flags it when it is off.
- Tracking needs a Joomla session. When you test, use a fresh private window so the tagged URL is the first page of the session.
