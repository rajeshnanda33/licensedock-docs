# Mollie

LicenseDock integrates with Mollie for one-time and recurring payments. Mollie supports a wide range of European payment methods including iDEAL, Bancontact, SOFORT, and credit cards.

## Setup

1. Create a [Mollie account](https://www.mollie.com)
2. In the Mollie Dashboard, go to **Developers → API keys**
3. In Joomla admin, go to **Components → LicenseDock → Settings → Gateways**
4. Enter your Mollie keys:
   - **Test API Key** (`test_...`)
   - **Live API Key** (`live_...`)
5. Set the mode to **Test** or **Live**

## Webhook Setup

Mollie handles webhooks automatically – no manual setup needed in the Mollie dashboard. LicenseDock takes care of it.

## How Payments Work

- **One-time:** Customer pays on Mollie's payment page, then returns to your site
- **Recurring:** Mollie charges the customer automatically on each billing cycle and notifies your store

## Supported Payment Methods

Mollie automatically shows available payment methods based on the customer's location. Common methods include:

- Credit/debit cards (Visa, Mastercard, Amex)
- iDEAL (Netherlands)
- Bancontact (Belgium)
- SOFORT/Klarna
- PayPal (via Mollie)
- Bank transfer
