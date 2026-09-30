# Invoices

LicenseDock issues a PDF invoice for every payment it takes and a credit note for every refund. Each document is numbered in sequence and frozen when it is issued.

## Documents

| Document | Issued when | Type shown on the PDF |
|----------|-------------|-----------------------|
| Invoice | An order is paid | New purchase |
| Invoice | A subscription renews | Renewal |
| Invoice | A plan change is charged | Plan change |
| Credit note | A full or partial refund is processed | – |

A credit note points at the invoice it credits. What an invoice has been credited is the sum of its credit notes.

A lost chargeback does not create a credit note. The reversed payment is taken off the invoice it was made against, so the invoice reads as unpaid by that amount.

## Numbering

| Number | Assigned | Format |
|--------|----------|--------|
| Order number | At checkout, before payment | Random hex – e.g. `ORD-B45E8258` |
| Invoice number | When the payment succeeds | Sequential – e.g. `INV-0001`, `INV-0002` |
| Credit note number | When the refund is processed | Sequential – e.g. `CN-0001` |

Order numbers are random so a customer cannot guess other orders from theirs. The invoice prefix and order prefix are set under **Settings → Billing → Number Prefixes**. Credit notes always use `CN`.

Invoices and credit notes have separate counters. Each number is taken inside the same database transaction that records the payment or refund, with the counter row locked, so two webhooks arriving together cannot take the same number. If that transaction rolls back, the number is not used.

Test-mode payments draw from their own counters with a `TEST-` prefix, e.g. `TEST-INV-0001`, so test purchases never use up numbers in your live series.

## What an Invoice Shows

- Title (**INVOICE** or **Credit note**) and your store logo
- Seller: company name, address, email and tax ID
- Bill to: name, company, address, region, country, email and the buyer's tax ID
- Invoice or credit note number, order number, type, date, payment gateway and status
- One line per item: product, plan, trial length where there is one, and the service period for subscriptions
- Subtotal, discount (when a coupon was used), tax and total
- Footer

Amounts are shown in the order's own currency. On a credit note they are shown as negative.

The tax line follows the order's tax treatment:

| Treatment | On the invoice |
|-----------|----------------|
| Taxed, prices exclusive | A tax row with the rate, e.g. `VAT (20%)`, added before the total |
| Taxed, prices inclusive | An `incl. VAT` line under the total showing the tax it contains |
| Exempt | A tax row that says the supply is exempt, with no amount |
| EU reverse charge | A reverse-charge row with no amount, plus the required reverse-charge statement |
| Not taxed | No tax row |

The name of the tax (VAT, GST, Sales Tax or Tax) comes from **Settings → Billing → Tax label**. Tax IDs are labelled the way the country names them, for example a VAT number in the EU.

## Invoices Are Frozen When Issued

Everything printed on an invoice is fixed at the moment it is issued: your company details and footer, the buyer's billing details, the labels, the date format and the language. Changing your store address or tax ID later leaves past invoices as they were.

The one exception is the logo. The PDF always uses the current store logo.

Invoices are written in the language the buyer checked out in. A blank **Invoice Footer** prints the built-in footer in that language; credit notes print no default footer, only one you have set yourself.

## Settings

Invoice details are on the **Billing** tab of **Components → LicenseDock → Settings**:

| Setting | Notes |
|---------|-------|
| Company Name | Legal name on invoices. Falls back to the Store Name |
| Tax ID | Your tax number |
| Invoice Footer | Blank uses the built-in footer |
| Order Prefix / Invoice Prefix | Default `ORD` / `INV` |

Store Address, Store Email and Logo come from the **Store** tab. **Preview sample** renders a sample PDF from the saved settings.

## Where Invoices Are Available

- **Receipt emails** – the purchase invoice is attached to `purchase_confirmation`, the renewal invoice to `renewal_receipt`, and the credit note to `refund_confirmation` or `partial_refund_confirmation`
- **Customer account** – the **Account: Invoices** menu item lists the customer's invoices and credit notes with a PDF download for each. See [Customer Portal](/licensedock/portal/)
- **Admin** – **Components → LicenseDock → Invoices**

A customer must be signed in to download an invoice, and can only download their own. Any other request is refused.

PDFs are stored in the download folder set under **Settings → Downloads**, which should not be reachable over the web.

## The Invoices Screen

**Components → LicenseDock → Invoices** lists every invoice and credit note with its number, type, customer, amount, status and a PDF download.

| Filter | Options |
|--------|---------|
| Type | Invoice, Credit note |
| Status | Draft, Open, Paid, Void, Uncollectible |
| Mode | Live (default), Test, All |

**Export** downloads the current filtered list as CSV.

### Import History

Orders completed before a store had invoices, or orders migrated in directly, have no invoice. While any exist, the toolbar shows **Import history (n)**. Each click processes a batch and creates the missing invoices – plus credit notes for their refunds – dated to the original order. The button disappears when nothing is left.

An order that already carries an invoice number keeps it. An order with none gets an invoice with no number, so old sales are counted on the dashboard without being threaded into your live numbering. Customers do not see these unnumbered invoices in their account.

Store Health reports how many orders are still waiting for this under **Orders → Historical orders imported into Invoices**.

## Revenue Reporting

The [Dashboard](/licensedock/admin/dashboard) reads revenue from paid invoices, less tax, by invoice date. Renewals and plan-change charges count in the period they were paid, and refunds are shown separately.
