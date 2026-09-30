# Plans & Pricing

A product has one or more plans, and each plan has one or more prices. Plans control how a license behaves and what the pricing card shows. Prices control how the customer is billed.

Manage both on the product's **Plans & Pricing** tab. Save the product first – the tab is empty until the product exists.

## Plans

Click **Add Plan**, or **Edit** on an existing plan card.

### Plan details

| Field | Notes |
|-------|-------|
| Title | Required. The name of the pricing tier – *Starter*, *Pro*, *Single Site*, *Agency* |
| Description | A short line shown below the plan title on the pricing card |

### License activation

Shown only when the product's **Requires License** is Yes.

| Field | Default | Notes |
|-------|---------|-------|
| Activation Type | Domain | Domain, Device, Seat or Instance. What each activation represents |
| Activation Limit | 1 | How many domains, devices, seats or instances can use one license. `0` = unlimited |

The activation type controls what the customer's software sends to the API as the identifier.

| Type | Tracks | Example identifier |
|------|--------|--------------------|
| Domain | Websites | `example.com` |
| Device | Computers, phones | `MacBook-Pro-ABC123` |
| Seat | Individual users | `user@company.com` |
| Instance | Server or container instances | `prod-api-01` |

LicenseDock normalises identifiers by type before comparing them, so the same site activated as `https://www.example.com/` and `example.com` uses one activation slot. See [Activations](/licensedock/licenses/activations).

### Features

The bullet list on the pricing card. Each row has an icon and a text:

| Icon | Shows |
|------|-------|
| Included | ✓ |
| Excluded | ✗ |
| N/A | – |
| Custom icon | Any icon class you type, such as `icon-star` |

Use the arrows to reorder rows.

### Visibility and ordering

| Field | Default | Notes |
|-------|---------|-------|
| Recommended | No | Highlights this plan on the product page. Use it on one plan per product |
| Recommended Label | *Most Popular* | Ribbon text on the pricing card. Shown when Recommended is Yes |
| Ordering | – | Position of the plan on the pricing table |
| Status | Published | Published or Unpublished |

## Prices

Click **Add Price** on a plan card, or **Edit** on a price row. The price table shows each price's cycle, amount, trial, billing type, status and **ID**. The ID is what buy links and the `{ld_buybutton}` snippet use.

### Billing Cycle

New prices default to Annual.

| Cycle | Billing |
|-------|---------|
| Monthly | Renews every month |
| Quarterly | Renews every 3 months |
| Semi-Annual | Renews every 6 months |
| Annual | Renews every year |
| One-Time | One payment, no automatic renewal |

The billing cycle alone decides whether a price is recurring. One-Time is the only non-recurring cycle.

A plan can carry several prices – for example a *Developer* plan with a monthly and an annual price. The customer picks one on the pricing table.

### Access Duration (One-Time only)

| Option | Behaviour |
|--------|-----------|
| Lifetime | No expiry |
| Valid For | Expires after a **Duration** and **Unit** (Days, Weeks, Months or Years). The customer buys again to extend |

### Pricing

| Field | Notes |
|-------|-------|
| Price | Required. `0` makes the price free |
| Tax class | Shown when tax is enabled in Settings. **Standard (taxed)** is taxed at the destination rate; **None (tax-exempt)** is exempt |

A One-Time price of `0` gives instant access at checkout with no payment step. A recurring price of `0` still sends the customer through the payment gateway to authorise a payment method for future charges – use One-Time for a free product.

### Trial (recurring only)

| Field | Default | Notes |
|-------|---------|-------|
| Trial Days | 0 | Days before the first regular charge. `0` disables the trial |
| Trial Price | 0 | `0` for a free trial. Above `0` for a paid trial charged at checkout |

How trials work:

- A trial is opt-in. The customer starts it with the trial button on the pricing card or a buy link with `&trial=1`. Otherwise checkout charges the regular price.
- After the trial days, the regular price is billed on the chosen cycle.
- A payment method is collected for a free trial too, so the renewal can be charged.
- Each customer gets one trial per product. A customer who has already used it sees the regular price at checkout.
- A trial does not combine with a coupon. When a trial is selected, checkout drops the coupon.

### Visibility and status

| Field | Notes |
|-------|-------|
| Ordering | Position of the price within the plan |
| Status | Published or Unpublished. New prices default to Published |

## Buy Links

Each price row has two copy buttons:

| Button | Copies |
|--------|--------|
| Copy buy link | A checkout link with this price selected |
| Copy buy link with trial | The same link with `&trial=1`. Enabled only when the price has trial days |

Both are disabled until the product, the plan and the price are all published.

```
https://example.com/checkout?plan=42
https://example.com/checkout?plan=42&trial=1
https://example.com/checkout?plan=42&coupon=LAUNCH20
```

`plan` is the price ID. Append `&coupon=CODE` to pre-apply a coupon.

## Translations

Plan title, description, recommended label and feature texts are translatable. See [Translations](/licensedock/products/translations).
