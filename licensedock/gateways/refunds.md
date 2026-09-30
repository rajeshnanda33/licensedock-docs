# Refunds

Refund an order in full or in part from LicenseDock admin, through Stripe, PayPal or Mollie. Refunds you make in a gateway's own dashboard are picked up by the webhook and recorded the same way.

## Refunding an order

1. Go to **Components → LicenseDock → Orders**.
2. Open the actions menu on the order's row and choose **Refund**.
3. Check the figures in the dialog: order total, anything already refunded, any refund still pending at the gateway, and the **Remaining** balance.
4. Enter the **Refund Amount**. Leave it at the remaining balance for a full refund, or enter less for a partial refund.
5. Optionally enter a **Reason**. It's stored with the refund record and never shown to the customer. On Stripe it is also sent as refund metadata.
6. Click **Confirm Refund**.

Only orders with the status **Completed** or **Partially Refunded** can be refunded. Refunding needs the **Delete** permission on LicenseDock.

The refundable balance covers everything paid on the order: the first payment, subscription renewals and any plan-change top-ups. When an order has several payments, LicenseDock refunds them largest first until the amount is covered.

## Full and partial refunds

| | Partial refund | Full refund |
|-|----------------|-------------|
| Order status | **Partially Refunded** | **Refunded** |
| Licenses | Stay active | Revoked |
| Subscriptions | Keep running | Cancelled in LicenseDock and at the gateway, immediately |
| Credit note | Issued for the refunded amount | Issued for the refunded amount |
| Customer email | Partial Refund Issued | Refund Issued, plus the subscription cancellation email |
| Admin email | Refund Issued | Refund Issued |

A partial refund that brings the total refunded up to the full amount paid is treated as a full refund.

Revoked licenses fail activation and validation through the [License API](/licensedock/api/).

## Credit notes

Every refund gets a credit note: a document in its own numbering series (for example `CN-0001`) that points at the invoice it credits. When the order has several invoices (renewals, plan-change top-ups), the credit note goes against the invoice for the payment that was refunded.

The credit note PDF is attached to the customer's refund email, and it appears alongside invoices in admin and in the customer's account. Test orders use a separate numbering series. See [Invoices](/licensedock/invoices/).

A lost chargeback doesn't create a credit note. See [Disputes](/licensedock/gateways/disputes#dispute-lost).

## Pending refunds (PayPal)

PayPal sometimes accepts a refund and settles it a little later. LicenseDock then shows "Refund queued. Status updates in 1–2 minutes." and records the refund as pending. Nothing else changes until PayPal confirms it with `PAYMENT.CAPTURE.REFUNDED` or `PAYMENT.SALE.REFUNDED`. Then the order status, credit note, emails and (for a full refund) license and subscription changes are applied.

While a refund is pending, the refund dialog shows it under **Pending Settlement** and leaves it out of the remaining balance, so the same money can't be refunded twice.

## Refunds made in the gateway dashboard

A refund made directly in Stripe, PayPal or Mollie reaches LicenseDock through the webhook:

| Gateway | Event |
|---------|-------|
| Stripe | `charge.refunded` |
| PayPal | `PAYMENT.CAPTURE.REFUNDED`, `PAYMENT.SALE.REFUNDED` |
| Mollie | Payment notification with a refund in status `refunded` |

It is recorded like a refund from admin: status change, credit note, emails, and license and subscription changes for a full refund. Each gateway refund ID is recorded once, however often the webhook repeats it.

## Mark as Refunded

**Mark as Refunded**, next to **Refund** in the actions menu, records a refund without contacting any gateway. Use it for money returned outside the gateways, or for a gateway whose webhook isn't set up.

It records the amount, issues the credit note and sends the emails in the same way. A full refund marked this way revokes licenses and cancels the subscription in LicenseDock, but **doesn't cancel the subscription at the gateway**. Cancel it in the gateway dashboard yourself, or the customer keeps being charged.

::: warning Don't record a gateway refund twice
When the webhook is working, a refund made in the gateway dashboard is recorded automatically. Marking it as refunded as well records a partial refund twice.
:::

## When a refund fails

| Message | What to do |
|---------|------------|
| Gateway refund failed: ... | The gateway's own error. Nothing was recorded |
| Refunded X of Y | Part of the amount went through. The gateway's last error is shown. Refund the rest again or from the gateway dashboard |
| No payment transaction found for this order | The order has no gateway payment on record (a manual order, for example). Use **Mark as Refunded** |
| No Stripe charge with a refundable balance was found for this subscription | Refund it from the Stripe Dashboard. The webhook records it |

## Plan-change downgrades

Downgrades are always scheduled for the next renewal, so a plan change never refunds money. See [Plan changes](/licensedock/gateways/webhooks#plan-changes).
