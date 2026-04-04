# Stripe

LicenseDock integrates with Stripe for one-time and recurring payments.

## Setup

1. Create a [Stripe account](https://stripe.com) if you don't have one
2. In the Stripe Dashboard, go to **Developers → API keys**
3. In Joomla admin, go to **Components → LicenseDock → Settings → Gateways**
4. Enter your Stripe keys:
   - **Test Secret Key** (`sk_test_...`)
   - **Test Publishable Key** (`pk_test_...`)
   - **Live Secret Key** (`sk_live_...`)
   - **Live Publishable Key** (`pk_live_...`)
5. Set the mode to **Test** or **Live**

## Webhook Setup

Webhooks let Stripe notify your store about payment events – like successful payments, renewals, and refunds. Without webhooks, LicenseDock won't know when a payment succeeds.

1. In the Stripe Dashboard, go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL:
   ```
   https://yoursite.com/api/index.php/v1/licensedock/webhooks/stripe
   ```
4. Select these events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
   - `charge.refunded`
5. Copy the **Signing Secret** that Stripe gives you and paste it into LicenseDock settings

::: tip What's the signing secret?
It's a security code that proves the notification is genuinely from Stripe and not from someone pretending to be Stripe.
:::

## Testing

Use Stripe's test mode with the test card number `4242 4242 4242 4242` (any future expiry, any CVC).

::: tip India-based Stripe Accounts
If your Stripe account is registered in India, use test mode keys for development – live mode requires a registered business for international payments.
:::

## How Payments Work

- **One-time:** Customer pays on Stripe's secure payment page, then returns to your site
- **Recurring:** Stripe charges the customer automatically on each billing cycle and notifies your store
