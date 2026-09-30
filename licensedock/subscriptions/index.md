# Subscriptions

Every completed purchase creates a subscription record: recurring plans, one-time purchases with a limited access period, and lifetime purchases alike. The subscription holds the plan, the dates and the renewal state. The license, if the product issues one, follows it.

| Purchase | Expiry | Renews |
|----------|--------|--------|
| Recurring price (monthly, quarterly, semi-annual, annual) | End of the current cycle, plus a 2-day buffer | Automatically through the gateway |
| One-time price with an access period | End of the access period | Manually, with the **Renew** button |
| One-time lifetime price | None | Never needed |

## Statuses

| Status | Meaning | License |
|--------|---------|---------|
| `trialing` | In a free trial. Converts to `active` on the first successful charge | `active` |
| `active` | Paid and current | `active` |
| `past_due` | A renewal payment failed and the gateway is retrying. See [Dunning](/licensedock/subscriptions/dunning) | `active` |
| `cancelled` | Ended by the gateway, a full refund, a lost dispute or a voided order | `revoked` after a refund, lost dispute or void. Otherwise `active` until the paid period ends |
| `expired` | The end date passed without renewal, or dunning ran out | `expired` |
| `suspended` | Paused by an admin | `suspended` |
| `pending` | Available when editing a manual subscription. No automatic flow sets it | Unchanged |

When a customer clicks **Cancel Auto-Renewal**, the status stays as it is (`active`, `trialing` or `past_due`). LicenseDock turns off auto-renewal, cancels billing at the gateway and records the cancellation date. The customer keeps access until the end of the paid period, then the subscription moves to `expired`. Until then, **Resume subscription** turns auto-renewal back on.

## Lifecycle

| Event | Result |
|-------|--------|
| Order completes | Subscription created as `active`, or `trialing` if the customer chose a trial |
| Gateway renewal succeeds | Expiry and next payment date move forward one cycle, license expiry follows, renewal invoice issued, **Renewal Receipt** email sent |
| Renewal fails | `past_due`. See [Dunning](/licensedock/subscriptions/dunning) |
| Customer cancels auto-renewal | Billing stops. Access continues to the end of the paid period |
| Customer resumes | Auto-renewal back on. Nothing charged today; the gateway charges again at the current expiry |
| Customer renews through checkout | Same subscription extended, see [Renewals](/licensedock/subscriptions/renewals) |
| Scheduled plan change reaches renewal | New plan applied. See [Plan Changes](/licensedock/subscriptions/plan-changes) |
| End date passes without renewal | `expired`, license `expired`, **Subscription Expired** email |
| Trial cancelled and trial end passes | `expired`, with the expiry set back to the trial end |
| Full refund | `cancelled`, gateway subscription cancelled, license `revoked` |

A successful gateway renewal that arrives after the subscription expired (for example a late retry after dunning ran out) brings the subscription and its license back to `active`, so a customer who paid always gets their access.

## Keeping Licenses in Step

The license's own expiry date is what the API enforces, so LicenseDock copies the subscription's date onto the license at every change: order completion, gateway renewal, checkout renewal, plan change, expiry and admin edits. Revoked and cancelled licenses are never changed by this sync.

## The Reminders & Expiration Task

Time-based changes run in the Joomla scheduled task **LicenseDock - Reminders & Expiration** (**System → Scheduled Tasks**). Recommended interval: every hour. Each run:

- sends renewal reminders, the trial-ending notice, trial winback and grace-period reminders
- expires subscriptions and licenses whose end date has passed and sends the expiry notice
- expires `past_due` subscriptions whose dunning grace period has run out
- expires cancelled trials whose trial has ended
- cleans up abandoned PayPal plan-change approvals and old log rows
- corrects Mollie subscriptions whose amount differs from LicenseDock's records, and flags Stripe and PayPal subscriptions whose gateway pricing differs

Subscriptions billed by a gateway expire through the gateway's own webhooks. The task only expires those that LicenseDock manages itself: one-time purchases, cancelled subscriptions and manual recurring subscriptions.

::: warning
Without this task, reminders are never sent and subscriptions that end are never marked expired. The API still refuses licenses past their expiry date.
:::

## Admin Screen

**Components → LicenseDock → Subscriptions** lists every subscription with customer, product and plan, status, auto-renew state, renewals and key dates.

| Filter | Options |
|--------|---------|
| Search | Subscription ID, customer name, customer email, plan, product |
| Product | Any product |
| Status | Active, Trialing, Expired, Cancelled, Suspended, Pending |
| Mode | Live (default), Test, All |
| Gateway pricing | All, or **Flagged by the last check** |

Each row can be viewed, edited or cancelled.

### Subscription Details

The details modal shows the source order, key dates (starts, trial end, next payment, expiry), renewals completed, gateway reference, any pending plan change, and an **Activity** timeline from the event log.

### Editing

**Edit Subscription** changes **Status** and **Expires At** on subscriptions LicenseDock manages itself: manual orders, one-time purchases and imports. Leave the expiry empty for no expiry. Lifetime purchases never take an expiry.

| Rule | Reason |
|------|--------|
| Active or Trialing needs a future expiry | A past date would expire it on the next task run |
| Expired needs a past expiry | A future date contradicts the status |
| Gateway-billed subscriptions can't be edited | The gateway owns their status and dates. Use **Cancel Subscription** |

Saving copies the status and expiry onto the subscription's licenses. See [Managing Licenses](/licensedock/licenses/#changing-status-or-expiry).

### Cancelling

**Cancel Subscription** works on recurring subscriptions that are active, trialing or past due. It cancels billing at the gateway first and stops if the gateway call fails. It then turns off auto-renewal the same way the customer's own cancel does: the customer keeps access until the current period ends, no refund is issued, and the customer can still resume. To end access immediately, refund the order.

### Billing mismatch

If the amount Stripe or PayPal will bill differs from what LicenseDock expects, the row shows a **Billing mismatch** badge. **Review billing mismatch** shows both amounts. For Stripe, **Correct the gateway price** updates the gateway to match LicenseDock. PayPal mismatches are fixed by hand in PayPal. Mollie amounts are corrected automatically by the scheduled task.

## Subscription Event Log

Every state change is written to the event log with the actor that caused it: **User** (the customer), **Admin**, **System** (the scheduled task) or **Webhook** (the gateway).

| Event | Logged when |
|-------|-------------|
| Created | A subscription is created |
| Renewed | A gateway or checkout renewal succeeds, with amount and gateway |
| Plan Changed | An immediate plan change is applied, with the proration amount |
| Plan Change Scheduled | A change is queued for the next renewal |
| Plan Change Cancelled | A scheduled change is withdrawn |
| Scheduled Change Applied | A scheduled change takes effect at renewal |
| Auto-renewal Cancelled | The customer or an admin turns off auto-renewal |
| Auto-renewal resumed | The customer turns auto-renewal back on |
| Cancelled | The subscription is ended (gateway, refund, lost dispute, void) |
| Refunded | A refund is applied to the subscription's order |
| Dunning Failed | A renewal payment fails |
| Renewal payment recovered | A renewal succeeds after one or more failures |
| Suspended | A dispute is opened on the subscription's order |
| Expired | The end date passed, dunning ran out, or a trial lapsed |

The log appears in three places:

- **Components → LicenseDock → Subscription Events** – every event, with search and filters for event type and actor
- the **Activity** timeline in a subscription's details
- the customer's details on **Customers**, with a link to their full history

Customers get their own events in the **Download my data** export from the [Customer Portal](/licensedock/portal/#dashboard).

## Related

- [Plan Changes](/licensedock/subscriptions/plan-changes)
- [Dunning](/licensedock/subscriptions/dunning)
- [Renewals & Reminders](/licensedock/subscriptions/renewals)
- [Managing Licenses](/licensedock/licenses/)
