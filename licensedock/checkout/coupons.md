# Coupons

Discount codes for launches, promotions and retention offers.

## Creating a Coupon

Go to **Components → LicenseDock → Coupons → New**.

| Field | Notes |
|-------|-------|
| Code | What the customer types, e.g. `LAUNCH20`. **Generate** fills in a random code. Codes must be unique and are matched without regard to case |
| Description | Internal note. Not shown to customers |
| Discount Type | **Percentage** or **Fixed Amount** |
| Discount Value | The percentage (up to 100) or the amount in the store currency |
| Purchase Type | **Both**, **One-time purchase** or **Subscription** |
| Products | **All Products** or **Specific Products**, then pick the products |
| Status | Published, Unpublished, Archived, Trashed. Only published coupons are accepted |
| Minimum Order Amount | The plan price must be at least this much. `0` = no minimum |
| New Customers Only | Only customers with no completed order can use it |
| Max Uses | Total redemptions across all customers. `0` = unlimited |
| Max Uses Per User | Redemptions per customer. Defaults to `1`. `0` = unlimited |
| Times Used | Read-only count of completed redemptions |
| Valid From / Valid To | Optional date range. Empty = no limit |

Restrictions work per product. There is no per-plan restriction: a coupon limited to a product works on every plan of it, subject to **Purchase Type**.

## How Customers Apply a Coupon

- **At checkout** – the **Have a coupon code?** panel below the order summary. The customer enters the code and clicks **Apply Coupon**. On success they see "Coupon applied successfully." and a **Discount** line appears. The **Remove** button next to it takes it off again.
- **In a buy link** – append `&coupon=CODE` to a checkout link:

  ```
  /checkout?plan=42&coupon=LAUNCH20
  ```

  An invalid code in a link shows only "This coupon code is not valid." and is dropped. The specific reason is shown when the code is typed into the checkout form.

The coupon form is hidden for trials and for free orders.

## First Charge Only

A coupon discounts the initial order. On a subscription, renewals bill at the plan's normal price (or its renewal price, if the product has a renewal discount). The same applies on every gateway.

For a recurring discount on renewals, use the product's **Renewal Discount (%)** setting (see [Products](/licensedock/products/)).

## Coupons and Other Discounts

- **Renewal discount** – discounts never stack. When a customer renewing a subscription also applies a coupon, the larger discount wins. If the renewal discount is larger, the coupon line reads "Not applied - your renewal discount is larger."
- **Trials** – a coupon can't be used with a trial. Starting a trial removes any applied coupon, and a coupon that discounted nothing is not counted as used.

## Usage Counting

- **Times Used** and the per-customer count go up only when an order is paid. Entering a code counts for nothing.
- Per-customer limits and **New Customers Only** identify a customer by their account, or by billing email for a guest. Checking out logged-out with the same email doesn't reset the limit.
- The per-customer limit is enforced again when the order completes, so several simultaneous checkouts by one buyer can't exceed it.
- Refunds don't give a use back.
- Test orders and live orders are counted separately: while you test with test-mode gateways, only test orders count, and once a live gateway is on, only live orders count.

Coupon attempts at checkout are limited to 10 per 10 minutes per IP address.

## Messages Customers See

| Message | Cause |
|---------|-------|
| This coupon code is not valid. | No published coupon has this code |
| This coupon has reached its usage limit. | **Max Uses** reached |
| You've already used this coupon. | **Max Uses Per User** reached |
| This coupon is not valid yet. | Before **Valid From** |
| This coupon has expired. | **Valid To** has passed |
| This coupon requires a minimum order of %s. | Price below **Minimum Order Amount** |
| Enter your email above or sign in to apply this coupon. | **New Customers Only** coupon, and a guest hasn't entered an email yet |
| This coupon is only valid for new customers. | **New Customers Only**, and the customer has a completed order |
| This coupon does not apply to this plan. | **Purchase Type** doesn't match the plan's billing |
| This coupon is not valid for this product. | Product not in the coupon's list |
| Too many coupon attempts. Please wait a few minutes before trying again. | Rate limit hit |
