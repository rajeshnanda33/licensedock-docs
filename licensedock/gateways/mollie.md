# Mollie

Mollie handles one-time payments, subscriptions, plan changes, and refunds. It supports a wide range of European payment methods including iDEAL, Bancontact, SOFORT, and credit cards.

## Setup

1. Create a [Mollie account](https://www.mollie.com)
2. In the Mollie Dashboard → **Developers → API keys**, copy your test and live API keys
3. In Joomla admin → **Components → LicenseDock → Gateways → Mollie**
4. Enter:
   - **Test API Key** (`test_...`)
   - **Live API Key** (`live_...`)
5. Set the mode to **Test** or **Live**
6. Save

API keys are encrypted at rest with AES-256-CBC.

## Webhook Setup

LicenseDock passes a webhook URL with each Mollie payment, so there's no separate webhook configuration in the Mollie Dashboard. Mollie hits:

```
https://yoursite.com/api/index.php/v1/licensedock/webhooks/mollie
```

For local development, set **Webhook Base URL** in **Settings → Gateways** to your tunnel URL (ngrok, Cloudflare Tunnel) – Mollie can't reach `localhost`.

Unlike Stripe and PayPal, Mollie webhooks don't carry a signature. LicenseDock verifies each notification by re-fetching the payment status from Mollie's API, so a forged webhook can't fake a paid status.

## Events Handled

| Notification | Status | Action |
|--------------|--------|--------|
| Payment | `paid` | Completes the one-time order or records a subscription renewal |
| Payment | `paid` (with refund/chargeback) | Applies the refund or chargeback |
| Payment | `failed` | Marks the order failed (one-time) or records a dunning failure (subscription) |
| Payment | `expired` / `canceled` | Marks the order terminal |

Webhook handlers are idempotent – Mollie may send the same payment ID multiple times as the status changes, and LicenseDock handles that safely.

## Plan Changes

| Mode | Behaviour |
|------|-----------|
| Immediate (net > 0) | `PATCH` the Mollie subscription, create a one-off payment using the existing mandate – no redirect |
| Immediate (net < 0) | `PATCH` the subscription, refund the difference on a refundable past payment |
| Scheduled | `PATCH` the subscription amount, takes effect on the next renewal |

Mollie has no native mid-cycle proration – LicenseDock handles deltas through one-off payments and refunds.

See [Plan Change Behaviour](/licensedock/gateways/webhooks#plan-changes) for the full matrix.

## Testing

- Use test keys (`test_...`) and Mollie's test cards from the [Mollie test mode docs](https://docs.mollie.com/overview/testing)
- Mollie's free test mode accepts test cards without real charges

## Supported Payment Methods

Mollie automatically displays available payment methods based on the customer's location:

- Credit and debit cards (Visa, Mastercard, Amex)
- iDEAL (Netherlands)
- Bancontact (Belgium)
- SOFORT / Klarna
- PayPal (via Mollie)
- SEPA Direct Debit
- Bank transfer

## How Payments Work

- **One-time** – customer pays on Mollie's hosted page, returns, webhook completes the order
- **Recurring** – first payment uses `sequenceType=first` to create a mandate. Mollie's subscription API charges automatically on each cycle using the mandate. No customer redirect on renewals
- **Refunds** – issued from LicenseDock admin → Mollie processes → webhook applies the refund locally
