# Renewals & Reminders

There are two ways a subscription renews:

| Type | Applies to | How |
|------|-----------|-----|
| Automatic | Recurring plans with auto-renewal on | The gateway charges the saved payment method. LicenseDock records the payment from the webhook, extends the subscription and license, issues an invoice and sends **Renewal Receipt** |
| Manual | One-time purchases with an access period, recurring subscriptions with auto-renewal turned off, expired or cancelled subscriptions, and past-due subscriptions | The customer clicks **Renew** in the portal (or the link in a reminder email) and pays through checkout |

Lifetime purchases never expire, so they have nothing to renew.

## Manual Renewal

**Renew** on the portal's Subscriptions page puts the customer's current plan into checkout. After payment:

- the **same** subscription is extended; no second subscription or license is created
- if the subscription had time left, the new period starts at the current expiry, so no paid time is lost; if it had expired, the new period starts at payment
- the license returns to `active` with the new expiry, and its activation limit and type are reset to the plan's
- a recurring plan goes back on auto-renewal with a new gateway subscription, and any old gateway subscription is cancelled
- any scheduled plan change is dropped
- the event log records **Renewed**

| Situation | Renew behaviour |
|-----------|-----------------|
| Auto-renewal cancelled, paid period not over | The card shows **Resume subscription**, which turns auto-renewal back on with nothing charged today |
| The customer's plan or price has been unpublished | Renew opens the product page so the customer picks a current plan. The renewal discount is worked out against that plan |
| The whole product has been unpublished | "This product is no longer offered. Please contact us about alternatives." |
| An expired trial that was never paid | The button reads **Buy Now** and charges the full price |

## Renewal Discount

Set per product on **Products → Edit → Details → Renewal Discount**:

| Field | Default | Notes |
|-------|---------|-------|
| Renewal Discount (%) | 0 | "Discount applied at every renewal. Lost if the customer renews past the grace period." 0–100 |
| Grace Period (days) | 1 | "Days after expiry the renewal discount still applies. 0 disables grace." |
| Lapsed Discount (%) | 0 | "Discount for customers who renew after the grace period. 0 = full price." 0–100 |

### Auto-renewing subscriptions

When a product has a renewal discount, a new recurring purchase pays the full price for the first cycle and the discounted price for every renewal after that. LicenseDock sets this up with the gateway at checkout. The discount is locked in with the order: adding or raising a renewal discount later does not lower the price of existing auto-renewing subscriptions.

The discount carries over through [plan changes](/licensedock/subscriptions/plan-changes).

### Manual renewals

The discount at checkout depends on where the subscription is in its life:

| Subscription | Discount applied |
|--------------|------------------|
| Active, or auto-renewal cancelled with time left | Renewal Discount |
| Expired, within the grace period | Renewal Discount |
| Expired, past the grace period | Lapsed Discount |
| Expired, product has no renewal discount | Lapsed Discount |
| Expired trial that was never paid | None |

A recurring plan renewed this way keeps renewing at the Renewal Discount rate. A lapsed renewal charges the lapsed price once, then recurs at the renewal rate.

The portal's Subscriptions page shows the relevant prices on each card: "Renew before expiry" and "After expiry" while the subscription is active, "Renew now", "Discount expires" and "After that" during the grace period.

## Reminder Emails

**Components → LicenseDock → Settings → Automation → Reminder Emails**. Leave any days field blank to disable that email.

| Group | Field | Default | Template |
|-------|-------|---------|----------|
| Before expiry | First | 30 days before | Renewal Reminder - First |
| | Second | 14 days before | Renewal Reminder - Second |
| | Final | 3 days before | Renewal Reminder - Final |
| Expiry day | Send notice | Yes | Subscription Expired |
| After expiry (grace period) | First | 7 | Grace Reminder - First |
| | Final | 3 | Grace Reminder - Final |
| After trial cancellation | Winback | 7 days after | Trial Winback |

Each field has a **View template** link to the email it sends. The **Trial Ending Reminder** has no setting: it goes out 3 days before a trial ends.

### Who gets them

Reminders are sent by the **LicenseDock - Reminders & Expiration** scheduled task (see [Subscriptions](/licensedock/subscriptions/#the-reminders-expiration-task)).

| Email | Sent to |
|-------|---------|
| Renewal reminders | Subscriptions that won't renew automatically (auto-renewal off, one-time with an access period, manual recurring) and haven't expired yet. Auto-renewing gateway subscriptions are skipped, because they're charged automatically |
| Subscription Expired | Every subscription the task expires, when **Send notice** is Yes |
| Grace reminders | Expired subscriptions still inside the grace period, only when the Renewal Discount is above zero and higher than the Lapsed Discount |
| Trial Ending Reminder | Trials ending in 3 days |
| Trial Winback | Customers who cancelled during a trial, the set number of days after they cancelled |

Grace reminder days are counted back from the end of the grace period: with a 14-day grace period, **First = 7** sends on day 7 after expiry and **Final = 3** on day 11. A reminder whose days value is not smaller than the product's grace period is skipped.

Reminders are also skipped when the renewal would cost nothing. Reminders and the expiry notice are both skipped when:

- the product has been unpublished
- the customer's plan has been retired and the product has no current paid plan to move to

The subscription still expires on time in those cases; only the email is left out.

Each reminder is sent once per renewal period. The counters reset when the subscription renews, and a task that was paused for a while sends at most one reminder per run for each subscription.

## Account Dashboard Notice

The portal's **Account** dashboard shows "Your [product] subscription expires on [date]." with a **Renew now** link for every subscription that won't renew automatically and expires within 30 days.
