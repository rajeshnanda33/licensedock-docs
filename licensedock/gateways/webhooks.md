# Webhooks

Webhooks are the notifications payment gateways send to LicenseDock when something happens: a payment clears, a subscription renews or fails, a refund is made, a dispute opens. Renewals, refunds made in a gateway dashboard and disputes only reach your store through webhooks.

## Webhook URLs

| Gateway | URL |
|---------|-----|
| Stripe | `https://yoursite.com/api/index.php/v1/licensedock/webhooks/stripe` |
| PayPal | `https://yoursite.com/api/index.php/v1/licensedock/webhooks/paypal` |
| Mollie | `https://yoursite.com/api/index.php/v1/licensedock/webhooks/mollie` |

Each gateway card on **Components → LicenseDock → Payment Gateways** shows its URL with a **Copy** button.

Stripe and PayPal need the URL added in their dashboards, with the events listed on the [Stripe](/licensedock/gateways/stripe#webhook-setup) and [PayPal](/licensedock/gateways/paypal#webhook-setup) pages. Mollie needs no setup: LicenseDock sends the URL with every payment it creates.

### Webhook Base URL

The URLs are built from your site's address. For local development, enter a public tunnel URL (ngrok, Cloudflare Tunnel) in **Webhook Base URL** at the top of the Payment Gateways page and click **Apply** – gateways can't reach `localhost`. Leave it empty in production. **Store Health** warns when its host doesn't match your site.

## What each event does

### Stripe

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Completes the order once payment has cleared |
| `checkout.session.async_payment_succeeded` | Completes an order paid with a delayed method (SEPA Direct Debit, Bacs) |
| `checkout.session.async_payment_failed` | Marks that order **Failed** and emails the customer |
| `charge.refunded` | Records each new refund (full or partial) |
| `customer.subscription.deleted` | Cancels the local subscription, or lets it run to expiry if the customer already turned off auto-renewal |
| `invoice.paid` | Records a renewal and extends the subscription |
| `invoice.payment_failed` | Records a failed renewal (dunning) |
| `charge.dispute.created` | Opens a dispute and suspends the order's licenses |
| `charge.dispute.closed` | Resolves the dispute: won or `warning_closed` restores access, lost revokes it |

### PayPal

| Event | Action |
|-------|--------|
| `PAYMENT.CAPTURE.COMPLETED` | Completes a one-time order |
| `PAYMENT.CAPTURE.DENIED` | Marks the order **Failed** and emails the customer |
| `PAYMENT.CAPTURE.REFUNDED` | Records a refund on a one-time payment, or settles a pending one |
| `CUSTOMER.DISPUTE.CREATED` | Opens a dispute and suspends the order's licenses |
| `CUSTOMER.DISPUTE.RESOLVED` | Resolves the dispute and restores or revokes access |
| `BILLING.SUBSCRIPTION.CANCELLED` | Turns off auto-renewal if paid time remains, otherwise cancels the local subscription |
| `PAYMENT.SALE.COMPLETED` | Completes a subscription order or records a renewal |
| `PAYMENT.SALE.REFUNDED` | Records a refund on a subscription payment, or settles a pending one |
| `BILLING.SUBSCRIPTION.SUSPENDED` | Marks the subscription **Past Due** |
| `BILLING.SUBSCRIPTION.PAYMENT.FAILED` | Records a failed renewal (dunning) |
| `BILLING.SUBSCRIPTION.ACTIVATED` | Completes a subscription order if the customer never returned from PayPal |

### Mollie

Mollie sends only a payment ID. LicenseDock fetches the payment and acts on its status.

| Payment status | Action |
|----------------|--------|
| `paid` | Completes the order or records a subscription renewal |
| `paid` with refunds or chargebacks | Records each new refund and chargeback |
| `failed` (subscription payment) | Records a failed renewal (dunning) |
| `failed` (one-time payment) | Marks the order **Failed** and emails the customer |
| `expired` / `canceled` | Marks the order **Failed** / **Cancelled** |
| Plan-change payment | Applies the pending upgrade when paid, leaves the plan unchanged when it fails |

Any other event type or status is acknowledged and logged as **Skipped**.

## Security

| Gateway | Verification |
|---------|--------------|
| Stripe | HMAC-SHA256 signature in the `Stripe-Signature` header, checked against the **Webhook Secret** of the active mode, with a 5-minute timestamp tolerance |
| PayPal | RSA-SHA256 signature checked locally against PayPal's signing certificate, using the **Webhook ID** of the active mode |
| Mollie | The payment is fetched from the Mollie API with your API key. Mollie webhooks carry no signature |

A request that fails verification gets HTTP 400 and is logged as **Failed**. Only the active mode's secret or Webhook ID is used, so a gateway in test mode rejects live webhooks and the other way round.

Each IP address can make 60 webhook requests per minute. Requests over the limit get HTTP 429.

Amounts and currencies are checked against the order. On a mismatch the order is left pending and the store admin gets an email. A payment that arrives for an order that is already cancelled or failed also triggers an admin email so the money can be refunded or the order fixed.

## Retries and duplicates

LicenseDock returns HTTP 200 once an event is handled, including events it has nothing to do for. If handling fails, it returns HTTP 500 and the gateway retries on its own schedule.

| Gateway | Duplicate protection |
|---------|----------------------|
| Stripe | Each `event.id` is processed once |
| PayPal | Each transmission ID is processed once |
| Mollie | Every handler checks what is already recorded (refund IDs, chargeback IDs, order status), because Mollie sends the same payment ID for each status change |

An event is only marked as processed after its handler succeeds, so a failed attempt is picked up again by the gateway's retry. Refunds, disputes and renewals are also keyed on the gateway's own IDs, so the same gateway refund or payment isn't recorded twice.

A dispute can close before its "created" event has been processed. LicenseDock then returns 500 so the gateway retries, and stops asking after three days.

## Webhook Log

**Components → LicenseDock → Webhook Log** lists every webhook received. Filter by gateway and status, or search event type, gateway event ID and error message. Click an entry to see its event type, gateway event ID, IP address, date, error and payload.

| Status | Meaning |
|--------|---------|
| Processed | The webhook changed something in your store |
| Skipped | No action needed (an event for an order LicenseDock doesn't know, an already-applied refund, a Mollie connectivity test) |
| Failed | Verification or processing failed. The gateway retries automatically |

Personal and card data in the stored payload is masked: names, email addresses, phone numbers, addresses, PayPal payer details, Mollie account holder and IBAN, card last four digits and fingerprints. Repeat deliveries of an already-processed Stripe or PayPal event are answered without a new log entry.

Log entries are kept until you delete them from the toolbar.

## Store Health

**Components → LicenseDock → Store Health** checks each enabled gateway:

| Check | What it looks at |
|-------|------------------|
| Webhook secret | A Stripe **Webhook Secret** or PayPal **Webhook ID** is saved for the active mode |
| Webhook events | The Stripe endpoint (found by URL) or PayPal webhook (found by Webhook ID) is subscribed to every event LicenseDock handles, and is enabled |
| Last webhook | When each gateway last sent a webhook, and whether it succeeded |
| Webhook processing (7 days) | How many webhooks in the last 7 days processed successfully |
| Webhook base URL host | A **Webhook Base URL** pointing at a different host than your site |

## Plan changes

Customers change plans from their account. They pick whether the change happens now or at the next renewal. A downgrade is always scheduled for the next renewal, so no plan change ever refunds money.

### Stripe

| Change | Customer experience | Charge today | Redirect |
|--------|---------------------|--------------|----------|
| Upgrade, immediate | Plan switches once the prorated difference is charged | Yes, as a separate invoice | No |
| Scheduled | Change applies at the next renewal | No | No |
| Downgrade | "No charge or refund today", applies at the next renewal | No | No |

### PayPal

| Change | Customer experience | Charge today | Redirect |
|--------|---------------------|--------------|----------|
| Upgrade, immediate | Approve the prorated payment, then approve the revised subscription | Yes | Yes, two approvals |
| Scheduled | Approve the revised subscription | No | Yes, one approval |
| Downgrade | Approve the revised subscription, applies at the next renewal | No | Yes, one approval |

### Mollie

| Change | Customer experience | Charge today | Redirect |
|--------|---------------------|--------------|----------|
| Upgrade, immediate | "Your payment is processing", plan switches when Mollie confirms the payment | Yes, on the mandate | No |
| Scheduled | Change applies at the next renewal | No | No |
| Downgrade | "No charge or refund today", applies at the next renewal | No | No |

Proration is based on the actual days left in the current cycle and the amount the customer actually paid for it (after any coupon).

## Troubleshooting

If a webhook doesn't arrive or doesn't process:

1. Open **Store Health** and fix anything it reports under Payment Gateways.
2. Check **Webhook Log** for **Failed** entries and read the error.
3. Confirm the URL in the gateway dashboard matches the one on the Payment Gateways page.
4. Confirm the Stripe **Webhook Secret** or PayPal **Webhook ID** belongs to the endpoint for the mode you're in.
5. Check the gateway's own delivery log (Stripe Dashboard → Webhooks, PayPal Developer Dashboard → Webhooks events, Mollie Dashboard → the payment's details) to confirm it sent the event.
6. Make sure the site is publicly reachable and **Webhook Base URL** is empty in production.
