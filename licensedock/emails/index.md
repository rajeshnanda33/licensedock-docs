# Email Templates

LicenseDock sends transactional emails for every customer-facing event in the order, subscription, and license lifecycle, plus a parallel set of admin notifications.

## How Email Sending Works

1. An event happens (order completed, subscription renewed, refund issued)
2. LicenseDock queues an email row in `#__licensedock_email_queue`
3. The **LicenseDock – Process Email Queue** scheduled task (run every 5 minutes) picks up queued emails and sends them
4. Failed sends retry up to 3 times. Permanent failures notify the admin
5. Stale emails stuck in the `sending` state for more than 5 minutes are reset to `queued`

This means checkout never blocks on the mailer, and a transient SMTP outage doesn't lose emails.

## Customer Emails

| Template | Trigger |
|----------|---------|
| `purchase_confirmation` | Initial order paid. Includes license keys and download links |
| `welcome` | New Joomla user account auto-created from a guest checkout |
| `account_activation` | Activation link for the auto-created account (set password) |
| `license_delivery` | License keys for products that don't bundle them in the receipt |
| `abandoned_recovery` | Reaches out to a customer who left checkout. Sent on the configured intervals |
| `trial_ending` | A trial is about to convert to a paid subscription |
| `renewal_reminder_1` | First renewal reminder before subscription renews |
| `renewal_reminder_2` | Second renewal reminder closer to the renewal date |
| `payment_failed` | A subscription renewal payment failed |
| `expiration_notice` | Subscription has expired |
| `subscription_cancelled` | Customer cancelled auto-renewal |
| `plan_change_confirmed` | Plan change applied immediately |
| `plan_change_scheduled` | Plan change scheduled for the next renewal |
| `plan_change_applied` | Scheduled plan change has just kicked in |
| `plan_change_cancelled` | Pending plan change was cancelled |
| `refund_confirmation` | Full refund processed |
| `partial_refund_confirmation` | Partial refund processed |

## Admin Emails

Sent to the store admin email for awareness. Each can be enabled or disabled per template.

| Template | Trigger |
|----------|---------|
| `admin_new_order` | Order completed |
| `admin_renewal` | Subscription renewed |
| `admin_payment_failed` | Renewal payment failed |
| `admin_refund` | Refund processed |
| `admin_expired` | Subscription expired |
| `admin_subscription_cancelled` | Customer cancelled auto-renewal |
| `admin_plan_change` | Any plan change activity (confirmed / scheduled / cancelled / applied) |
| `admin_dispute_opened` | Chargeback / dispute opened |
| `admin_dispute_resolved` | Dispute resolved |
| `admin_gateway_error` | Gateway API call failed |

## Editing Templates

**Components → LicenseDock → Settings → Email Templates**.

Each template has:

- **Subject** – the email subject line
- **Body** – HTML body
- **Reset to default** – restore the shipped default
- **Preview** – render with sample data

Templates support placeholder variables. Common variables include `{customer_name}`, `{store_name}`, `{store_url}`, `{logo_url}`, `{order_number}`, `{product}`, `{plan}`, `{order_total}`, `{license_section}`, `{downloads_section}`, `{account_link}`, `{renewal_link}`, `{recovery_link}`, `{subscription_end}`, `{trial_end}`, `{regular_price}`, `{billing_cycle}`, `{new_plan}`, `{current_plan}`, `{proration_net}`, `{next_renewal}`, `{access_end_date}`, `{refund_amount}`, `{total_refunded}`, `{activation_link}`, `{activation_ttl_days}`.

The exact variables available depend on the template – use the **Preview** button to see what's substituted.

## Email Settings

Configure the sender and SMTP details under **Settings → Email**:

| Setting | Notes |
|---------|-------|
| Mode | `joomla` (Joomla Global mailer) or `custom` (LicenseDock SMTP) |
| Host, Port, Encryption, Username, Password | Required when Mode is `custom`. Password is encrypted at rest |
| From Name / From Email | Sender identity |
| Reply-To Name / Reply-To | Optional reply-to header |
| Email Signature | HTML appended to every email body |
| Test Email | Send a test message to confirm delivery |

## Email Log

Every queued email is recorded in **Components → LicenseDock → Email Logs** with:

- Recipient, subject, body, attachments
- Status (`queued`, `sending`, `sent`, `failed`)
- Attempt count, error message
- Scheduled time, send time

Use the log to debug deliverability or to confirm a customer received a specific message.
