# Stripe

Stripe handles one-time payments, subscriptions (including paid trials and loyalty pricing), plan changes, refunds and disputes.

## Setup

1. In the Stripe Dashboard → **Developers → API keys**, copy the publishable and secret key. Do this once in test mode and once in live mode.
2. In Joomla admin, go to **Components → LicenseDock → Payment Gateways** and find the **Stripe** card.
3. Set **Status** to **Enabled** and **Mode** to **Test** or **Live**. The card shows the credential fields for the selected mode.
4. Enter the credentials for that mode:

| Field | Test mode | Live mode |
|-------|-----------|-----------|
| Publishable Key | `pk_test_...` | `pk_live_...` |
| Secret Key | `sk_test_...` | `sk_live_...` |
| Webhook Secret | `whsec_...` (test endpoint) | `whsec_...` (live endpoint) |

5. Click **Apply**.
6. Click **Check connection** in the card header. LicenseDock calls Stripe with the saved keys for the mode selected on the card and shows the connected account, or Stripe's error message.

Switch the card to the other mode and repeat when you are ready to take real payments. Both sets of keys can be stored at once – only the selected mode is used for checkout.

### Credential storage

The secret key and webhook secret are encrypted at rest with AES-256-GCM, using a key derived from the `secret` in Joomla's `configuration.php`. Once saved, those fields show a mask. Leave a field empty to keep the stored value, or type a new one to replace it.

If the Joomla `secret` changes (for example after moving the site), stored credentials can no longer be decrypted and **Check connection** says so. Enter the keys again and click **Apply**.

## Webhook setup

Stripe notifies LicenseDock about payments, renewals, failed payments, refunds and disputes. Without the webhook, renewals, dashboard refunds and disputes never reach your store.

Stripe keeps test and live webhook endpoints apart, each with its own signing secret. Create one endpoint per mode you use.

1. In the Stripe Dashboard → **Developers → Webhooks**, add an endpoint.
2. URL (also shown with a **Copy** button on the Stripe card):
   ```
   https://yoursite.com/api/index.php/v1/licensedock/webhooks/stripe
   ```
3. Select these events:

| Event | Why |
|-------|-----|
| `checkout.session.completed` | Completes the order after checkout |
| `checkout.session.async_payment_succeeded` | Completes an order paid with a delayed method (SEPA Direct Debit, Bacs) once the money clears |
| `checkout.session.async_payment_failed` | Marks that order **Failed** when the delayed payment bounces |
| `charge.refunded` | Records refunds, including ones made in the Stripe Dashboard |
| `customer.subscription.deleted` | Cancels the local subscription |
| `invoice.paid` | Records a subscription renewal |
| `invoice.payment_failed` | Records a failed renewal payment |
| `charge.dispute.created` | Opens a dispute and suspends the order's licenses |
| `charge.dispute.closed` | Restores or revokes access based on the outcome |

4. Copy the endpoint's **Signing secret** (`whsec_...`) into **Webhook Secret** for the same mode and click **Apply**.

LicenseDock checks the `Stripe-Signature` header (HMAC-SHA256) against the webhook secret of the active mode and rejects requests with a timestamp more than 5 minutes old. With no webhook secret saved for the active mode, every Stripe webhook is rejected.

::: tip Check the event list
**Store Health** finds your Stripe endpoint by its URL and compares its events with the list above. It reports any missing events and flags an endpoint Stripe has disabled. Endpoints created before LicenseDock 1.9.0 lack the two `async_payment` events.
:::

## How payments work

| Purchase | Flow |
|----------|------|
| One-time | Stripe Checkout in payment mode |
| Subscription | Stripe Checkout in subscription mode. Stripe charges each cycle and sends `invoice.paid` |
| Subscription with a paid trial or loyalty pricing | Stripe Checkout in setup mode collects the card only. LicenseDock then builds a Stripe subscription schedule, so the trial fee, first cycle and renewal price are billed exactly |

The order completes when the customer returns from Stripe or when the webhook arrives, whichever comes first.

Coupons apply to the first charge only. Renewals bill at the plan's renewal price.

LicenseDock creates one Stripe product per plan, with the ID `ld_plan_{plan id}`, and reuses it and its prices for later orders. If you archive one of these products in Stripe, LicenseDock reactivates it at the next checkout.

## Subscriptions

| Stripe event | What LicenseDock does |
|--------------|-----------------------|
| `invoice.paid` | Records the renewal payment, extends the subscription and its licenses, and applies any scheduled plan change. The first invoice of a new subscription is skipped because checkout already completed the order |
| `invoice.payment_failed` | Marks the subscription **Past Due** and emails the customer on the first failure. Stripe keeps retrying. If payment hasn't recovered after the **Dunning grace period** (**Settings**, default 14 days), the subscription is cancelled |
| `customer.subscription.deleted` | Cancels the local subscription. If the customer already turned off auto-renewal and paid time remains, the subscription runs until it expires |

When a customer cancels auto-renewal in their account, LicenseDock asks Stripe to cancel at the end of the current period. A full refund or a lost dispute cancels the Stripe subscription immediately.

## Plan changes

| Change | Behaviour |
|--------|-----------|
| Upgrade, immediate | LicenseDock charges the prorated difference as a separate one-off Stripe invoice, then switches the subscription price. Stripe's own proration is turned off. If the charge fails, the subscription is left unchanged. No redirect |
| Any change, scheduled | A subscription schedule phase switches the price at the next renewal |
| Downgrade | Always scheduled for the next renewal. No charge or refund today |

See [Plan changes](/licensedock/gateways/webhooks#plan-changes) for all three gateways side by side.

## Refunds and disputes

Refunds issued from LicenseDock admin go through the Stripe API. Refunds made in the Stripe Dashboard reach LicenseDock through `charge.refunded`. The refund reason you enter in admin is also sent to Stripe as refund metadata.

See [Refunds](/licensedock/gateways/refunds) and [Disputes](/licensedock/gateways/disputes).

## Testing

- Use test mode keys (`sk_test_...`, `pk_test_...`).
- Test card: `4242 4242 4242 4242`, any future expiry, any CVC, any postcode.
- To receive webhooks on a local site, forward them with the Stripe CLI:
  ```
  stripe listen --forward-to https://yoursite.test/api/index.php/v1/licensedock/webhooks/stripe
  ```
  The CLI prints its own `whsec_...` signing secret. Enter that as the test **Webhook Secret** while forwarding.
- Orders placed while Stripe is in test mode are flagged as test orders. They are hidden from the Orders list by default (filter **Test** to see them), kept out of your figures, and can be removed under **Cleanup**.

::: tip India-based Stripe accounts
Indian Stripe accounts can't take international payments in live mode without a registered business. Use test keys during development.
:::
