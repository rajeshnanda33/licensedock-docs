# Coupons

Discount codes for promotions, launches, and customer retention.

## Creating a Coupon

Go to **Components → LicenseDock → Coupons → New**.

| Field | Notes |
|-------|-------|
| Code | What the customer types in (e.g. `LAUNCH20`). Case-sensitive |
| Description | Internal note. Not shown to customers |
| Discount Type | `percentage` or `fixed` |
| Discount Value | The percent (0–100) or fixed amount |
| Applies To | `all`, `one_time`, or `recurring` – restrict by billing type |
| Products | Empty = all products. Otherwise restrict to specific products |
| Min Order Amount | Subtotal must be at least this much |
| New Customers Only | Reject if the customer already has a completed order |
| Max Uses | Total uses across all customers. `0` = unlimited |
| Max Uses per User | Per-customer cap, counting completed orders only |
| Valid From / Valid To | Optional date range |
| Status | Published, Unpublished |

## How Customers Apply Coupons

The coupon form sits on the checkout page. The customer enters their code, clicks **Apply**, and the discount appears on the order summary.

## Initial Order Only

Coupons apply once – to the initial order. They never recur on subscription renewals. If you want to give returning customers a deal, use the per-product **Renewal Discount** field on the product instead (see [Products](/licensedock/products/)).

## Trial vs Coupon

A coupon can't be combined with a trial. If a customer has a trial selected and applies a coupon, the trial flag is cleared.

## Usage Tracking

Coupon usage is counted only after successful payment, not when the code is entered. Per-customer checks count only `completed` orders.

## Validation Reasons

If a coupon is rejected, the customer sees one of these messages:

| Reason | Cause |
|--------|-------|
| Invalid code | No published coupon matches |
| Maximum uses reached | `times_used ≥ max_uses` |
| You've already used this coupon | Per-user limit hit |
| Not yet valid | Current time is before `valid_from` |
| Expired | Current time is after `valid_to` |
| Minimum order amount not met | Subtotal below `min_order_amount` |
| For new customers only | Customer has prior completed orders |
| Not valid for this billing type | `applies_to` restricts to one-time or recurring |
| Not valid for this product | `product_ids` doesn't include the chosen product |
