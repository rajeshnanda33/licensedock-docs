# Bundles

A bundle is a product that includes other products. The customer buys the bundle once and gets the downloads, updates and license coverage of every included product.

A bundle is an ordinary product with its own plans, prices, page and license settings. What makes it a bundle is its list of included products.

## Creating a Bundle

1. Create a product for the bundle and save it
2. Add its plans and prices on the **Plans & Pricing** tab, as for any product
3. Go to the **Downloads** tab
4. Set **Bundle** to Yes
5. Pick the products in **Included Products**
6. Save

| Field | Default | Notes |
|-------|---------|-------|
| Bundle | No | Enable to include downloads from other products |
| Included Products | – | Customers who buy this product also get downloads from the selected products |

**Included Products** lists published products that are not bundles themselves. Bundles do not nest.

The bundle does not need files of its own – it delivers the included products' files. Its price, billing cycle, trial, renewal discount and activation settings come from the bundle's own plans and product settings.

## What the Customer Gets

One purchase creates one order, one subscription and – when the bundle's **Requires License** is Yes – one license key, all for the bundle product.

### Downloads in the account

The customer's downloads page lists the versions of every included product for as long as the bundle subscription gives access. When the bundle subscription expires, access to the included products ends with it, unless the customer also owns an included product directly.

A bundle carries no plan on the included products, so bundle customers receive each included product's **all-plans** files. Files restricted to a plan of an included product are available only to customers who bought that plan directly.

### Product pages

On the page of an included product, a signed-in customer with an active or trialing bundle subscription sees **Included in your** followed by the bundle name, linking to the bundle, in place of a buy button.

## How Keys Resolve Through a Bundle

The bundle's license key is accepted for each included product. When your software sends the included product's ID, the API checks whether the key is for that product or for a bundle that includes it.

| Endpoint | With a bundle key and an included product's ID |
|----------|-----------------------------------------------|
| [Activate](/licensedock/api/activate), [Validate](/licensedock/api/validate), [Deactivate](/licensedock/api/deactivate) | Accepted |
| [Update check](/licensedock/api/updates) | Reports the included product's latest version for the key |
| [Downloads](/licensedock/api/downloads) | Serves the included product's all-plans auto-update files |

Details:

- **Activations are per license.** The activation type and limit come from the bundle plan the customer bought. Activating the same identifier for two included products uses one activation slot.
- **Delivery rules follow the product being downloaded.** An included product is served according to its own **Download API Access**. A bundle that includes a PDF product with *Account only* still serves that PDF from the account only.
- **Only one level.** A key for a bundle covers that bundle's included products and nothing further.
- A key for an included product does not cover the bundle or the other included products.

## Store Health

**Store Health** flags a published bundle whose included products have no published download between them, since it would deliver nothing.

## Things to Check

- Changes to **Included Products** apply to existing customers at once. Adding a product gives every current bundle customer access to it; removing one takes it away.
- A product sold only inside a bundle is still treated as paid by the download API. With **Download API Access** on *Not set* and **Requires License** on No, it is served from the account only.
- To stop a product being a bundle, clear **Included Products** and save.
