# Webhooks

Webhooks are the notifications payment providers send to LicenseDock when something happens – a payment succeeds, a subscription renews, a refund is issued, a dispute opens. Without webhooks, recurring payments and refunds won't sync.

## Webhook URLs

| Gateway | URL |
|---------|-----|
| Stripe | `https://yoursite.com/api/index.php/v1/licensedock/webhooks/stripe` |
| PayPal | `https://yoursite.com/api/index.php/v1/licensedock/webhooks/paypal` |
| Mollie | `https://yoursite.com/api/index.php/v1/licensedock/webhooks/mollie` |

The exact URLs are also displayed in **Components → LicenseDock → Gateways**.

For local development, set **Webhook Base URL** in **Settings → Gateways** to your tunnel URL – the gateways need a publicly reachable endpoint.

## What Each Event Does

### Stripe

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Completes the order after the initial payment |
| `invoice.paid` | Records a subscription renewal, extends the license |
| `invoice.payment_failed` | Records a failed renewal (dunning) |
| `charge.refunded` | Applies a refund (full or partial) |
| `customer.subscription.deleted` | Cancels the local subscription record |
| `charge.dispute.created` | Opens a dispute, suspends linked licenses |
| `charge.dispute.closed` | Resolves the dispute (won = restore, lost = revoke) |

### PayPal

| Event | Action |
|-------|--------|
| `PAYMENT.CAPTURE.COMPLETED` | Completes a one-time payment order |
| `PAYMENT.CAPTURE.REFUNDED` | Applies a refund on a one-time payment |
| `PAYMENT.SALE.COMPLETED` | Records a subscription payment (initial or renewal) |
| `PAYMENT.SALE.REFUNDED` | Applies a refund on a subscription payment |
| `BILLING.SUBSCRIPTION.ACTIVATED` | Backup completion for the approval flow |
| `BILLING.SUBSCRIPTION.PAYMENT.FAILED` | Records a failed renewal |
| `BILLING.SUBSCRIPTION.SUSPENDED` | Suspends licenses after repeated failures |
| `BILLING.SUBSCRIPTION.CANCELLED` | Cancels the local subscription record |
| `CUSTOMER.DISPUTE.CREATED` | Opens a dispute, suspends linked licenses |
| `CUSTOMER.DISPUTE.RESOLVED` | Resolves the dispute |

### Mollie

| Notification | Action |
|--------------|--------|
| Payment paid (clean) | Completes one-time order or records subscription renewal |
| Payment paid (with refund / chargeback) | Applies the refund or chargeback |
| Payment failed (one-time) | Marks the order failed |
| Payment failed (subscription) | Records a dunning failure |
| Payment expired / canceled | Marks the order terminal |

## Security

| Gateway | Verification |
|---------|--------------|
| Stripe | HMAC-SHA256 signature in the `Stripe-Signature` header. Checked with a 5-minute timestamp tolerance |
| PayPal | Remote verification via PayPal's `verify-webhook-signature` endpoint, using your Webhook ID |
| Mollie | Re-fetch payment status from Mollie's API – Mollie webhooks don't carry signatures |

Webhook signing secrets and webhook IDs are entered in **Settings → Gateways** and encrypted at rest.

## Idempotency

| Gateway | Approach |
|---------|----------|
| Stripe | Deduplicates by `event.id` |
| PayPal | Deduplicates by `transmission_id` |
| Mollie | Handlers are idempotent – Mollie sends the same payment ID for every status change |

## Plan Changes

Plan-change behaviour differs per gateway. The mode (immediate vs scheduled) is picked by the customer or admin in the customer portal.

### Stripe

| Mode | Customer experience | Charge today | Redirect |
|------|---------------------|--------------|----------|
| Immediate upgrade | "Plan updated, $X charged today" | Yes (delta) | No |
| Immediate downgrade | "Plan updated, $X credited" | Credit issued | No |
| Scheduled | "Change scheduled for [next renewal]" | No | No |

### PayPal

| Mode | Customer experience | Charge today | Redirect |
|------|---------------------|--------------|----------|
| Immediate upgrade (net > 0) | Approve delta, then approve plan revise | Yes | Yes (two hops) |
| Immediate downgrade (net < 0) | Approve plan revise, refund issued | Refund | Yes (single hop) |
| Scheduled | Approve plan revise | No | Yes (single hop) |

### Mollie

| Mode | Customer experience | Charge today | Redirect |
|------|---------------------|--------------|----------|
| Immediate upgrade (net > 0) | "Plan updated, $X charged" | Yes (delta via mandate) | No |
| Immediate downgrade (net < 0) | "Plan updated, $X refunded" | Refund | No |
| Scheduled | "Change scheduled for [next renewal]" | No | No |

## Troubleshooting

If a webhook doesn't fire or doesn't process:

1. Check **Components → LicenseDock → Webhook Logs** – every received webhook is logged with its raw payload, signature status, and the action taken
2. Verify the webhook URL matches what's in your gateway dashboard
3. Confirm the signing secret / webhook ID in LicenseDock matches the gateway
4. Use the gateway's own webhook log (Stripe Dashboard → Webhooks, PayPal Developer → Webhooks, Mollie Dashboard → API Keys) to confirm the gateway sent the event
5. For Mollie, make sure the **Webhook Base URL** is publicly reachable
