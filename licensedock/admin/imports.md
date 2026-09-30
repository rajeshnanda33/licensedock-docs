# Imports

**Components → LicenseDock → Import** brings customers, orders, subscriptions and licenses into LicenseDock from a spreadsheet – typically when moving a store from another platform.

Products are not imported. Create your products and plans first; imported rows are matched to them by alias.

## Import Order

The screen has one tab per entity. Work through them in this order, because each step looks up records created by the one before:

| Step | Needs |
|------|-------|
| 1. Customers | – |
| 2. Orders | Customers and products |
| 3. Subscriptions | Customers and orders |
| 4. Licenses | Customers and products. Import subscriptions first so each license links to its subscription |

The screen shows how many customers, products, orders, subscriptions and licenses the store already holds, and warns when a prerequisite is missing.

## Files

| Rule | Value |
|------|-------|
| Formats | CSV (UTF-8 recommended) or Excel `.xlsx` (first sheet only) |
| Maximum size | 5 MB |
| Maximum rows | 5,000 per file |

CSV files saved by Excel in Windows-1252 or UTF-16 are converted to UTF-8 automatically. Dates are read in any format PHP's `strtotime()` understands, such as `2025-06-15`. Amounts accept a comma or a point as the decimal separator (`99,00` or `99.00`, `1.234,56` or `1,234.56`).

**Download Template** gives a CSV with the column headers and one sample row for the current tab.

## Columns

Column names are case-insensitive, and spaces are treated as underscores.

### Customers

| Required | Optional |
|----------|----------|
| `email`, `name` | `company`, `address`, `city`, `state`, `postcode`, `country`, `tax_id`, `phone`, `created` |

### Orders

| Required | Optional |
|----------|----------|
| `order_number`, `customer_email`, `status`, `currency`, `total`, `product_alias`, `plan_alias`, `billing_cycle`, `item_price`, `item_total` | `invoice_number`, `payment_method`, `subtotal`, `discount_amount`, `refunded_amount`, `notes`, `created` |

One row per order line. Rows that share an `order_number` form one order, and their order-level columns (customer, status, currency, totals, payment method, invoice number, date) must match.

`status` is one of `pending`, `completed`, `failed`, `refunded`, `partially_refunded`, `disputed`, `cancelled`. `billing_cycle` is one of `monthly`, `quarterly`, `semi_annual`, `annual`, `one_time`.

### Subscriptions

| Required | Optional |
|----------|----------|
| `customer_email`, `product_alias`, `plan_alias`, `billing_cycle`, `order_number`, `status`, `starts_at` | `expires_at`, `is_recurring`, `cancelled_at`, `trial_start_at`, `trial_end_at`, `gateway_subscription_id`, `gateway_customer_id`, `next_payment_at`, `last_payment_at` |

`status` is one of `active`, `trialing`, `expired`, `cancelled`, `suspended`, `pending`, `past_due`. A `cancelled` row needs `cancelled_at`.

`gateway_subscription_id` and `gateway_customer_id` reconnect a subscription to its record at Stripe, PayPal or Mollie. A subscription without `next_payment_at` is never picked up for renewal.

### Licenses

| Required | Optional |
|----------|----------|
| `license_key`, `customer_email`, `product_alias`, `status` | `order_number`, `activation_type`, `activation_limit`, `activation_count`, `expires_at`, `created` |

`status` is one of `active`, `expired`, `revoked`, `suspended`, `cancelled`. `activation_type` is one of `domain`, `device`, `seat`, `instance`. Existing license keys are kept as they are, so software already in the field keeps working.

### Alternative Column Names

Common header names from other platforms' exports are recognised when the standard name is not present:

| Standard column | Also accepted |
|-----------------|---------------|
| `email` | `e-mail`, `email_address` |
| `customer_email` | `email`, `buyer_email`, `email_address` |
| `name` | `customer_name`, `full_name`, `buyer_name` |
| `order_number` | `order_id`, `order_no`, `order_#`, `transaction_id` |
| `invoice_number` | `invoice_id`, `invoice_#`, `invoice_no` |
| `product_alias` | `product`, `product_slug`, `product_sku`, `sku` |
| `plan_alias` | `plan`, `plan_slug`, `plan_sku` |
| `billing_cycle` | `cycle`, `interval`, `period`, `frequency` |
| `total` | `amount`, `order_total`, `grand_total`, `total_amount` |
| `currency` | `currency_code` |
| `status` | `order_status`, `payment_status`, `license_status`, `subscription_status` |
| `payment_method` | `gateway`, `payment_gateway`, `payment_processor` |
| `item_price` | `unit_price`, `line_price`, `price` |
| `item_total` | `line_total`, `line_amount` |
| `license_key` | `key`, `license`, `serial`, `serial_number`, `license_code` |
| `activation_limit` | `max_activations`, `activations`, `seats`, `seat_count` |
| `expires_at` | `expires`, `expiry`, `expiry_date`, `end_date`, `valid_until`, `expiration_date` |
| `starts_at` | `start_date`, `started_at`, `begin_date`, `subscription_start` |
| `cancelled_at` | `canceled_at`, `cancel_date`, `cancellation_date` |
| `created` | `created_at`, `order_date`, `purchase_date`, `date` |

These columns only accept LicenseDock's own codes:

| Column | Codes |
|--------|-------|
| Order `status` | `pending`, `completed`, `failed`, `refunded`, `partially_refunded`, `disputed`, `cancelled` |
| License `status` | `active`, `expired`, `revoked`, `suspended`, `cancelled` |
| Subscription `status` | `active`, `trialing`, `expired`, `cancelled`, `suspended`, `pending`, `past_due` |
| `billing_cycle` | `monthly`, `quarterly`, `semi_annual`, `annual`, `one_time` |
| `activation_type` | `domain`, `device`, `seat`, `instance` |

## Customer Options

The Customers tab has extra options:

| Option | Notes |
|--------|-------|
| Import mode | **Create or update** (default) adds new emails and updates existing ones. **Create only** skips existing emails. **Update only** updates existing emails and rejects new ones |
| Create Joomla user accounts for unknown emails | Creates a Joomla user for each new customer |
| Send "set your password" email to new customers | Queues the `account_activation` email for each new user. The screen shows how many days the link stays valid |

Other entities are create-only: a row that already exists is marked as a duplicate and skipped. Orders are matched by `order_number`, licenses by `license_key`, and subscriptions by customer, product, plan and order together.

## Preview and Import

1. Choose the file and click **Upload & Preview**
2. The preview counts rows as valid, to update, duplicate (skip) or errors, and lists every error row plus the first 100 others. **Download error rows** saves the failing rows as a file to fix and re-upload
3. Click **Import** to write the valid rows

Orders are written one at a time, so a problem with one order does not roll back the others. The result screen shows how many rows were created, updated, skipped and failed.

## What Gets Created

- **Completed, refunded and partially refunded orders** get a purchase invoice. The `invoice_number` from the file is kept; an order without one is given the next number in your series. The invoice is dated to the order. Refunded orders also get a credit note. See [Invoices](/licensedock/invoices/)
- Imported orders count on the [Dashboard](/licensedock/admin/dashboard) straight away, in the period of their original date

## Missing Licenses

When completed orders for products that require a license have no license – for example after importing orders but no licenses – the Import and Licenses screens show a **Generate N Missing Licenses** toolbar button. It creates the missing keys after a confirmation.

## Import History

The bottom of the Import screen lists the 10 most recent imports with the date, user, entity, mode, file name and the created, updated, skipped and failed counts.
