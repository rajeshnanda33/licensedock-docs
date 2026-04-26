# Products

Products are the core of LicenseDock. Each product is one digital item you sell – a Joomla extension, a desktop app, a theme, a font, a course download, etc.

## Structure

LicenseDock uses a three-level hierarchy:

```
Product → Plan → Price
```

- **Product** – what you're selling
- **Plan** – a tier or variant (Single Site, Developer, Agency)
- **Price** – a billing option on a plan ($49 one-time, $99/year)

A product can have many plans, and each plan can have many prices. The customer picks one plan + price at checkout.

## Creating a Product

Go to **Components → LicenseDock → Products → New**.

### Basics

| Field | Notes |
|-------|-------|
| Title | Product name shown to customers |
| Alias | URL slug. Auto-generated from title |
| Description | HTML. Shown above the pricing on the product page |
| Description (Additional) | HTML. Shown below the pricing |
| Short Description | Used in listings and meta description fallback |
| Highlights | HTML. Bullet points shown alongside the hero |
| Status | Published, Unpublished, Archived, Trashed |
| Featured | Pin to the top of storefront listings |
| Tags | One or more [tags](/licensedock/products/tags) for filtering |

### Media

| Field | Notes |
|-------|-------|
| Image | Main product image |
| Image Folder | Path to a folder of gallery images |

### Hero Layout

The product page has a configurable hero block.

| Field | Notes |
|-------|-------|
| Layout | `two_column` (gallery + info side by side) or `stacked` |
| Column Split | `4-8`, `6-6`, `8-4` (for `two_column`) |
| Gallery / Info CSS Class | Optional Bootstrap utilities for the stacked layout |
| Description Wrapper Class | Default `col-lg-8 mx-auto` |

### License Behaviour

| Field | Default | Notes |
|-------|---------|-------|
| Requires License | Yes | When off, plans don't expose activation fields and orders don't issue license keys |

### Renewal Pricing

For recurring products, you can offer existing customers a discount when they renew.

| Field | Notes |
|-------|-------|
| Renewal Discount % | Discount applied if the customer renews within the grace period |
| Grace Period Days | Days after expiry where the renewal discount still applies |
| Lapsed Discount % | Smaller discount for renewals after the grace period |

### Bundles

| Field | Notes |
|-------|-------|
| Is Bundle | Mark this product as a bundle |
| Bundle Products | List of products included in the bundle |

### Call to Action

| Field | Notes |
|-------|-------|
| CTA Text | Custom button label for product listings |
| CTA Class | Custom CSS class for the listing button |

### SEO

| Field | Notes |
|-------|-------|
| Meta Title | Browser tab title. Falls back to product title |
| Meta Description | – |
| Meta Keywords | – |

## Buy Links

Each plan/price has a **Copy buy link** button in the admin. The link looks like:

```
/checkout?plan_price_id=42
/checkout?plan_price_id=42&trial=1
/checkout?plan_price_id=42&coupon=LAUNCH20
```

Use these for landing pages, email campaigns, or anywhere you want to link directly to a specific plan + billing cycle.

## Next Steps

- [Plans & Pricing](/licensedock/products/plans) – plans, prices, billing cycles, trials
- [Downloads](/licensedock/products/downloads) – versioned downloads and update delivery
- [Tags](/licensedock/products/tags) – categorise products
