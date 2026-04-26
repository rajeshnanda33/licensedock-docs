# PayPal

PayPal handles one-time payments, subscriptions, plan changes (with subscriber approval), refunds, and dispute handling.

## Setup

1. Create a [PayPal Developer account](https://developer.paypal.com)
2. Create a new app in the PayPal Developer Dashboard
3. Copy the **Client ID** and **Secret** for both sandbox and live
4. In Joomla admin → **Components → LicenseDock → Gateways → PayPal**
5. Enter:
   - **Sandbox Client ID** and **Sandbox Secret**
   - **Live Client ID** and **Live Secret**
6. Set the mode to **Sandbox** or **Live**
7. Save

Secrets are encrypted at rest with AES-256-CBC.

## Webhook Setup

PayPal needs a webhook endpoint to confirm payments and notify your store about subscription events.

1. In the PayPal Developer Dashboard → your app → **Webhooks → Add Webhook**
2. URL:
   ```
   https://yoursite.com/api/index.php/v1/licensedock/webhooks/paypal
   ```
3. Subscribe to these events:

| Event | Why |
|-------|-----|
| `PAYMENT.CAPTURE.COMPLETED` | Completes one-time payment orders |
| `PAYMENT.CAPTURE.REFUNDED` | Applies refunds on one-time payments |
| `PAYMENT.SALE.COMPLETED` | Records subscription payments (initial and renewals) |
| `PAYMENT.SALE.REFUNDED` | Applies refunds on subscription payments |
| `BILLING.SUBSCRIPTION.ACTIVATED` | Backup completion for the subscription approval flow |
| `BILLING.SUBSCRIPTION.PAYMENT.FAILED` | Records failed renewal payments |
| `BILLING.SUBSCRIPTION.SUSPENDED` | Suspends licenses after repeated failures |
| `BILLING.SUBSCRIPTION.CANCELLED` | Cancels the local subscription record |
| `CUSTOMER.DISPUTE.CREATED` | Suspends licenses on a chargeback |
| `CUSTOMER.DISPUTE.RESOLVED` | Restores or revokes access based on outcome |

4. After saving, copy the **Webhook ID** PayPal generates and paste it into LicenseDock under **PayPal Webhook ID**

The Webhook ID is used to verify each notification with PayPal's `verify-webhook-signature` endpoint.

## Plan Changes

PayPal subscription changes require subscriber approval (a redirect to PayPal). LicenseDock supports two modes:

| Mode | Behaviour |
|------|-----------|
| Immediate (upgrade, net > 0) | Two hops: capture the prorated delta, then redirect again to approve the plan revise |
| Immediate (downgrade, net < 0) | Single approval, refund issued on the most recent capture |
| Scheduled | Single approval, the new price applies at the next renewal |

See [Plan Change Behaviour](/licensedock/gateways/webhooks#plan-changes) for the full matrix.

## Testing

- Use sandbox credentials and a [sandbox buyer account](https://developer.paypal.com/dashboard/accounts) to make test purchases
- Sandbox webhooks reach your live URL – test against a publicly accessible site or a tunnel (ngrok, Cloudflare Tunnel)

## How Payments Work

- **One-time** – customer approves on PayPal, returns to your site, capture is recorded via webhook
- **Recurring** – LicenseDock creates a PayPal catalog product, billing plan, and subscription. Customer approves the subscription on PayPal. PayPal charges automatically on each cycle and notifies via `PAYMENT.SALE.COMPLETED`
- **Refunds** – issued from LicenseDock admin → PayPal returns the refund as `PENDING`, settled via webhook
