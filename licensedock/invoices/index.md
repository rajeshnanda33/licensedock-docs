# Invoices

LicenseDock generates a PDF invoice for every completed order. Numbering is sequential with no gaps.

## Order Number vs Invoice Number

| Number | When it's assigned | Format |
|--------|---------------------|--------|
| Order Number | At checkout, before payment | Random hex – e.g. `ORD-B45E8258` |
| Invoice Number | After successful payment | Sequential – e.g. `INV-0001`, `INV-0002` |

Order numbers are random so a customer can't guess other order URLs from theirs. Invoice numbers are sequential because tax authorities want it that way.

## Sequential Numbering

Invoice numbers are assigned only when a payment succeeds, inside the same transaction that marks the order completed. The counter (`invoice_next_number` setting) is incremented atomically with `SELECT ... FOR UPDATE`, so concurrent webhooks can't double-issue or skip a number.

If the transaction rolls back, the order returns to `pending` and the invoice number is cleared – no gaps in the sequence.

## Settings

Configure invoice details under **Components → LicenseDock → Settings**:

| Setting | Notes |
|---------|-------|
| Invoice Prefix | Prefix for invoice numbers (default `INV`) |
| Order Prefix | Prefix for order numbers (default `ORD`) |
| Company Name | Falls back to Store Name |
| Address | Free-text business address |
| Tax ID | VAT, GST, EIN. Shown on every invoice |
| Invoice Footer | Free-text footer line |
| Store Logo | Used on the invoice header |

## Where Customers Get Invoices

- **Customer portal** – Orders section has a *Download Invoice* button on every completed order
- **Receipt email** – `purchase_confirmation` email links to the invoice
- **Admin** – order detail view in admin

PDFs are re-rendered on every request – so when you update your store name, logo, or tax ID, past invoices reflect the change.

## Invoice Content

Each invoice includes:

- Invoice number and date
- Store/seller name, address, tax ID
- Customer name, billing address, customer tax ID (if supplied)
- Product and plan
- Subtotal, discount (when a coupon was applied), total
- Currency (the order's own currency, not necessarily the current store currency)
- Payment method and gateway transaction ID

## Authentication

The customer-facing invoice download checks ownership – a customer can only access invoices for orders linked to their user ID. Anything else returns 404.
