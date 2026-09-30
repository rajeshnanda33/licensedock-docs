# Product Snippets

Snippets are `{ld_…}` tokens that render parts of a product – its pricing table, a buy button, the gallery, the descriptions – inside Joomla articles and custom-HTML modules. Use them to sell from a landing page you design yourself.

## Enabling the Plugin

Snippets in articles and modules are rendered by the **LicenseDock - Product Snippets** content plugin. The LicenseDock package installs it disabled. Enable it in **System → Plugins** when you want to use snippets.

In a Custom module, enable Joomla's **Prepare Content** option so content plugins run on the module.

## Finding a Product's Snippets

Open the product and go to the **Shortcode** tab. It lists every token with this product's ID filled in and a **Copy** button next to each. Save a new product first – the tab is empty until the product exists.

## Tokens

| Token | Renders | Attributes |
|-------|---------|------------|
| `{ld_title id=5}` | Product title as plain text | `id` |
| `{ld_gallery id=5}` | Image gallery | `id`, `class` |
| `{ld_short_description id=5}` | Short description | `id` |
| `{ld_highlights id=5}` | Key highlights | `id` |
| `{ld_description id=5}` | Description | `id` |
| `{ld_pricing id=5}` | Full pricing table – plans, billing toggle and buy buttons | `id` |
| `{ld_additional_description id=5}` | Additional description | `id` |
| `{ld_buybutton plan=123}` | Buy button for one price | `plan`, `label`, `class` |

`id` is the product ID. Attribute values with spaces go in double quotes:

```
<h2>{ld_title id=5}</h2>
{ld_gallery id=5 class="my-gallery"}
{ld_buybutton plan=123 label="Buy now" class="btn btn-lg btn-success"}
```

### Buy button

`plan` is a **price** ID – the number in the **ID** column on the **Plans & Pricing** tab. The button links to checkout with that price selected.

| Attribute | Default | Notes |
|-----------|---------|-------|
| `plan` | – | Required. Price ID |
| `label` | *Buy Now*, or *Get Started* for a free price | Button text |
| `class` | `btn btn-primary` | Replaces the button's classes completely |

## Rules

- A token renders nothing when its product is unpublished, the visitor lacks its access level, or the token is unknown. A raw `{ld_…}` is never left on the page.
- `{ld_buybutton}` renders nothing unless its price and plan are published.
- Snippets work for products with any **Storefront visibility**, including *No product page*.
- The pricing table follows your site cache like any cached content. After changing a plan or price, clear the Joomla cache so the change shows.

## Snippets in a Product's Own Description

Tokens also work in a product's **Description** and **Additional Description** fields. There, `id` is optional and defaults to the current product. This works without the content plugin.
