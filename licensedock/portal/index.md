# Customer Portal

The customer portal is a self-service area where logged-in customers can view orders, manage subscriptions, download files, and copy license keys.

## Setup

Create a menu item:

1. **Menus → Add New Menu Item**
2. Type: **LicenseDock → Account** (or any other portal section as the landing point)
3. Save

The portal requires a logged-in Joomla user. Anonymous visitors are redirected to the standard Joomla login.

The sidebar navigation is enabled by default and can be configured (vertical or horizontal) in **Settings → Frontend Display**.

## Sections

The portal is split into seven views, each backed by its own controller and view:

| Section | What it shows | Customer can |
|---------|--------------|--------------|
| Account | Profile summary | Export GDPR data (JSON) |
| Billing | Saved billing details | Update company, address, tax ID, phone |
| Orders | Order history | View order details, download invoice PDF |
| Invoices | Per-order PDFs | Download invoice (re-rendered on request) |
| Subscriptions | Active and past subscriptions | Cancel auto-renewal, renew expired, change plan, cancel pending plan change |
| Licenses | License keys and activations | Copy key, deactivate an activation |
| Downloads | Latest version per purchased product | Download files |

## Account

The Account view shows the customer's profile and provides a **Export My Data** button. Clicking it returns a JSON dump of all LicenseDock data tied to the user (orders, subscriptions, licenses, activations, invoices, email log) for GDPR compliance.

Profile and password edits go through the standard Joomla user profile (`com_users`).

## Billing

Billing details captured at checkout are persisted on the customer record and editable here:

| Field | Notes |
|-------|-------|
| Company | – |
| Address, City, State, Postcode, Country | – |
| Tax ID | VAT, GST, EIN. Shown on invoices |
| Phone | E.164 format. Visibility controlled by store settings |

These details prefill at checkout next time and appear on every future invoice.

## Subscriptions

For each subscription the customer sees status, next renewal date, plan, and price. Available actions:

| Action | Behaviour |
|--------|-----------|
| Cancel auto-renewal | Subscription stays active until end of paid period, then expires. Reversible until expiry |
| Renew | Manual renewal of an expired subscription. Sends them through checkout for the next cycle |
| Change Plan | Pick a new plan + cycle. Customer chooses immediate (proration) or scheduled (next renewal) where the gateway supports both |
| Cancel pending plan change | Revert a scheduled change before it applies |

Plan change behaviour varies per gateway – see [Plan Changes](/licensedock/gateways/webhooks#plan-changes).

## Licenses

Each license shows status, expiry, activation count vs limit, and the list of current activations. Customers can:

- Copy the license key to clipboard
- Deactivate any of their activations to free a slot

Customers can't manually create activations from the portal – activations are created by the customer's own software via the [API](/licensedock/api/activate).

## Downloads

Lists the latest published version of every product the customer has bought, with download buttons. Downloads are streamed through LicenseDock so license validity is checked on every request.

## Orders & Invoices

Orders show the full purchase history – order number, date, product, plan, amount, status. Each completed order has a *Download Invoice* button.

Invoice PDFs are re-rendered on request, so changes to your store name, logo, or tax ID flow through to past invoices automatically.

## Auth & Access

| Aspect | Behaviour |
|--------|-----------|
| Login required | All sections redirect anonymous visitors to login |
| Ownership | Each view is filtered to the logged-in user. A customer can only see their own orders, licenses, and subscriptions |
| Invoice download | Returns 404 if the order doesn't belong to the requesting user |
| CSRF | All POST actions (cancel, change plan, billing save, deactivate) require a valid Joomla CSRF token |
