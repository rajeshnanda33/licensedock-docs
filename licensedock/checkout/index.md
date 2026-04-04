# Checkout Flow

LicenseDock uses a direct, single-product checkout – no shopping cart. This is the same model used by Paddle, Gumroad, and LemonSqueezy.

## How It Works

```
Product Page → "Buy Now" → Checkout Page → Payment → Thank You
```

1. Customer clicks **Buy Now** on a product page
2. Customer is taken to the checkout page with their selected plan and price
3. Customer enters billing details and pays via Stripe, PayPal, or Mollie
4. On success, they see the thank-you page with order details

If payment fails or the customer cancels, they can return to the checkout page and try again – LicenseDock remembers what they were buying.

## Menu Item

To enable checkout on your site, create a menu item:

1. Go to **Menus → Add New Menu Item**
2. Select **LicenseDock → Checkout** as the type
3. Save (you can hide it from the menu if you want – the URL just needs to exist)

## Next Steps

- [Coupons](/licensedock/checkout/coupons) – discount codes
- [Guest Checkout](/licensedock/checkout/guest-checkout) – allow purchases without registration
