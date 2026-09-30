# Customer Portal

The customer portal is the signed-in area where customers manage subscriptions, download files, copy license keys, download invoices and keep their billing details up to date.

## Setup

Each portal page is its own menu item type. Create the ones you want under **Menus → [your menu] → Add New Menu Item → LicenseDock**:

| Menu item type | Page |
|----------------|------|
| **Account** | Dashboard with summary cards and the data export |
| **Account: Subscriptions** | Subscriptions and renewals |
| **Account: Downloads** | Files for purchased products |
| **Account: Licenses** | License keys and activations |
| **Account: Invoices** | Invoices and credit notes with PDF download |
| **Account: Details** | Name and billing address |
| **Activate Account (optional)** | Password setup page for accounts created at checkout. Put it in a hidden menu for a clean URL such as `/activate` |
| **Download (optional)** | Target for emailed download links. Put it in a hidden menu for a clean URL such as `/download/3` |

A common setup is one **Account** item in your user menu, with the other account pages in a hidden menu so they get clean URLs. The **Page Display** and **Metadata** tabs of each menu item (browser page title, page heading, meta description, robots) apply to the page.

::: info
**Order History** was replaced by **Account: Invoices** in 1.9.0. An old Order History menu item still opens the Invoices page. Switch it to **Account: Invoices** when convenient.
:::

## Access

| Aspect | Behaviour |
|--------|-----------|
| Sign-in | Every account page requires a signed-in Joomla user. Guests are sent to the Joomla login page with a "Please log in to access your account." message and returned afterwards |
| Ownership | Every page and action is limited to the signed-in user's own records |
| Forms | Every action (cancel, resume, renew, change plan, save details, export) requires a valid Joomla form token |

## Navigation

Account pages share a navigation menu with **Dashboard**, **Subscriptions**, **Downloads**, **Licenses**, **Invoices** and **Account Details**. Configure it in **Settings → Storefront → Account Navigation**:

| Setting | Options |
|---------|---------|
| Account Navigation | Show (default), Hide |
| Navigation Layout | Vertical (sidebar on the left, default), Horizontal (tab bar above the content) |

**Licenses** only appears when at least one of your products has **Requires License** set to Yes.

## Dashboard

The **Account** page shows a card for each section with a count badge, and a **Download your data (GDPR)** panel.

When a subscription that does not renew automatically expires within the next 30 days, the dashboard shows a warning at the top with a **Renew now** link.

**Download my data** returns a JSON file with the customer's profile, customer record, orders, invoices, subscriptions, licenses, download history, subscription events and coupon redemptions. Password and profile changes go through Joomla's own user profile (`com_users`).

## Subscriptions

One card per subscription, showing product and plan, status badge, price, billing cycle, payment method, and either the next charge date (auto-renewing) or the expiry date. Auto-renewing cards show an **Auto-renewing** badge; cards where the customer turned renewal off show **Auto-renewal cancelled**.

| Button | Shown when | What it does |
|--------|------------|--------------|
| **Change Plan** | Auto-renewing, not in a trial, no plan change already scheduled, and another plan with the same billing cycle is on sale | Opens the plan change dialog. See [Plan Changes](/licensedock/subscriptions/plan-changes) |
| **Cancel Auto-Renewal** | Recurring subscription that is active, trialing or past due | Stops billing at the gateway. Access continues until the end of the paid period |
| **Resume subscription** | Auto-renewal was cancelled and the paid period has not ended | Turns auto-renewal back on. Nothing is charged today. PayPal asks the customer to approve a new agreement |
| **Renew** | Subscription that does not renew automatically and has an end date (expired, cancelled, time-limited one-time purchase) | Sends the customer to checkout for the same plan with any [renewal discount](/licensedock/subscriptions/renewals) applied |
| **Renew Now** | Subscription is past due | Same as Renew, for paying a failed renewal directly |
| **Buy Now** | An expired trial that never converted | Checkout at the full price |
| **Cancel scheduled change** | A plan change is scheduled | Keeps the subscription on its current plan |
| **Browse Products** | The product has been retired | Links to the catalog |

Extra information on the card:

| Situation | Shown |
|-----------|-------|
| Trial | "Trial ends" date |
| Past due | "Last payment failed." alert, asking the customer to click **Renew Now** or update their payment details with the gateway (Stripe, PayPal or Mollie) |
| Scheduled plan change | The plan it switches to and when |
| Renewal discount available | "Renew before expiry", "After expiry", "Renew now", "Discount expires" and "After that" prices, depending on where the customer is in the renewal window |
| Plan or price retired | A legacy-plan notice. Renew sends the customer to the product page to pick a current plan |

Customers update their card or payment account with the gateway directly. LicenseDock has no payment-method form of its own.

## Downloads

Lists the published versions of every product the customer has access to, grouped by product in the order set on the product's Downloads tab. Each version shows its date, files (name, size and label), and release notes: expanded for the latest version and collapsed for older ones.

| Access | Result |
|--------|--------|
| Active or trialing subscription, or a cancelled one still inside its paid period | Download links |
| Expired subscription | Versions listed with an **Expired** badge and no links |
| Bundle | Products included in a bundle inherit the bundle's access |

Files restricted to a plan only appear for customers on that plan. Download links are signed and time-limited, and each download is recorded in the Download Log. See [Downloads](/licensedock/products/downloads).

## Licenses

One card per license, newest first:

| Shown | Notes |
|-------|-------|
| Product | Card heading |
| Status | Badge |
| License Key | Selectable, with a **Copy** button |
| Activations | Used against the limit, `∞` when unlimited |
| Activated identifiers | The identifiers in use. Hovering shows the name your software sent |

The Licenses page is read-only. Activations are created and removed by the customer's software through the [API](/licensedock/api/activate), or removed by you in admin.

## Invoices

Lists the customer's issued invoices and credit notes with number, date, item, amount and status, with pagination. **Download** returns the PDF. See [Invoices](/licensedock/invoices/).

## Account Details

The **Account: Details** page has two cards:

| Card | Fields |
|------|--------|
| Your Details | Full name (optional, used on invoices; blank uses the account name), email (read-only) |
| Billing Address | The same address fields as checkout: company, address, city, state, postcode, country, tax ID and phone, as configured for the customer's country and in **Settings → Storefront** |

**Save Changes** validates the fields the same way checkout does. Saved details prefill the next checkout and appear on future invoices.
