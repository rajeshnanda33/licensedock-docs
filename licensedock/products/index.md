# Products

Products are the core of LicenseDock. Each product is one digital item you sell – a Joomla extension, a desktop app, a theme, a font, an ebook, a course download.

## Structure

LicenseDock uses a three-level hierarchy:

```
Product → Plan → Price
```

- **Product** – what you're selling
- **Plan** – a tier or variant (Single Site, Developer, Agency). Sets the activation type and limit
- **Price** – a billing option on a plan ($49 one-time, $99/year)

A product can have many plans, and each plan can have many prices. The customer picks one plan and one price at checkout.

## Creating a Product

Go to **Components → LicenseDock → Products → New**, enter a title and save. The **Plans & Pricing**, **Downloads** and **Shortcode** tabs become usable after the first save.

The product edit screen has four tabs:

| Tab | Contents |
|-----|----------|
| Details | Page content, layout, gallery, status, license and renewal settings, SEO |
| Plans & Pricing | Plans, their prices, and the buy-link buttons. See [Plans & Pricing](/licensedock/products/plans) |
| Downloads | Bundle setting, versions and files, integration URLs. See [Downloads](/licensedock/products/downloads) and [Bundles](/licensedock/products/bundles) |
| Shortcode | Snippet tokens for this product. See [Product Snippets](/licensedock/products/snippets) |

## Details Tab – Main Column

The main column follows the order of the product page.

### Image & Info Layout

| Field | Default | Notes |
|-------|---------|-------|
| Layout | Two Column | **Two Column** shows gallery and info side by side. **Stacked** shows the gallery above the info |
| Column Split | 6 / 6 | Two Column only. Options: 4 / 8, 5 / 7, 6 / 6, 7 / 5, 8 / 4 |
| Gallery Wrapper Class | `col-lg-8 mx-auto` | Stacked only. CSS class for the gallery section |
| Info Wrapper Class | `col-lg-6 mx-auto` | Stacked only. CSS class for the info section |

### Product Image & Gallery

| Field | Default | Notes |
|-------|---------|-------|
| Image | – | Main product image, picked from the Media Manager |
| Gallery Folder | – | Folder path such as `images/my-product`. Every image in it becomes a gallery slide |
| Gallery Ratio | 16:9 | 21:9, 2:1, 16:9, 3:2, 4:3, 1:1 or 2:3. Pick the ratio your images already are – other images are centred, never cropped |

### Info Buttons

A repeatable list of links shown below the product hero – Documentation, Live Demo, Changelog and so on.

| Field | Default | Notes |
|-------|---------|-------|
| Label | – | Button text |
| URL | – | A full URL (`https://example.com/docs`) or a path on this site (`/docs`, `#section`) |
| Open In | New Tab | New Tab or Same Tab |
| Style | Outline Primary | Bootstrap button style |

### Info

| Field | Notes |
|-------|-------|
| Short Description | Plain text, up to 500 characters. Shown beneath the product title on the products page and the product page. Line breaks are kept |
| Key Highlights | HTML. Selling points shown beside the product image |

### Details and Additional Details

| Field | Default | Notes |
|-------|---------|-------|
| Wrapper CSS Class | `col-lg-8 mx-auto` | CSS class for the section wrapper |
| Description | – | HTML. Shown above the pricing plans |
| Wrapper CSS Class | `col-lg-8 mx-auto` | CSS class for the Additional Details wrapper |
| Additional Description | – | HTML. Shown below the pricing plans |

The pricing plans render between the two descriptions.

## Details Tab – Sidebar

### Publishing

| Field | Default | Notes |
|-------|---------|-------|
| Status | Unpublished | Published, Unpublished, Archived, Trashed |
| Storefront visibility | Listed | See [Storefront Visibility](#storefront-visibility) |
| Access | Public | Joomla view access level. Guests who lack access are sent to the login page; logged-in users without access get a 403 |
| Ordering | – | Position in the default product listing order |
| Tags | – | One or more [tags](/licensedock/products/tags) |

### License

| Field | Default | Notes |
|-------|---------|-------|
| Requires License | Yes | **Yes** for software that validates a license key and receives updates. **No** for one-off downloads – ebooks, PDFs, audio, courses, design assets. When No, plans hide their activation settings |
| Download API Access | Not set | How the download API serves this product. See [Downloads → Download API Access](/licensedock/products/downloads#download-api-access) |

### Renewal Discount

| Field | Default | Notes |
|-------|---------|-------|
| Renewal Discount (%) | 0 | Discount applied at renewal. Lost if the customer renews after the grace period |
| Grace Period (days) | 1 | Days after expiry during which the renewal discount still applies. `0` disables grace |
| Lapsed Discount (%) | 0 | Discount for customers who renew after the grace period. `0` = full price |

How the discounts apply:

- **Automatic renewals** – a customer who buys a recurring price while a renewal discount is set pays the first cycle in full, then every automatic renewal at the discounted rate.
- **Manual renewal** – when a customer clicks **Renew** on an active, cancelled or expired subscription, the renewal discount applies up to the end of the grace period. After that, the lapsed discount applies.
- A trial that never converted to a paid cycle renews at full price.
- Adding a renewal discount later applies to new purchases only. Existing subscriptions keep the rate their gateway subscription was created with.

### Products Listing Page

| Field | Default | Notes |
|-------|---------|-------|
| Button Text | *View Plans* | Button label on the product listing. Leave empty to use the translatable default |
| Button Class | `btn btn-primary` | CSS class for the listing button |

### Meta Data

| Field | Notes |
|-------|-------|
| Browser Page Title | Falls back to the product title |
| Meta Description | Falls back to the Short Description |
| Keywords | Comma-separated. Not set when blank |
| Robots | Joomla's standard robots options. When left on *Use Global*, unlisted products get `noindex, follow` |

## Storefront Visibility

**Storefront visibility** controls where a product appears in your own storefront. It never affects existing customers: their downloads, licenses, update checks and account pages work the same for every setting.

| Option | Products listing | Product page |
|--------|------------------|--------------|
| Listed | Shown | Reachable and indexable |
| Unlisted | Hidden | Reachable by direct link. `noindex, follow` by default, and no schema.org product data or canonical tag |
| No product page | Hidden | Returns 404 |

Use **No product page** when you sell the product from your own article or landing page with [Product Snippets](/licensedock/products/snippets) or a buy link.

**Featured** products are pinned to the top of the products listing when it uses the default *Recommended* sort.

## Frontend Menu Items

LicenseDock adds two storefront menu item types under **Menus → New → LicenseDock**:

| Menu item type | Settings |
|----------------|----------|
| Products | **Filter by Tag** (optional – leave on *All Categories* to show every product), **Grid Columns** (2, 3 or 4, default 3), **Image Ratio** (default 16:9) |
| Single Product | **Select Product** (required) |

The products listing shows only published, *Listed* products the visitor has access to. Visitors can search, filter by tag, sort (Recommended, Newest, Name, Price), switch between grid and list view, and choose 12, 24 or 48 per page. See [Tags](/licensedock/products/tags) for tag pages.

## Buy Links

Every price on the **Plans & Pricing** tab has a **Copy buy link** button and, when the price has trial days, a **Copy buy link with trial** button. The buttons are disabled until the product, plan and price are all published.

The copied link opens checkout with that price selected:

```
https://example.com/checkout?plan=42
https://example.com/checkout?plan=42&trial=1
https://example.com/checkout?plan=42&coupon=LAUNCH20
```

`plan` is the price ID shown in the **ID** column. Append `&coupon=CODE` to pre-apply a coupon. On multilingual sites the link uses the site's default language.

## Translations

On a multilingual site, the product and tag edit screens show a **Translations** toolbar button. See [Translations](/licensedock/products/translations).

## Next Steps

- [Plans & Pricing](/licensedock/products/plans) – plans, prices, billing cycles, trials
- [Downloads](/licensedock/products/downloads) – versions, files and update delivery
- [Bundles](/licensedock/products/bundles) – sell several products as one
- [Tags](/licensedock/products/tags) – categorise products
- [Product Snippets](/licensedock/products/snippets) – embed product elements in articles and modules
- [Translations](/licensedock/products/translations) – translate catalog content
