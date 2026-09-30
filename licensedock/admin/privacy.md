# Privacy & GDPR

LicenseDock gives customers a copy of their data, anonymises a customer when their Joomla account is deleted, records the consents given at checkout, and deletes personal data it no longer needs on a schedule.

## Customer Data Export

The customer account page (the **Account** menu item) has a **Download your data (GDPR)** section. **Download my data** gives the signed-in customer a JSON file of everything LicenseDock holds about them:

| Section | Contents |
|---------|----------|
| `user` | Joomla user ID, username, name, email, registration date |
| `customer` | The customer record: name, company, address, tax ID, phone |
| `orders` | Orders with their items and payment transactions |
| `invoices` | Invoices and credit notes with their line items |
| `subscriptions` | Subscriptions |
| `licenses` | Licenses with their activations and rejected activation attempts |
| `downloads` | Download history |
| `subscription_events` | Subscription history |
| `coupon_redemptions` | Coupon uses |

The file is named after your store, the user ID and the date, and carries an `export_version` so its structure can be identified later.

## Deleting a Customer

Delete the customer's Joomla user in **Users → Manage**. The LicenseDock user plugin then does the following, in this order.

### 1. Stop Billing

Active, past-due and trialing subscriptions are cancelled at Stripe, PayPal or Mollie, and marked cancelled in LicenseDock. Without this the gateway would keep charging the saved card, and the customer would have no account to cancel from.

If a gateway cancellation fails, the subscription is still marked cancelled locally and an `admin_gateway_error` email goes to the admin addresses for each failure, so you can finish the cancellation in the gateway dashboard.

### 2. Remove Personal Data

| Data | What happens |
|------|--------------|
| Customer record | Name becomes `Deleted User`, email becomes `deleted-user-{id}@local.invalid`, and phone, address, company, city, state, postcode, country and tax ID are cleared |
| Queued emails to the customer | Cancelled, marked Failed with the reason "Cancelled: user deleted (GDPR)" |
| Email log | The customer's name, address and message body are removed from every email sent to them |
| Coupon use records | Deleted |
| Unpaid (pending) orders | Billing details, phone, IP address and the recovery link are cleared, so no further recovery emails are sent |
| All orders | IP address and browser user agent are cleared |
| License activations and rejected attempts | IP address, identifier and name are cleared |
| Download log | IP address and identifier are cleared |
| Links to the Joomla user | Removed from customers, orders, subscriptions, licenses, download logs and invoices |

### 3. What Is Kept

Completed and refunded orders keep their billing details, and invoices and credit notes are kept in full, including their PDF files. These are accounting records that tax law requires you to retain, which takes precedence over erasure. Removing the Joomla user link from invoices stops them from ever appearing in the account of a new user who is later given the same ID.

### Changed Email Addresses

When a customer changes their email address in Joomla – on the site or in admin – LicenseDock updates the customer record to match, so receipts and reminders go to the new address.

## Automatic Deletion

The **LicenseDock - Reminders & Expiration** scheduled task deletes, after 90 days:

- Sent and failed emails, including their rendered bodies
- Rejected license activation attempts
- Refused download records

See [Scheduled Tasks](/licensedock/admin/scheduled-tasks).

## Checkout Consent

**Components → LicenseDock → Checkout Consent** manages the checkboxes shown at checkout.

| Consent | Default wording | Rules |
|---------|-----------------|-------|
| Terms & Conditions | "I accept the {link}." | Can never be pre-checked. Link it to a menu item or an external URL |
| Cooling-off waiver | "I expressly consent to the digital content being supplied before the 14-day withdrawal period ends, and I acknowledge that I thereby lose my right of withdrawal once supply begins." | Always required while published. Can never be pre-checked |
| Marketing opt-in | "Send me occasional product news and offers by email. Unsubscribe anytime." | Can never be required |
| Custom checkbox | Your own text | Any combination of required and pre-checked, with an optional link |

The three standard consents can be unpublished but not deleted. Leave a standard consent's **Label** blank to use its built-in wording, which is translated for every shipped language. A menu item link follows the buyer's language through Joomla's menu associations.

When an order is placed, LicenseDock stores the exact wording each buyer saw, whether they ticked each box, the time and the language. The record is shown on the order in admin under **Consent given**, and included in the `purchase_confirmation` email.

### Privacy Policy Link

The **Privacy Policy** card on the same screen adds a link to your privacy policy at checkout. It is shown as a plain link with no checkbox, since a privacy policy is information for the buyer. Pick a menu item or enter a URL.

## Browser Storage

| Item | Type | Purpose |
|------|------|---------|
| `ld_cart` | Cookie, 24 hours | Remembers the product being bought so the checkout survives signing in or closing the browser. Cleared when the order completes |
| Guest checkout details | Browser local storage | Pre-fills a guest's name, email and billing details at checkout. Stays in the browser and is cleared on the thank-you page |
