# Configuration

All settings live under **Components → LicenseDock → Settings**.

## Store & Currency

| Setting | Default | Notes |
|---------|---------|-------|
| Store Name | – | Shown in emails and on invoices |
| Store URL | – | Used in email links |
| Store Logo | – | PNG, JPG, SVG, or WebP. Used on invoices and in emails |
| Currency | `USD` | Store-wide. Applies to all prices |
| Date Format | `d M Y` | Six options including ISO |
| Time Format | `12` | 12 (AM/PM) or 24 hour |

Currency is store-level – every price uses the same currency. Orders and transactions keep their own currency column so historical orders display correctly even if you change the store currency later.

## Order & Invoice Numbers

| Setting | Default | Notes |
|---------|---------|-------|
| Order Prefix | `ORD` | Order numbers are random – e.g. `ORD-B45E8258` |
| Invoice Prefix | `INV` | Invoice numbers are sequential – e.g. `INV-0001` |

Order numbers are generated when the customer reaches the payment step. Invoice numbers are generated only after successful payment, atomically – there will be no gaps.

## Invoice Details

| Setting | Notes |
|---------|-------|
| Company Name | Shown on invoices. Falls back to Store Name if empty |
| Address | Free-text business address |
| Tax ID | VAT, GST, EIN, etc. Shown on invoices |
| Invoice Footer | Free-text footer line |

## Downloads

| Setting | Default | Notes |
|---------|---------|-------|
| Download Path | `licensedock/downloads` | Relative to site root. Uploaded files live here |

## Email

LicenseDock can send through Joomla's mailer or its own SMTP credentials.

| Setting | Notes |
|---------|-------|
| Mode | `joomla` (use Global Configuration) or `custom` (LicenseDock SMTP) |
| Host, Port, Encryption, Username, Password | Custom SMTP settings (when Mode is `custom`) |
| From Name / From Email | Sender identity |
| Reply-To Name / Reply-To | Optional reply-to header |
| Email Signature | HTML appended to every email body |
| Test Email | Send a test message to verify SMTP works |

The SMTP password is encrypted at rest. The form shows `••••••••` as a placeholder once a password has been saved – leave the field empty to keep the existing value.

## Subscription Dunning

| Setting | Default | Notes |
|---------|---------|-------|
| Grace Days | `14` | Days a subscription stays active after a failed renewal before auto-cancellation. `0` disables auto-cancel |

## Abandoned Checkout Recovery

| Setting | Default | Notes |
|---------|---------|-------|
| Enabled | Yes | Send recovery emails when a checkout is abandoned |
| Intervals | `1,24,72` | Hours after abandonment to send each email |
| Max Attempts | `3` | Stop after this many emails |

## Plan Change Billing

| Setting | Default | Notes |
|---------|---------|-------|
| Proration Mode | `prorate` | `prorate` (default), `partial_prorate`, or `full_cycle`. Controls how mid-cycle plan changes are billed |

## Frontend Display

| Setting | Default | Notes |
|---------|---------|-------|
| Phone Field on Checkout | `hidden` | `hidden`, `optional`, or `required` |
| Download Delivery | `email_and_account` | Where download links appear after purchase |
| Account Sidebar | Show | Show or hide the navigation menu in the customer portal |
| Sidebar Layout | `vertical` | `vertical` or `horizontal` |

## Email Templates

LicenseDock ships with default templates for every customer- and admin-facing email. Edit subject and body, preview rendered output, or reset to default from the **Email Templates** section of Settings. See [Email Templates](/licensedock/emails/) for the full list.

## Payment Gateways

Gateway credentials live on a separate page – see the dedicated guides:

- [Stripe](/licensedock/gateways/stripe)
- [PayPal](/licensedock/gateways/paypal)
- [Mollie](/licensedock/gateways/mollie)

API keys and gateway secrets are encrypted at rest using AES-256-CBC.

## Next Steps

- [Quick Start](/licensedock/getting-started/quick-start) – create your first product
