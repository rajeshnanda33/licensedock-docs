# Configuration

Store-wide settings live under **Components → LicenseDock → Settings**. The page has a **LicenseDock License** card at the top (see [Installation](/licensedock/getting-started/installation#activate-your-license)) and six tabs: Store, Downloads, Billing, Emails, Automation and Storefront.

Other configuration has its own screen in the LicenseDock menu:

| Screen | What it holds |
|--------|---------------|
| Email Templates | Subject and body of every email – see [Emails](/licensedock/emails/) |
| Payment Gateways | Stripe, PayPal and Mollie credentials – see [Stripe](/licensedock/gateways/stripe), [PayPal](/licensedock/gateways/paypal), [Mollie](/licensedock/gateways/mollie) |
| Taxes | Tax rates per country |
| Checkout Consent | Checkboxes shown at checkout and the privacy policy link |

The **Options** toolbar button holds Joomla permissions for the component.

## Store Tab

### Store

| Setting | Notes |
|---------|-------|
| Store Name | Shown in customer emails, and on payment gateway pages where the gateway allows it |
| Store URL | Used in email links. Falls back to the site URL |
| Store Email | Falls back to **Emails → Reply-To Email** when empty |
| Store Address | Shown on invoices and at the foot of emails |
| Logo | PNG, JPG, SVG or WebP. Used in emails and on invoices |

These are available in email templates as `{store_name}`, `{store_url}`, `{store_email}` and `{logo_url}`.

### Currency & Date Format

| Setting | Default | Notes |
|---------|---------|-------|
| Currency | `USD` | Store-wide. Every price uses it |
| Date Format | `d M Y` | Six formats, including `Y-m-d` |
| Time Format | 12-hour | 12-hour or 24-hour |

Orders and transactions keep their own currency, so historical orders display correctly after a currency change. When the store holds data in more than one currency, the [Dashboard](/licensedock/admin/dashboard) shows a switch to report in each one.

### Editor

| Setting | Default | Notes |
|---------|---------|-------|
| Editor | CodeMirror | Editor used for the product description fields. **Site default** uses the Joomla global editor |

## Downloads Tab

### Downloads

| Setting | Notes |
|---------|-------|
| Download Path | Folder for product files and invoice PDFs. Leave empty to use the protected default shown as the placeholder. A path outside the site root is safest |

Below the field, badges show whether the folder exists and is writable, and whether files in it can be fetched directly over the web. **Check now** runs that test again. Inside the folder, `_shared` holds files shared across products, `_uploads` takes files uploaded by SFTP, and each product gets a folder named after its ID.

If older files are still stored inside the web root, a **Secure my files now** button moves them to a protected location.

### Digital Delivery

| Setting | Default | Notes |
|---------|---------|-------|
| Delivery Method | Email + Account | **Email + Account** – download links in the receipt email (valid for 3 days) and on the account page. **Account Only** – links on the account page only; buyers must sign in |

See [Downloads](/licensedock/products/downloads) for versions and files.

## Billing Tab

### Tax

| Setting | Default | Notes |
|---------|---------|-------|
| Enable tax | No | Master switch. While off, no tax is charged or shown anywhere |
| Tax mode | Rate table only | **Rate table only** charges exactly the rates you list under Taxes. **EU VAT rules** adds intra-EU reverse charge for buyers with a VAT number verified against VIES, and unlocks the cross-border option below |
| Cross-border EU sales | One-Stop Shop | EU VAT rules only. **One-Stop Shop** charges the buyer's country rate; **Under €10,000** charges your own country rate to consumers in other EU countries |
| Product prices are | Tax-exclusive | **Tax-exclusive** adds tax on top of the price. **Tax-inclusive** means the price already contains it |
| Tax label | Automatic | What tax is called on product pages, checkout, the payment page and invoices: Automatic, VAT, GST, Sales Tax or Tax. Automatic resolves from your own tax number |
| Tax note on product page | Automatic | A short line under prices. Automatic or Hidden |

A country with no row under **Taxes** is not taxed. For reverse charge to apply, your own EU VAT number must be entered as the **Tax ID** below.

### Invoice Settings

| Setting | Notes |
|---------|-------|
| Company Name | Legal name on invoices. Leave blank to use the Store Name |
| Tax ID | Your VAT, GST or other tax number, printed on invoices |
| Invoice Footer | Leave blank for the built-in footer, translated per invoice language. Your own text prints as written |

**Preview sample** renders a sample invoice PDF from the saved settings. Invoices also show the Store Name, Email and Address from the Store tab. See [Invoices](/licensedock/invoices/).

### Number Prefixes

| Setting | Default | Notes |
|---------|---------|-------|
| Order Prefix | `ORD` | Order numbers are random – e.g. `ORD-B45E8258` |
| Invoice Prefix | `INV` | Invoice numbers are sequential – e.g. `INV-0001` |

Set these during initial setup and leave them alone once orders arrive, so your numbering stays consistent.

## Emails Tab

### Email Settings

| Setting | Default | Notes |
|---------|---------|-------|
| Mail Handler | Joomla Mail Settings | **Joomla Mail Settings** uses the Global Configuration mailer. **Custom SMTP** uses the fields below |
| SMTP Host | – | Custom SMTP only |
| Port | `587` | Custom SMTP only |
| Encryption | TLS | None, TLS or SSL |
| Username / Password | – | The password is encrypted at rest. Once saved, the field stays empty; enter a new value only to replace it |
| From Name / From Email | – | Sender identity for every outgoing email. Falls back to the Joomla mail settings when empty |
| Reply-To Name / Reply-To Email | – | Optional reply-to header. Falls back to the Joomla mail settings when empty |
| Test Email | – | Sends a test message to the address in **Send To** |

### Admin Notifications

| Setting | Notes |
|---------|-------|
| Admin Emails | One address per line. Receives store activity and system alerts. Falls back to the From Email when empty |

### Email Signature

HTML inserted wherever a template contains `{signature}`. Every customer template ships with it. A **Customized** badge appears once you edit it, and **Reset** restores the default.

### Email Footer

| Setting | Notes |
|---------|-------|
| Footer address | Shown at the bottom of every email. Leave blank to use the Store Address |

## Automation Tab

### Reminder Emails

Leave any days field blank to switch that email off. Auto-renewing subscriptions get no pre-expiry reminders, because the gateway charges them automatically.

| Setting | Default | Email |
|---------|---------|-------|
| Before expiry – First | 30 days before | `renewal_reminder_1` |
| Before expiry – Second | 14 days before | `renewal_reminder_2` |
| Before expiry – Final | 3 days before | `renewal_reminder_3` |
| Expiry day – Send notice | Yes | `expiration_notice` |
| After expiry (grace period) – First | 7 | `grace_period_reminder_1` |
| After expiry (grace period) – Final | 3 | `grace_period_reminder_2` |
| After trial cancellation – Winback | 7 days after | `trial_cancellation_reminder` |

Grace reminders are sent inside the product's **Grace Period (days)** window, and each value is the number of days left in that window when the email goes out. A grace reminder is skipped when its value is not smaller than the product's grace period, and it is only sent when the product's renewal discount is higher than its lapsed discount.

### Subscription Dunning

| Setting | Default | Notes |
|---------|---------|-------|
| Dunning grace period | `14` days | After this many days of failed renewal payments the subscription is cancelled and the license expires. `0` never auto-cancels |

Stripe, PayPal and Mollie keep retrying the charge during this window.

### Abandoned Checkout Recovery

| Setting | Default | Notes |
|---------|---------|-------|
| Enabled | Yes | Email customers who started checkout but did not pay |
| Intervals (hours) | `1,24,72` | When to send each reminder, in hours after checkout. Comma-separated |
| Max Attempts | `3` | Stop after this many emails |

Reminders stop once the customer pays.

### Scheduled Tasks and Cron Job

These two cards list the three LicenseDock tasks and the cron commands for your server. See [Scheduled Tasks](/licensedock/admin/scheduled-tasks).

## Storefront Tab

### Checkout Fields

Drag the billing fields into order, set each one to full or half width, and choose whether it is required. Name and email are always required. Country is always required, because it decides the tax rate, the address format and what each gateway is sent. Some fields are locked by your tax settings and the buyer's country. **Reset to defaults** restores the shipped order.

### Country Availability

| Setting | Notes |
|---------|-------|
| Country availability | **All countries**, **Only selected** or **All except selected** |
| Countries | The list the mode above applies to |

The card links to the **Checkout Consent** screen.

### Checkout Style

| Setting | Default | Notes |
|---------|---------|-------|
| Payment buttons | Method list | **Method list** shows a list of methods with one order button. **Branded buttons** shows a colour-branded button per gateway |

### Account Navigation

| Setting | Default | Notes |
|---------|---------|-------|
| Account Navigation | Show | Navigation menu on customer account pages |
| Navigation Layout | Vertical | **Vertical** shows a sidebar on the left; **Horizontal** shows a tab bar above the content |

### Pricing Display

| Setting | Default | Notes |
|---------|---------|-------|
| Starting price | Show | Shows the lowest plan price at the top of each product page |
| Show price as | Actual price | **Actual price** shows the cheapest price in its own cycle (e.g. €99/yr). **Monthly equivalent** shows it as a monthly rate (e.g. €8.25/mo, billed annually) |

## Encryption

Gateway secret keys, the SMTP password and your LicenseDock license key are encrypted at rest with authenticated AES-256-GCM. Admin forms never show a saved secret – an empty field keeps the stored value.

## Next Steps

- [Quick Start](/licensedock/getting-started/quick-start) – create your first product
- [Scheduled Tasks](/licensedock/admin/scheduled-tasks) – make sure emails and reminders run
