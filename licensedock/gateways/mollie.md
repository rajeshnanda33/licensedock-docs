# Mollie

Mollie handles one-time payments, subscriptions, plan changes, refunds and chargebacks, with the payment methods enabled on your Mollie account (cards, iDEAL, Bancontact, SEPA Direct Debit and others).

## Setup

1. In the Mollie Dashboard → **Developers → API keys**, copy your test API key (`test_...`) and live API key (`live_...`).
2. In Joomla admin, go to **Components → LicenseDock → Payment Gateways** and find the **Mollie** card.
3. Set **Status** to **Enabled** and **Mode** to **Test** or **Live**. The card shows the **API Key** field for the selected mode.
4. Enter the API key for that mode and click **Apply**.
5. Click **Check connection** in the card header. LicenseDock calls Mollie with the saved key for the mode selected on the card and lists the payment methods enabled on your account.

### Credential storage

API keys are encrypted at rest with AES-256-GCM, using a key derived from the `secret` in Joomla's `configuration.php`. Once saved, the field shows a mask. Leave it empty to keep the stored key, or type a new one to replace it.

If the Joomla `secret` changes, stored keys can no longer be decrypted and **Check connection** says so. Enter them again and click **Apply**.

## Webhook

LicenseDock sends its webhook URL to Mollie with every payment and subscription it creates, so Mollie knows where to post without any setup in the Mollie Dashboard. The URL is shown on the Mollie card:

```
https://yoursite.com/api/index.php/v1/licensedock/webhooks/mollie
```

Mollie posts to it whenever the status of one of those payments changes: paid, failed, expired, canceled, refunded or charged back. There are no events to select.

The Mollie Dashboard also has a **Webhooks** page for Mollie's newer event webhooks (payouts, balances, sales invoices, payment links). LicenseDock doesn't use them.

Mollie notifications carry only a payment ID and no signature. LicenseDock fetches that payment from the Mollie API with your API key and acts on what Mollie returns, so a forged request can't fake a payment status. If the fetch fails, LicenseDock answers with an error so Mollie retries.

::: warning Moving to a new domain
Mollie keeps the webhook URL that was sent when each payment or subscription was created. Subscriptions created before a domain change keep notifying the old URL.
:::

For local development, set **Webhook Base URL** at the top of the Payment Gateways page to a public tunnel URL (ngrok, Cloudflare Tunnel). Mollie can't reach `localhost`. Clear it again in production – **Store Health** warns when its host doesn't match your site.

## What each notification does

| Payment status | Action |
|----------------|--------|
| `paid` | Completes a one-time or first subscription order, or records a subscription renewal |
| `paid` with refunds or chargebacks | Records each new refund with status `refunded`, and each new chargeback |
| `failed` (subscription payment) | Records a failed renewal payment |
| `failed` (one-time payment) | Marks the order **Failed** and emails the customer |
| `expired` | Marks the order **Failed** (abandoned checkout, no email) |
| `canceled` | Marks the order **Cancelled** (abandoned checkout, no email) |
| Plan-change payment `paid` | Applies the pending plan upgrade |
| Plan-change payment `failed` / `expired` / `canceled` | Leaves the plan unchanged |

Mollie sends the same payment ID for every status change, and every handler checks what it has already recorded, so repeated notifications are safe.

## How payments work

| Purchase | Flow |
|----------|------|
| One-time | The customer pays on Mollie's hosted page and returns. The order completes on return or when the webhook arrives, whichever comes first |
| Subscription | The first payment is made with `sequenceType=first`, which creates a mandate. LicenseDock then creates a Mollie subscription, and Mollie charges the mandate each cycle with no customer redirect |

Mollie shows the methods enabled on your Mollie account. A free trial or 100% coupon on a subscription makes the first payment zero, and Mollie only offers methods that accept that, such as credit card and PayPal.

Coupons apply to the first charge only.

## Subscriptions

| Mollie notification | What LicenseDock does |
|---------------------|-----------------------|
| Renewal payment `paid` | Records the renewal, extends the subscription and its licenses, and applies any scheduled plan change |
| Renewal payment `failed` | Marks the subscription **Past Due** and emails the customer on the first failure. If payment hasn't recovered after the **Dunning grace period** (**Settings**, default 14 days), the subscription is cancelled |

Mollie doesn't send notifications for subscription status changes, only for the payments a subscription creates. Cancelling from the customer's account or a full refund cancels the Mollie subscription through the API.

## Plan changes

Mollie has no built-in proration, so LicenseDock charges the difference as a separate payment on the customer's mandate.

| Change | Behaviour |
|--------|-----------|
| Upgrade, immediate | LicenseDock creates a one-off payment for the prorated difference. The customer sees "Your payment is processing", and the plan switches when Mollie confirms the payment. If it fails, the plan stays as it was. No redirect |
| Any change, scheduled | The new price applies at the next renewal |
| Downgrade | Always scheduled for the next renewal. No charge or refund today |

See [Plan changes](/licensedock/gateways/webhooks#plan-changes) for all three gateways side by side.

## Refunds and chargebacks

Refunds issued from LicenseDock admin go through the Mollie API. Refunds made in the Mollie Dashboard reach LicenseDock through the payment webhook.

Mollie reports a chargeback after the bank has already reversed the payment. LicenseDock treats it as a dispute that is opened and lost at once. See [Refunds](/licensedock/gateways/refunds) and [Disputes](/licensedock/gateways/disputes).

## Testing

- Use your test API key (`test_...`) and the test payment methods from [Mollie's testing docs](https://docs.mollie.com/overview/testing). In test mode Mollie lets you choose the outcome of each payment.
- Orders placed while Mollie is in test mode are flagged as test orders. They are hidden from the Orders list by default (filter **Test** to see them), kept out of your figures, and can be removed under **Cleanup**.
