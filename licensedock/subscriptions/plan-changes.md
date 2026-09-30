# Plan Changes

Customers move between plans of the same product from the **Subscriptions** page of the [Customer Portal](/licensedock/portal/#subscriptions). An upgrade can take effect now with a prorated charge, or at the next renewal. A downgrade always waits for the next renewal.

## Who Can Change Plan

The **Change Plan** button appears when all of these hold:

| Condition | Message if a request fails it |
|-----------|-------------------------------|
| The subscription is auto-renewing and `active` | "Plan change is only available for active subscriptions." |
| It is out of its trial | "Plan changes aren't available during the trial period. Your trial ends on …" |
| The new plan belongs to the same product | "You can only change to a plan within the same product." |
| The new plan has the same billing cycle | "You can only change to a plan with the same billing cycle (e.g. monthly to monthly)." |
| Neither price is one-time | "One-time plans cannot be switched." |
| The new plan and its price are published | "The selected plan could not be found." |
| No change is already scheduled | "This subscription already has a scheduled plan change." |
| No other change is still being processed | "A plan change for this subscription is already in progress. …" |

The dialog only lists plans that pass these checks, and the server checks them again on submit. Plan changes work with Stripe, PayPal and Mollie subscriptions.

::: info
Switching billing cycle (for example monthly to annual) is not available in 1.9.3. A customer who wants a different cycle can cancel auto-renewal and buy the other plan when the current period ends.
:::

## The Dialog

**Change Your Plan** asks for:

| Field | Options |
|-------|---------|
| Choose a new plan | Eligible plans with their price |
| When should the change take effect? | **Change now** – "You'll be charged a prorated amount for the remainder of this billing period." **Change at next renewal** – "No charge today. Your new plan takes effect on your next renewal date." |

For **Change now**, the dialog previews:

| Line | Meaning |
|------|---------|
| Credit for unused time on current plan | What the customer paid this cycle, times the unused fraction |
| Charge for new plan (remaining days) | The new plan's price, times the unused fraction |
| Total today | Charge minus credit, including tax at the subscription's original rate |

**Confirm Change** submits.

## Proration

```
unused fraction = time until next payment ÷ length of the current cycle
credit          = amount paid this cycle × unused fraction
charge          = new plan price × unused fraction
total today     = charge − credit (plus tax)
```

- Time is measured in seconds between the last payment and the next payment date, using actual calendar days.
- "Amount paid this cycle" is what the customer actually paid: payments minus refunds since the cycle started. Coupons, renewal discounts and earlier plan changes in the same cycle are all reflected.
- If the customer has earned a [renewal discount](/licensedock/subscriptions/renewals#renewal-discount), it carries over: the new plan renews at the same percentage off. In the first cycle of a discounted subscription, the charge uses the new plan's full price, matching how a new buyer pays the first cycle in full.

## Downgrades

A change whose total today would be negative is a downgrade. Downgrades never refund money. They are always scheduled for the next renewal, whatever the customer picked:

- the dialog removes **Change now**
- it shows "Takes effect at your next renewal on [date]. No charge or refund today."
- the customer keeps the current plan until the paid period ends

## Change Now

| Gateway | How it runs |
|---------|-------------|
| Stripe | The prorated amount is charged as its own invoice first. If that charge fails, the subscription is left unchanged. The plan then switches at Stripe with no proration of Stripe's own |
| Mollie | A one-off payment is created for the prorated amount. The customer sees "Your payment is processing. Your plan will update in a few moments – we'll email you once it's confirmed." The plan switches when Mollie confirms the payment. If the payment fails, the plan stays as it was |
| PayPal | The customer is sent to PayPal twice: once to pay the prorated amount, once to approve the revised subscription. If they abandon the approval, the payment is released or refunded automatically |

When the change applies:

- the subscription moves to the new plan and the gateway bills the new amount from the next renewal
- the license's activation limit and type change to the new plan's
- a proration invoice is issued for the amount charged
- the customer gets **Plan Change Confirmed**, and the admin gets **Plan Change**
- the event log records **Plan Changed** with the proration amount

## Change at Next Renewal

Nothing is charged. The gateway is updated to bill the new amount at the next renewal; PayPal asks the customer to approve that once. The card shows the pending plan and its date, with a **Cancel scheduled change** button.

At the next successful renewal, the new plan applies: plan, price and license limits switch, and the customer gets **Scheduled Plan Change Applied**. If the scheduled plan has been deleted by then, the renewal completes on the current plan.

| Action | Result |
|--------|--------|
| **Cancel scheduled change** | Gateway set back to the current plan (PayPal asks for approval), **Scheduled Plan Change Cancelled** email sent |
| Customer cancels auto-renewal | The scheduled change is dropped |
| Customer renews through checkout | The scheduled change is dropped |

## Emails and Events

| Email | Sent when |
|-------|-----------|
| Plan Change Confirmed | An immediate change is applied |
| Plan Change Scheduled | A change is queued for the next renewal |
| Scheduled Plan Change Applied | A scheduled change takes effect |
| Scheduled Plan Change Cancelled | The customer withdraws a scheduled change |
| Plan Change (admin) | Any of the above |

Event log entries: **Plan Changed**, **Plan Change Scheduled**, **Plan Change Cancelled**, **Scheduled Change Applied**. See [Subscription Event Log](/licensedock/subscriptions/#subscription-event-log).

Plan changes are made by the customer. There is no admin action to change a subscription's plan; to give one customer more activations, use **Change limit** on the license instead. See [Activations](/licensedock/licenses/activations#managing-activations-in-admin).
