# Coupons

Create discount codes for promotions, launches, or customer retention.

## Creating a Coupon

1. Go to **Components → LicenseDock → Coupons**
2. Click **New**
3. Configure the coupon:

| Field | Description |
|-------|-------------|
| **Code** | The coupon code customers enter (e.g., `LAUNCH20`) |
| **Discount Type** | Percentage or fixed amount |
| **Discount Value** | The discount amount (e.g., 20 for 20%) |
| **Max Uses** | Total number of times the coupon can be used (0 = unlimited) |
| **New Customers Only** | Restrict to customers with zero completed orders |
| **Valid From / Valid To** | Optional date range for the coupon |

## Discount Duration (Subscriptions)

For recurring subscriptions, you can control how many payments the discount applies to:

| Duration | Behavior |
|----------|----------|
| **Once** | Discount applies to the first payment only |
| **Repeating** | Discount applies for a set number of payments |
| **Forever** | Discount applies to every payment |

## How Customers Apply Coupons

The coupon form is on the checkout page. Customers enter their code and click **Apply** before completing payment.

## Usage Tracking

Coupon usage is counted only after successful payment – not when the code is entered at checkout. Per-customer checks count only completed orders.
