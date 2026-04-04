# Email Templates

LicenseDock sends automated emails for key events in the order lifecycle.

## Email Types

| Email | When it's sent | What it contains |
|-------|---------------|-----------------|
| **Order Confirmation** | Payment completed | Order details, product/plan info |
| **License Details** | Payment completed | License key, activation instructions |
| **Renewal Reminder** | Before subscription renewal | Upcoming renewal date, amount |
| **Renewal Confirmation** | Subscription renewed | Payment confirmation, new expiry date |
| **Refund Notification** | Full refund processed | Refund details |

## Email Settings

Configure your email delivery in **Components → LicenseDock → Settings → Email**.

You'll need your email provider's SMTP details (your email hosting provider can give you these):

| Setting | Description |
|---------|-------------|
| **SMTP Host** | Your mail server address |
| **SMTP Port** | Server port (usually 587) |
| **SMTP Username** | Your email login |
| **SMTP Password** | Your email password (stored securely) |
| **From Email** | The email address customers see |
| **From Name** | The name customers see (e.g., your company name) |

## Background Sending

Emails are sent automatically in the background so they don't slow down checkout. Make sure the **LicenseDock Task Plugin** is enabled and Joomla's **Scheduled Tasks** are running.
