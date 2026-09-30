# Emails

LicenseDock ships 36 email templates: 23 for customers and 13 for store admins. Each one can be edited, previewed and reset to its default.

## How Sending Works

Every email is written to the email queue first, fully rendered, and then sent.

- **Sent straight away** – emails the customer is waiting for, and urgent admin alerts, are sent the moment they are queued. If that attempt fails, the email stays queued for the next run.
- **Sent by the scheduled task** – everything else waits for the **LicenseDock - Process Email Queue** task, which sends up to 50 emails per run. See [Scheduled Tasks](/licensedock/admin/scheduled-tasks).

| Sent straight away | |
|--------------------|---|
| Customer | `purchase_confirmation`, `account_activation`, `welcome`, `subscription_cancelled`, `subscription_resumed`, `plan_change_confirmed`, `plan_change_scheduled`, `plan_change_cancelled` |
| Admin | `admin_new_order`, `admin_renewal`, `admin_payment_failed`, `admin_dispute_opened`, `admin_gateway_error`, `admin_mollie_loyalty_patch_failed` |

Retries and failures:

- A failed send is retried on later runs, up to 3 attempts in total
- After the last attempt the email is marked **Failed**, and a plain-text alert goes to the admin addresses
- An email stuck in the sending state for more than 15 minutes is put back in the queue
- Only one queue run works at a time, so overlapping cron runs cannot send the same email twice
- With **Custom SMTP** selected and no SMTP host, the queue is paused and the task reports a failed run until the host is set

Sent and failed emails are deleted from the queue after 90 days.

## Customer Emails

| Template | Title in admin | Sent when |
|----------|----------------|-----------|
| `purchase_confirmation` | Purchase Confirmation | An order is paid. Includes license keys, download links (with the Email + Account delivery method), the consents the buyer accepted, and the invoice PDF as an attachment |
| `account_activation` | Set Your Password | A customer account needs a password and no receipt carries the link – for example an account created by an admin or by the importer, or an admin clicks **Resend activation email** |
| `welcome` | Welcome | The customer sets a password and activates the account |
| `abandoned_recovery` | Abandoned Checkout Reminder | A checkout was started but not paid. Sent on the configured intervals |
| `renewal_receipt` | Renewal Receipt | A subscription auto-renewal charge succeeds. The renewal invoice PDF is attached |
| `payment_failed` | Payment Failed | A renewal charge or a checkout payment fails |
| `dunning_cancelled` | Subscription Cancelled (Payment Failed) | The dunning grace period runs out and the subscription is cancelled |
| `expiration_notice` | Subscription Expired | A subscription expires without renewal. Also sent in place of `dunning_cancelled` when the customer had already cancelled |
| `subscription_cancelled` | Subscription Cancelled | A subscription's auto-renewal is cancelled |
| `subscription_resumed` | Subscription Resumed | A cancelled subscription's auto-renewal is turned back on |
| `trial_ending` | Trial Ending Reminder | 3 days before a trial converts to a paid subscription |
| `trial_cancellation_reminder` | Trial Winback | The configured number of days after a trial is cancelled |
| `renewal_reminder_1` | Renewal Reminder - First | First pre-expiry reminder |
| `renewal_reminder_2` | Renewal Reminder - Second | Second pre-expiry reminder |
| `renewal_reminder_3` | Renewal Reminder - Final | Last pre-expiry reminder |
| `grace_period_reminder_1` | Grace Reminder - First | First reminder after expiry, while the renewal discount still applies |
| `grace_period_reminder_2` | Grace Reminder - Final | Final reminder before the renewal discount window closes |
| `plan_change_confirmed` | Plan Change Confirmed | An immediate plan change is processed |
| `plan_change_scheduled` | Plan Change Scheduled | A plan change is set to apply at the next renewal |
| `plan_change_applied` | Scheduled Plan Change Applied | A scheduled plan change takes effect at renewal |
| `plan_change_cancelled` | Scheduled Plan Change Cancelled | The customer cancels a pending plan change |
| `refund_confirmation` | Refund Issued | A full refund is processed. The credit note PDF is attached |
| `partial_refund_confirmation` | Partial Refund Issued | A partial refund is processed. The credit note PDF is attached |

The timing of reminders, winback, expiry notice and abandoned checkout emails is set on the **Automation** tab of Settings. Leaving a days field blank switches that email off. See [Configuration](/licensedock/getting-started/configuration#automation-tab).

## Admin Emails

Admin emails go to every address in **Settings → Emails → Admin Notifications → Admin Emails**, one queue entry per address. When that list is empty they go to the From Email.

| Template | Title in admin | Sent when |
|----------|----------------|-----------|
| `admin_new_order` | New Order | A customer completes a new order |
| `admin_renewal` | Subscription Renewed | A subscription auto-renewal succeeds |
| `admin_payment_failed` | Payment Failed | A payment fails |
| `admin_refund` | Refund Issued | A full or partial refund is processed |
| `admin_expired` | Subscription Expired | A subscription expires, or is cancelled after dunning |
| `admin_subscription_cancelled` | Subscription Cancelled | A subscription's auto-renewal is cancelled |
| `admin_subscription_resumed` | Subscription Resumed | A cancelled subscription is resumed |
| `admin_plan_change` | Plan Change | A customer changes, schedules or cancels a plan change |
| `admin_dispute_opened` | Chargeback / Dispute Opened | A gateway reports a new dispute |
| `admin_dispute_resolved` | Chargeback / Dispute Resolved | A dispute is won or lost |
| `admin_gateway_error` | Gateway Action Failed | A refund or cancel call to a gateway fails – including a subscription LicenseDock could not cancel at the gateway after its Joomla user was deleted |
| `admin_mollie_loyalty_patch_failed` | Mollie Loyalty Rate Not Applied | The loyalty rate could not be applied to a Mollie subscription |
| `admin_attention` | Action Needed | An event needs manual review – for example a coupon that passed its usage limits while two checkouts completed at once |

## Editing Templates

Go to **Components → LicenseDock → Email Templates**. Filter the list by **Category** (Order, Account, Subscription, Reminder, Plan Change, Admin) or **Language**, and click a template to edit it.

The edit screen has:

- **Subject**
- **Body** – HTML, with a rendered preview and an **Edit** toggle for the source
- **Variables for this template** – the placeholders this email supports
- **Auto-rendered blocks** – blocks such as `{license_section}` or `{downloads_section}` that LicenseDock builds and includes only when they apply. Each has a **Sample output**
- **Available in every template** – `{signature}`, `{store_name}`, `{store_url}`, `{store_email}`, `{logo_url}`

A template you have not changed shows **Using default**, and component updates refresh it when a new default ships. Once you edit it, it shows **Customized** and updates leave it alone. **Reset to default** restores the shipped version.

Placeholder values are HTML-escaped, apart from the blocks LicenseDock builds itself, so text a buyer typed at checkout cannot inject markup into an email.

## Languages

Customer emails go out in the language the buyer used at checkout. Admin emails use the store's default site language.

The **Default** templates are English and are used for any language without its own version. German ships with its own full set. Switch the **Language** filter to see the templates for a language; a template marked **Not translated** falls back to Default.

## Branding

Every email is wrapped in a shared layout with your logo, store name and a footer address. The footer uses **Footer address** from the Emails tab, or the Store Address when that is empty. The signature is edited once on the Emails tab and inserted wherever a template has `{signature}`.

## Sender and SMTP

Sender identity, the mail handler and SMTP credentials are on the **Emails** tab of Settings. See [Configuration](/licensedock/getting-started/configuration#emails-tab).

## Email Log

Every queued email appears under **Logs → Email** with its status, attempts and the exact message that was sent, and can be resent from there. See [Logs](/licensedock/admin/logs#email-log).
