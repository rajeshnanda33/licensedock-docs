# Disputes

When a customer disputes a payment with their bank or PayPal, LicenseDock suspends their access while the dispute is open. It restores access if you win and revokes it if you lose. All of this runs from the gateway webhooks, so the dispute events must be selected on the [Stripe](/licensedock/gateways/stripe#webhook-setup) and [PayPal](/licensedock/gateways/paypal#webhook-setup) webhooks.

## Dispute opened

| What | Change |
|------|--------|
| Order status | **Disputed** |
| Licenses on the order | **Suspended** |
| Order transactions | A **Chargeback** transaction, pending, with the disputed amount and the gateway's reason |
| Subscription timeline | A **Suspended** event with the dispute ID, reason and amount |
| Admin email | **Chargeback / Dispute Opened**, with the order, customer, product, gateway, dispute ID, reason and amount |

Subscription billing isn't touched and the customer isn't emailed. Suspended licenses fail activation and validation through the [License API](/licensedock/api/) until the dispute closes.

Only orders with the status **Completed** or **Partially Refunded** can move to **Disputed**. A disputed order can't be refunded from admin until the dispute closes.

Respond to the dispute in the gateway's dashboard. LicenseDock only follows the outcome.

## Dispute won

| What | Change |
|------|--------|
| Order status | Back to **Completed**, or **Partially Refunded** if it had earlier refunds |
| Licenses | Reactivated |
| Chargeback transaction | Marked failed (the chargeback didn't stand) |
| Admin email | **Chargeback / Dispute Resolved**, outcome won |

## Dispute lost

A lost dispute ends access the same way a full refund does:

| What | Change |
|------|--------|
| Order status | **Refunded**, or **Partially Refunded** when the dispute covered only one of several payments on the order |
| Amount recorded | The disputed amount, capped at what is still unrefunded on the order |
| Licenses | Revoked |
| Subscriptions | Cancelled in LicenseDock and at the gateway, so the customer isn't charged again |
| Chargeback transaction | Marked successful. It counts toward the order's refunded total |
| Invoice | The invoice for the disputed payment goes back to unpaid for the amount lost. No credit note is issued |
| Customer emails | Refund Issued, plus the subscription cancellation email for each cancelled subscription |
| Admin emails | Refund Issued and **Chargeback / Dispute Resolved**, outcome lost |

## How each gateway reports outcomes

| Gateway | Opened | Closed | Counted as won | Counted as lost |
|---------|--------|--------|----------------|-----------------|
| Stripe | `charge.dispute.created` | `charge.dispute.closed` | `won`, `warning_closed` | `lost` |
| PayPal | `CUSTOMER.DISPUTE.CREATED` | `CUSTOMER.DISPUTE.RESOLVED` | `RESOLVED_SELLER_FAVOUR`, `DENIED`, `CANCELED_BY_BUYER` | Any other outcome, including `RESOLVED_BUYER_FAVOUR` and `RESOLVED_WITH_REFUND` |
| Mollie | Chargeback on the payment notification | Same notification | – | Always |

The dispute is matched to the exact payment it was raised against. On a renewed subscription, only that renewal payment is affected in the invoices and refund totals, though access is suspended or revoked for the whole order.

### Mollie chargebacks

Mollie reports a chargeback after the bank has already taken the money back, with no open and close stages. LicenseDock opens the dispute and records it as lost in one step, so access is revoked straight away.

If the chargeback is later reversed in your favour, LicenseDock doesn't change the order. Restore the customer's access by hand.

### Out-of-order events

A gateway can deliver the closing event before the opening one has been processed. LicenseDock asks the gateway to retry the closing event until the opening one lands. If the dispute is more than three days old and its opening event still hasn't arrived (for example because the webhook was set up after the dispute started), the closing event is logged and dropped, and the order is left as it was.

## Finding disputes

- **Orders** – filter by status **Disputed**.
- **Orders → View** – the **Transactions** list shows the **Chargeback** row with its amount, status and the gateway dispute ID as the reference. The reason is in the admin email.
- **Subscription Events** – the **Suspended** entry for each affected subscription.
- **Webhook Log** – the dispute events as received.
- The two admin emails can be edited under **Email Templates** (**Chargeback / Dispute Opened** and **Chargeback / Dispute Resolved**).
