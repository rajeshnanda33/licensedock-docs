# Stripe

Stripe handles one-time payments, subscriptions, plan changes (with proration), refunds, and dispute handling.

## Setup

1. Create a [Stripe account](https://stripe.com)
2. In the Stripe Dashboard → **Developers → API keys**, copy your secret and publishable keys
3. In Joomla admin → **Components → LicenseDock → Gateways → Stripe**
4. Enter:
   - **Test Secret Key** (`sk_test_...`)
   - **Test Publishable Key** (`pk_test_...`)
   - **Live Secret Key** (`sk_live_...`)
   - **Live Publishable Key** (`pk_live_...`)
5. Set the mode to **Test** or **Live**
6. Save

Secret keys are encrypted at rest with AES-256-CBC.

## Webhook Setup

Stripe needs to notify your store about payment events – successful payments, renewals, refunds, disputes. Without webhooks, recurring payments and refunds won't sync.

1. In the Stripe Dashboard → **Developers → Webhooks → Add endpoint**
2. URL:
   ```
   https://yoursite.com/api/index.php/v1/licensedock/webhooks/stripe
   ```
3. Subscribe to these events:

| Event | Why |
|-------|-----|
| `checkout.session.completed` | Completes the initial order after payment |
| `invoice.paid` | Records subscription renewals |
| `invoice.payment_failed` | Records a failed renewal (dunning) |
| `customer.subscription.deleted` | Cancels the local subscription record |
| `charge.refunded` | Applies refunds (full or partial) |
| `charge.dispute.created` | Suspends licenses when a dispute opens |
| `charge.dispute.closed` | Restores or revokes access based on the dispute outcome |

4. Copy the **Signing Secret** Stripe gives you and paste it into LicenseDock under **Webhook Signing Secret**

::: tip What's the signing secret?
A shared secret used to verify the webhook is genuinely from Stripe. LicenseDock checks the `Stripe-Signature` header against this value with a 5-minute timestamp tolerance.
:::

## Plan Changes

LicenseDock supports two plan-change modes for Stripe subscriptions:

| Mode | Behaviour |
|------|-----------|
| Immediate | Calls `POST /subscriptions/{id}` with `proration_behavior=always_invoice` – Stripe charges or credits the prorated difference today, no redirect |
| Scheduled | Builds a Stripe `subscription_schedule` with two phases – the new price kicks in at the next renewal |

See [Plan Change Behaviour](/licensedock/gateways/webhooks#plan-changes) for the full matrix.

## Trials and Loyalty Pricing

For complex subscription setups (paid trials or renewal/loyalty discounts), LicenseDock uses a Stripe **Setup** session followed by a server-side `subscription_schedule` so the first cycle, trial, and renewal price are exact – not approximated by Stripe's checkout fields.

## Testing

- Test mode keys (`sk_test_...`)
- Test card: `4242 4242 4242 4242`, any future expiry, any CVC, any postcode
- Stripe CLI for local webhook testing: `stripe listen --forward-to https://yoursite.com/api/index.php/v1/licensedock/webhooks/stripe`

::: tip India-based Stripe accounts
Indian Stripe accounts can't take international payments in live mode without a registered business. Use test keys during development.
:::

## How Payments Work

- **One-time** – Stripe Checkout Session, customer pays, redirected back, webhook completes the order
- **Recurring** – Stripe Checkout Session, customer pays the first cycle, Stripe charges automatically each cycle and notifies via `invoice.paid`
- **Refunds** – issued from LicenseDock admin → Stripe processes → webhook applies the refund locally
