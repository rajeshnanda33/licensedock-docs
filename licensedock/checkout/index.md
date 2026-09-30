# Checkout Flow

LicenseDock sells one plan price per checkout. There is no shopping cart: a buy link carries the chosen price, the checkout page shows that one item, and the customer pays for it.

## Flow

```
Product Page → Buy Now → Checkout → Payment → Thank You
```

1. The customer clicks **Buy Now** (or **Start free trial** / **Start trial**) on a plan card. The button is a plain link to the checkout page with the price ID in the URL.
2. The checkout page stores the selection (price, trial flag, coupon) in the session and in the `ld_cart` cookie.
3. The customer signs in or continues as a guest, fills in the billing address, ticks any required consent boxes and picks a payment method.
4. **Proceed to payment** creates a pending order and sends the customer to the gateway (Stripe, PayPal or Mollie).
5. After payment the customer returns to the thank-you page. The order is completed by the return or by the gateway webhook, whichever arrives first.

If the customer closes the browser, the `ld_cart` cookie brings the selection back the next time they open the checkout page.

## Checkout Menu Item

Create a menu item of type **LicenseDock → Checkout** (Checkout page). It can sit in a hidden menu.

Buy links and gateway return URLs are built against this menu item, which gives a clean URL such as `/checkout`. Without one, checkout still works, but the URLs fall back to a `/component/licensedock/...` path.

The menu item's **Browser Page Title** and **Page Heading** apply. The browser title always gets the product and plan appended (for example `Checkout – DC Theme – Pro`) so analytics can separate checkouts by product. The page is always sent with `noindex, nofollow`.

## Buy Links

Every plan price can be linked to directly:

```
/checkout?plan=42
/checkout?plan=42&trial=1
/checkout?plan=42&coupon=LAUNCH20
/checkout?plan=42&trial=1&coupon=LAUNCH20
```

| Parameter | Value |
|-----------|-------|
| `plan` | The plan price ID, shown in each plan's price list in the product editor |
| `trial` | `1` to start the price's trial. Ignored for a price without a trial, or for a customer who has already had a trial of this product |
| `coupon` | A coupon code to pre-apply. An invalid code shows a generic "This coupon code is not valid." message and is dropped |

In the product editor each price row has two copy buttons: **Copy buy link** and **Copy buy link with trial**. They copy the absolute URL, pinned to the site's default language. Add `&coupon=CODE` yourself if you want one pre-applied.

A link replaces whatever selection the visitor already had. A price whose plan, price or product is unpublished, or whose product access level the visitor cannot see, is refused.

## The `ld_cart` Cookie {#ld-cart-cookie}

| Property | Value |
|----------|-------|
| Name | `ld_cart` |
| Contents | Plan price ID, trial flag and coupon code. No personal data |
| Lifetime | 24 hours |
| Flags | `HttpOnly`, `SameSite=Lax`, `Secure` on HTTPS |
| Integrity | Signed with the site's secret. A tampered or unsigned cookie is deleted and ignored |

The cookie is only read when the session holds no selection, for example after the customer logged out or closed the browser. It is updated when a coupon is applied or removed, and deleted when the order completes or the chosen price is no longer available. It is strictly necessary for the purchase the visitor started, so it does not need a cookie-consent banner.

## Empty Checkout

When the checkout page has no selection (no session, no cookie, no `plan` parameter), it shows "No item selected. Please choose a product first." with a **Browse Products** link.

## Signing In on the Checkout Page

Guests see an **Already have an account? Sign in** panel above **Your Details**. It logs the customer in without leaving checkout, and the selection survives the login. A standard Joomla login page works as well.

- Failed attempts get one message for every cause: "Invalid email or password. Please try again."
- Attempts are limited to 10 per 10 minutes per IP and 5 per 15 minutes per email address.

There is no registration form. Guests get an account automatically after payment – see [Guest Checkout](/licensedock/checkout/guest-checkout).

## Your Details and Billing Address

**Name** and **Email** are always required. A signed-in customer's email is their Joomla account email and cannot be changed here. Their name can be edited per order.

The billing address block is configured in **Components → LicenseDock → Settings → Storefront → Checkout Fields**. Drag fields to reorder them, set each one to 100% or 50% width, and choose its state.

| Field | Default | States offered |
|-------|---------|----------------|
| Country | Required | Always required |
| Company | Optional | Hide, Optional, Required |
| Tax ID | Optional | Hide, Optional, Required |
| Street Address | Automatic | Automatic, Hide, Optional, Required |
| City | Automatic | Automatic, Hide, Optional, Required |
| State / Province | Automatic | Automatic only |
| Postal Code | Automatic | Automatic, Hide, Optional, Required |
| Phone | Optional | Hide, Optional, Required |

**Automatic** lets the buyer's country decide. Street, city and postcode become required where that country's address format requires them, and optional elsewhere. State / Province appears as a list of states, provinces or regions for the countries that have one (the US, Canada, India, Australia and others) and is hidden everywhere else. Its label follows the country, for example Province in Canada.

The **Tax ID** label also follows the country: VAT number in the EU and UK, GSTIN in India, ABN in Australia, GST/HST number in Canada, EIN in the US, and so on. While tax is switched on, a hidden Tax ID field is shown as optional so business buyers can still enter one.

**Reset to defaults** restores the order, widths and states shown above.

### Country Availability

Below the fields, **Country availability** limits where you sell:

| Option | Effect |
|--------|--------|
| All countries | Every country is offered |
| Only selected | Only the countries you pick |
| All except selected | Every country except the ones you pick |

A country outside the list is refused at checkout with "This country is not available."

Fields are validated in the browser and again on the server. If the server refuses a submission, the customer returns to checkout with "Please check the highlighted fields." and their entries kept.

The billing details are saved to the customer record and prefilled on their next order.

## Order Summary

The summary shows the product and plan, the billing cycle, any trial terms, and then:

| Line | When |
|------|------|
| Subtotal | When a discount applies |
| Renewal Discount | For a returning customer renewing a subscription (see [Renewing from the Account](#renewing-from-the-account)) |
| Discount | When a coupon applies. Has a remove button |
| Tax line | When tax is enabled. See [Tax](/licensedock/checkout/tax) |
| Total | Always |

Discounts never stack. When a customer qualifies for both a renewal discount and a coupon, the larger one applies, and the coupon shows "Not applied - your renewal discount is larger."

The coupon form sits below the summary as **Have a coupon code?**. It is hidden for trials and for free orders. See [Coupons](/licensedock/checkout/coupons).

## Consent Checkboxes

Terms, a cooling-off waiver, a marketing opt-in and your own checkboxes can appear above the pay button, with a privacy policy notice. They are set up under **Components → LicenseDock → Checkout Consent**. See [Checkout Consent](/licensedock/checkout/consent).

## Payment Methods

The payment block lists every enabled gateway. Its look is set in **Settings → Storefront → Checkout Style → Payment buttons**:

| Option | Display |
|--------|---------|
| Method list | A selectable list of methods with one **Proceed to payment** button (default) |
| Branded buttons | A colour-branded button per gateway |

The last method a customer picked is remembered in their browser. With no gateway enabled, checkout shows "No payment method is currently available."

See [Stripe](/licensedock/gateways/stripe), [PayPal](/licensedock/gateways/paypal) and [Mollie](/licensedock/gateways/mollie).

## Free Orders

A **one-time** price of 0 shows a **Get it Free** button. The order completes immediately with no gateway, and the customer goes straight to the thank-you page.

A **recurring** order that totals 0 today (a free trial, or a 100% coupon on a subscription) still goes through the gateway, so a payment method is on file for later renewals.

## Trials

A trial is started with **Start free trial** or **Start trial** on the plan card, or a `&trial=1` buy link. The summary shows the trial length, what is charged today (the trial price, or nothing for a free trial) and the regular price that follows.

- One trial per product per customer. A customer who has had a trial of the product (matched by account or email) sees "You have already used the trial for this product – showing the regular price." A guest's email is checked when they submit the form.
- Trials and coupons don't combine. Starting a trial drops any applied coupon, and the coupon form is hidden.
- Plan cards offer the trial button to guests and to signed-in customers with no subscription for the product.

## Existing Subscribers

A signed-in customer who already has a live subscription for the product (auto-renewing or in a trial) cannot open a second one. Opening checkout for any plan of that product sends them to their Subscriptions page with "You already have an active subscription for this product. Manage it from your account." Plan upgrades and downgrades are done from there.

Cancelled and expired subscriptions are not blocked: buying again counts as a renewal. A customer who owns a one-time plan sees **Owned** on that plan's card, and can still buy other plans of the product.

## Renewing from the Account

On the account Subscriptions page, a subscription that doesn't auto-renew – an expired or cancelled one, or a one-time purchase with an expiry date – shows **Renew**. The same button appears on the product page's plan cards. It takes the customer to checkout with their existing plan price selected, trial and coupon cleared.

- A recurring subscription that was cancelled but is still inside its paid period gets **Resume** instead, which turns auto-renewal back on with no payment.
- If that plan or price has been unpublished, they land on the product page's plans to pick a current one. If the whole product is unpublished they see "This product is no longer offered. Please contact us about alternatives."
- At checkout the product's renewal discount is applied and shown as **Renewal Discount**. It is worked out on the server from the subscription at that moment, so it cannot be carried over to a different product.
- The order is linked to the subscription it renews, and the thank-you page reads "Thank you for renewing!"

## Retrying a Payment

If the gateway fails or the customer cancels at the gateway, they return to checkout with their selection intact ("Your order has been cancelled." for a cancel). Paying again from the same session reuses the same order row, so retries don't pile up duplicate orders.

## Thank-You Page

The thank-you page is the checkout menu item with `layout=thankyou`, an `order_id` and a signed access token (`oat`):

- **Completed orders** show "Thank you for your order!" (or "Thank you for renewing!"), the order number and an order summary with discounts and tax.
- **Orders still waiting on the gateway** show "Your payment is being processed. You will receive a confirmation shortly."
- The page says where the receipt was emailed, then shows one call to action: activation instructions and **Resend the email** for a new guest account, **Sign in to your account** for a guest whose email already had an account, or **Go to Account** for a signed-in customer.

License keys and download links are delivered in the purchase confirmation email and in the customer's account.

The order owner can open the page while signed in. Anyone else needs the `oat` token from the gateway return URL, which is valid for 7 days. The page is sent with `Cache-Control: no-store` and `Referrer-Policy: no-referrer` so the token isn't cached or leaked to third-party assets.

## Abandoned Checkouts

A customer who reaches the gateway and never pays can get reminder emails with a link that restores their checkout. See [Abandoned Checkout Recovery](/licensedock/checkout/abandoned-checkout).

## Next Steps

- [Coupons](/licensedock/checkout/coupons) – discount codes
- [Guest Checkout](/licensedock/checkout/guest-checkout) – buying without an account
- [Tax](/licensedock/checkout/tax) – rates, EU VAT and reverse charge
- [Checkout Consent](/licensedock/checkout/consent) – terms, waivers and opt-ins
- [Abandoned Checkout Recovery](/licensedock/checkout/abandoned-checkout) – reminder emails
