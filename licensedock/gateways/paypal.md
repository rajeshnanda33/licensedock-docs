# PayPal

PayPal handles one-time payments, subscriptions, plan changes (with subscriber approval), refunds and disputes.

## Setup

1. Sign in to the [PayPal Developer Dashboard](https://developer.paypal.com) and open **Apps & Credentials**.
2. Create an app in **Sandbox** and another in **Live**. Each app has its own **Client ID** and **Secret**.
3. In Joomla admin, go to **Components → LicenseDock → Payment Gateways** and find the **PayPal** card.
4. Set **Status** to **Enabled** and **Mode** to **Sandbox** or **Live**. The card shows the credential fields for the selected mode.
5. Enter the credentials for that mode:

| Field | Where it comes from |
|-------|---------------------|
| Client ID | Your PayPal app |
| Secret key | Your PayPal app's secret |
| Webhook ID | The webhook you add to the same app (see below) |

6. Click **Apply**.
7. Click **Check connection** in the card header. LicenseDock requests an OAuth token from PayPal with the saved credentials for the mode selected on the card.

### Credential storage

The secret is encrypted at rest with AES-256-GCM, using a key derived from the `secret` in Joomla's `configuration.php`. Once saved, the field shows a mask. Leave it empty to keep the stored value, or type a new one to replace it. The Client ID and Webhook ID are identifiers and are stored as entered.

If the Joomla `secret` changes, the stored secret can no longer be decrypted and **Check connection** says so. Enter it again and click **Apply**.

## Webhook setup

PayPal notifies LicenseDock about captures, subscription payments, subscription status changes, refunds and disputes. Sandbox and live apps each need their own webhook.

1. In the PayPal Developer Dashboard, open your app and click **Add Webhook**.
2. URL (also shown with a **Copy** button on the PayPal card):
   ```
   https://yoursite.com/api/index.php/v1/licensedock/webhooks/paypal
   ```
3. Select these events. PayPal lists them by the dashboard name in the second column.

| Event | Dashboard name | Why |
|-------|----------------|-----|
| `PAYMENT.CAPTURE.COMPLETED` | Payment capture completed | Completes a one-time order |
| `PAYMENT.CAPTURE.DENIED` | Payment capture denied | Marks the order **Failed** when a delayed capture (such as eCheck) bounces |
| `PAYMENT.CAPTURE.REFUNDED` | Payment capture refunded | Records a refund on a one-time payment |
| `CUSTOMER.DISPUTE.CREATED` | Customer dispute created | Opens a dispute and suspends the order's licenses |
| `CUSTOMER.DISPUTE.RESOLVED` | Customer dispute resolved | Restores or revokes access based on the outcome |
| `BILLING.SUBSCRIPTION.CANCELLED` | Billing subscription cancelled | Cancels the local subscription |
| `PAYMENT.SALE.COMPLETED` | Payment sale completed | Records a subscription payment (first payment or renewal) |
| `PAYMENT.SALE.REFUNDED` | Payment sale refunded | Records a refund on a subscription payment |
| `BILLING.SUBSCRIPTION.SUSPENDED` | Billing subscription suspended | Marks the subscription **Past Due** |
| `BILLING.SUBSCRIPTION.PAYMENT.FAILED` | Billing subscription payment failed | Records a failed renewal payment |
| `BILLING.SUBSCRIPTION.ACTIVATED` | Billing subscription activated | Completes a subscription order if the customer never returned from PayPal |

Subscribing the webhook to **All events** also works.

4. Save the webhook, copy the **Webhook ID** PayPal shows for it, paste it into **Webhook ID** for the same mode and click **Apply**.

LicenseDock verifies each notification itself. It downloads PayPal's signing certificate (only from a `paypal.com` host over HTTPS) and checks the RSA-SHA256 signature over the transmission ID, transmission time, your Webhook ID and a checksum of the exact request body. With no Webhook ID saved for the active mode, every PayPal webhook is rejected.

::: tip Check the event list
**Store Health** looks up your webhook by its Webhook ID and compares its events with the list above. Webhooks created before LicenseDock 1.9.0 lack `PAYMENT.CAPTURE.DENIED`.
:::

## How payments work

| Purchase | Flow |
|----------|------|
| One-time | The customer approves on PayPal and returns to your site. LicenseDock captures the payment and completes the order. `PAYMENT.CAPTURE.COMPLETED` completes it if the customer doesn't return |
| Subscription | LicenseDock creates a PayPal catalog product and billing plan, and the customer approves the subscription on PayPal. PayPal charges each cycle and sends `PAYMENT.SALE.COMPLETED` |

Coupons apply to the first charge only.

## Subscriptions

| PayPal event | What LicenseDock does |
|--------------|-----------------------|
| `PAYMENT.SALE.COMPLETED` | Completes a pending subscription order, or records a renewal and extends the subscription and its licenses |
| `BILLING.SUBSCRIPTION.ACTIVATED` | Completes the order if the customer closed the browser before returning. Also finishes a resumed subscription the same way |
| `BILLING.SUBSCRIPTION.PAYMENT.FAILED` | Marks the subscription **Past Due** and emails the customer on the first failure. If payment hasn't recovered after the **Dunning grace period** (**Settings**, default 14 days), the subscription is cancelled |
| `BILLING.SUBSCRIPTION.SUSPENDED` | Marks the subscription **Past Due**. Licenses are left as they are |
| `BILLING.SUBSCRIPTION.CANCELLED` | If paid time remains, auto-renewal is turned off and the subscription runs until it expires (the customer can resume it). Otherwise the subscription is cancelled |

## Plan changes

A PayPal subscription change needs the subscriber's approval, so the customer is redirected to PayPal.

| Change | Behaviour |
|--------|-----------|
| Upgrade, immediate | Two approvals: the customer pays the prorated difference, then approves the revised subscription |
| Any change, scheduled | One approval. The new price applies at the next renewal |
| Downgrade | Always scheduled for the next renewal. No charge or refund today |

See [Plan changes](/licensedock/gateways/webhooks#plan-changes) for all three gateways side by side.

## Refunds and disputes

Refunds issued from LicenseDock admin go through the PayPal API. PayPal sometimes accepts a refund as **pending**. LicenseDock then shows "Refund queued" and applies the refund when `PAYMENT.CAPTURE.REFUNDED` or `PAYMENT.SALE.REFUNDED` arrives, usually within a minute or two. Refunds made in the PayPal dashboard reach LicenseDock through the same two events.

See [Refunds](/licensedock/gateways/refunds) and [Disputes](/licensedock/gateways/disputes).

## Testing

- Use sandbox credentials and a [sandbox buyer account](https://developer.paypal.com/dashboard/accounts) to make test purchases.
- PayPal only sends webhooks to a public URL. To test on a local site, set **Webhook Base URL** at the top of the Payment Gateways page to a tunnel (ngrok, Cloudflare Tunnel) and use that URL for the sandbox webhook.
- Orders placed while PayPal is in sandbox mode are flagged as test orders. They are hidden from the Orders list by default (filter **Test** to see them), kept out of your figures, and can be removed under **Cleanup**.
