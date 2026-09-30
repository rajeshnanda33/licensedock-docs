# Logs

The **Logs** group of the LicenseDock menu has four screens: Email, Webhook, Subscription Events and Downloads. CSV imports are logged on the Import screen.

## Email Log

**Logs → Email** lists every email LicenseDock has queued, customer and admin alike.

| Column | Notes |
|--------|-------|
| Recipient | The address, with an **Admin** badge on admin notifications |
| Type | The email template |
| Status | Queued, Sent or Failed |
| Tries | Send attempts so far (3 at most) |
| Queued / Sent | When it was queued and when it went out |

| Filter | Options |
|--------|---------|
| Status | Queued, Sent, Failed |
| Audience | Customer, Admin |
| Type | Any email template |

Click a row to see the email as it was sent: From, To, Reply-To, date, subject, the rendered body, and any attachments, which can be downloaded while the file still exists.

**Resend** in a row's action menu sends the stored email again straight away, exactly as it was rendered – it is not rebuilt from current data. If the send fails, the error is shown and the email stays queued for the next run. Resending an email that was already sent asks for confirmation first.

Sent and failed emails are deleted automatically after 90 days. The toolbar can delete selected rows sooner.

## Webhook Log

**Logs → Webhook** records every webhook received from Stripe, PayPal and Mollie.

| Status | Meaning |
|--------|---------|
| Processed | The webhook updated an order or subscription |
| Skipped | No action was needed |
| Failed | It could not be processed. The gateway retries it automatically |

Filter by status and gateway. Click a row for the event type, the gateway's event ID, the sender's IP address, the date and the full payload.

Store Health summarises webhook processing over the last 7 days and the last webhook received per gateway. See [Webhooks](/licensedock/gateways/webhooks) for setup.

## Subscription Events

**Logs → Subscription Events** is the history of every subscription: what happened, to which subscription and customer, who caused it, and when.

| Filter | Options |
|--------|---------|
| Event type | Created, Renewed, Plan Changed, Plan Change Scheduled, Plan Change Cancelled, Scheduled Change Applied, Auto-renewal Cancelled, Cancelled, Refunded, Dunning Failed, Suspended |
| Actor | User (the customer), Admin, System (LicenseDock itself, such as the scheduled tasks), Webhook (a gateway) |

## Download Log

**Logs → Downloads** shows what is being downloaded and what was refused. There is no delete button: refusals remove themselves after 90 days, and delivered downloads are cleared of personal data when a customer's Joomla account is deleted.

### Delivered Downloads

The default view is a summary by product, counting downloads per delivery channel:

| Channel | Meaning |
|---------|---------|
| Account | Downloaded from the customer account |
| Email link | Downloaded from the link in the receipt email |
| API | Served through the downloads API, for example by an updater |

**Customers** counts distinct people. Click a product to see its versions, then a version to see the individual downloads. The **View** filter switches straight to the list of individual downloads, newest first.

### Refused Downloads

Set the **Outcome** filter to **Refused** to see downloads the API turned down, grouped by license and reason, with the number of tries and the most recent IP address. Refusals are kept for 90 days.

| Reason | Meaning |
|--------|---------|
| No identifier sent | The product needs an activated identifier and the request had none |
| Identifier not activated | The identifier sent is not activated on the license |
| License key invalid or inactive | The key does not exist or is not active |
| License expired | The license has expired |
| Key belongs to another product | The key is for a different product |
| Account download only | The product is set to deliver from the customer account only |

Filter by channel or reason, and search by product, customer, license key, identifier, file name, version or IP address. See [Downloads API](/licensedock/api/downloads) for the error codes behind these reasons.

## Import Log

The **Import** screen lists the 10 most recent imports: when, who ran it, which entity, the mode, the file name, and how many rows were created, updated, skipped and failed. See [Imports](/licensedock/admin/imports).

## Joomla Log Files

Errors and warnings are also written to `com_licensedock.php` in Joomla's log folder. Emails that fail permanently are recorded in `com_licensedock_email_failures.php`.
