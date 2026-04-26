# Checkout Flow

LicenseDock uses a direct, single-product checkout – no shopping cart. Same model as Paddle, Gumroad, and LemonSqueezy.

## Flow

```
Product Page → Buy Now → Checkout → Payment → Thank You
```

1. Customer clicks **Buy Now** on a product or plan card
2. The selection (plan + price + trial flag) is saved to their session and to the `ld_cart` cookie
3. They land on the checkout page
4. They sign in or proceed as guest, fill in billing details, and pay
5. On success, the thank-you page shows the order, license keys, and download links

If they navigate away or close the browser, the `ld_cart` cookie (24 hours) reseeds the session when they come back – their selection is still there.

## Menu Item

Create a single Checkout menu item:

1. **Menus → New**
2. Type: **LicenseDock → Checkout**
3. Save

You can hide it from navigation – the URL just needs to exist for routing.

## Buy Links

Anywhere you want a direct purchase link, use:

```
/checkout?plan_price_id=42
/checkout?plan_price_id=42&trial=1
/checkout?plan_price_id=42&coupon=LAUNCH20
```

Each plan/price has a **Copy buy link** button in admin that builds these URLs for you.

## Payment Methods

Customers pick from any gateway you've enabled – Stripe, PayPal, Mollie. See [Payment Gateways](/licensedock/gateways/stripe).

## Billing Details

The checkout form collects:

| Field | Required | Notes |
|-------|----------|-------|
| Name | Yes | – |
| Email | Yes | – |
| Company | No | For B2B |
| Address, City, Postcode, Country | Yes | – |
| State / Region | No | – |
| Tax ID | No | VAT, GST, EIN. Shown on the invoice |
| Phone | Optional | Visibility controlled by the **Phone Field on Checkout** setting (`hidden`, `optional`, `required`) |

## Empty Checkout

If a customer hits `/checkout` with no selection in session and no `ld_cart` cookie, they see an empty-state page with a *Browse Products* link.

## Abandoned Checkout Recovery

If a customer reaches checkout and leaves without paying, LicenseDock can email them a recovery link. Configure intervals and max attempts in [Settings → Abandoned Checkout Recovery](/licensedock/getting-started/configuration#abandoned-checkout-recovery).

The recovery link reseeds the original selection (plan, trial, coupon) into their session and drops them back at checkout.

## Next Steps

- [Coupons](/licensedock/checkout/coupons) – discount codes
- [Guest Checkout](/licensedock/checkout/guest-checkout) – buy without an account first
