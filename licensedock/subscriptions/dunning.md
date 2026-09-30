# Dunning

Dunning is what happens between a failed renewal payment and either recovery or the end of the subscription. Stripe, PayPal and Mollie retry failed renewals on their own schedules. LicenseDock tracks the failure, tells the customer, keeps their access while the gateway retries, and ends the subscription if the payment is still missing after the grace period.

## Settings

**Components → LicenseDock → Settings → Automation → Subscription Dunning**

| Setting | Default | Range | Notes |
|---------|---------|-------|-------|
| Dunning grace period | 14 days | 1–90 | Days after the first failed payment before the subscription is ended and the license expires |

The grace period is counted from the first failure in the current dunning cycle, so later retries don't restart it.

::: warning
The settings page says a value of **0** means "never auto-cancel". In 1.9.3 a saved 0 is stored as 14, so the backstop always runs.
:::

The grace period is enforced by the **LicenseDock - Reminders & Expiration** scheduled task. See [The Reminders & Expiration Task](/licensedock/subscriptions/#the-reminders-expiration-task).

## What Happens

| Step | Subscription | License | Customer email | Event log |
|------|--------------|---------|----------------|-----------|
| Renewal payment fails | `past_due` | Stays `active` | **Payment Failed**, first failure only | Dunning Failed |
| Gateway retries and fails again | `past_due` | `active` | None | Dunning Failed |
| Gateway retry succeeds | `active`, dates move forward | `active`, expiry extended | **Renewal Receipt** | Renewed, Renewal payment recovered |
| Grace period runs out | `expired` | `expired` | **Subscription Cancelled (Payment Failed)** | Expired |

The admin gets **Subscription Expired** when the grace period runs out.

Failures are recognised from these gateway events:

| Gateway | Events |
|---------|--------|
| Stripe | `invoice.payment_failed` |
| PayPal | `BILLING.SUBSCRIPTION.PAYMENT.FAILED`, `BILLING.SUBSCRIPTION.SUSPENDED` |
| Mollie | A failed recurring payment |

A failure notice that arrives after the customer has already paid (a delayed webhook) is ignored, so a customer who just recovered isn't flipped back to past due or emailed again.

## During Dunning

| Area | Behaviour |
|------|-----------|
| License | Stays `active`. The API keeps validating, activating and serving downloads |
| Portal – Subscriptions | The card shows "Last payment failed." and a **Renew Now** button, and tells the customer to update their payment details with the gateway |
| Portal – Downloads | Products whose only subscription is past due are hidden from the Downloads page until it recovers or ends |
| Plan changes | Not available until the subscription is active again |
| Admin – Subscriptions | Shows the attempt count and days since the first failure, for example "Attempt 2 · 5d" |

## Recovery

| Route | Result |
|-------|--------|
| The gateway's next retry succeeds (for example after the customer updates their card with Stripe, PayPal or Mollie) | Subscription back to `active`, counter cleared |
| Customer clicks **Renew Now** | Checkout for the same plan. The subscription is extended, the old gateway subscription is cancelled, and auto-renewal starts again on the new payment |
| A retry succeeds after the grace period ended | Subscription and license come back to `active`, so no payment is taken without access |

## Cancelling During Dunning

A customer can click **Cancel Auto-Renewal** on a past-due subscription to stop further retries. The subscription stays `past_due` until the grace period runs out, then expires. Because the customer chose to cancel, they get the neutral **Subscription Expired** email.

## Suspension

Dunning never suspends a license. The `suspended` status is used when a chargeback or dispute is opened on the order, and when you set a subscription to Suspended yourself. See [License Statuses](/licensedock/licenses/#statuses).

## Emails

| Email | Recipient | When |
|-------|-----------|------|
| Payment Failed | Customer | First failed renewal in a dunning cycle. Links to the Subscriptions page |
| Subscription Cancelled (Payment Failed) | Customer | Grace period ran out |
| Subscription Expired | Customer | Grace period ran out after the customer had cancelled auto-renewal |
| Subscription Expired | Admin | Grace period ran out |

Edit the wording in **Components → LicenseDock → Email Templates**. See [Email Templates](/licensedock/emails/).
