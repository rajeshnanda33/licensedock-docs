# Scheduled Tasks

LicenseDock's background work runs through Joomla's Task Scheduler, using the **LicenseDock - Scheduled Tasks** plugin (`plg_task_licensedock`). The plugin adds three task types. None of them run until you create them.

## The Tasks

| Task | Execution Rule | Value |
|------|----------------|-------|
| LicenseDock - Process Email Queue | Interval, Minutes | 5 |
| LicenseDock - Reminders & Expiration | Interval, Hours | 1 |
| LicenseDock - Abandoned Checkout Recovery | Interval, Minutes | 15 |

These are the recommended intervals. Store Health warns when the email queue task has not run for 15 minutes, or either of the other two for 120 minutes.

### Process Email Queue

Sends queued emails, up to 50 per run. Failed sends are retried on later runs, up to 3 attempts per email. See [Emails](/licensedock/emails/#how-sending-works).

The run is reported as failed in **System → Scheduled Tasks** when the mailer cannot start (for example Custom SMTP with no host), when every email in the batch fails, or when at least as many fail as succeed.

### Reminders & Expiration

Handles everything that depends on dates. Each run works through these steps:

| Step | What it does |
|------|--------------|
| Renewal reminders | Sends `renewal_reminder_1`, `_2` and `_3` on the days set under **Settings → Automation**. Auto-renewing subscriptions are skipped |
| Trial ending | Sends `trial_ending` 3 days before a trial converts |
| Trial winback | Sends `trial_cancellation_reminder` the set number of days after a trial is cancelled |
| Expiry | Marks subscriptions past their end date as expired, then sends `expiration_notice` (if enabled) and `admin_expired` |
| Grace reminders | Sends `grace_period_reminder_1` and `_2` while an expired subscription can still renew at the renewal discount |
| Dunning | Cancels past-due subscriptions whose failed payments have outlasted the **Dunning grace period**, then sends `dunning_cancelled` and `admin_expired` |
| Cancelled trials | Moves cancelled trials whose trial period has ended to expired |
| Plan change cleanup | Clears PayPal plan changes the customer started but never approved, and settles paid plan-change charges whose webhook never arrived by asking the gateway (after 30 minutes) |
| Mollie loyalty rate | Re-applies the loyalty price to Mollie subscriptions still billing the first-cycle amount. Sends `admin_mollie_loyalty_patch_failed` if it cannot |
| Stripe pricing check | Flags Stripe subscriptions whose gateway price differs from LicenseDock's records. It changes nothing; results appear in Store Health under **Gateway pricing matches** |
| Housekeeping | Deletes rejected activation attempts, refused downloads, and sent or failed emails older than 90 days |

Each step runs on its own. If one throws an error, the rest still run, the error is written to `com_licensedock.php` in Joomla's log folder, and the run is reported as failed. Every step is safe to repeat, so the next run picks up whatever was missed.

### Abandoned Checkout Recovery

Emails customers who started checkout but did not pay, with a link that restores their checkout. It follows **Intervals (hours)** and **Max Attempts** under **Settings → Automation**, handles up to 100 orders per run, and does nothing while **Enabled** is set to No.

## Creating the Tasks

1. Go to **System → Scheduled Tasks → New**
2. Pick the task type, for example **LicenseDock - Process Email Queue**
3. Set the Execution Rule and value from the table above
4. Save, and repeat for the other two

The **Automation** tab of LicenseDock Settings shows the same table and links to the Scheduled Tasks screen.

## Running the Scheduler

Joomla needs something to trigger the scheduler. Pick one.

### Web Cron

Works on any host with a cron manager, including cPanel and Plesk.

1. Go to **System → Manage → Scheduled Tasks** and click **Options** in the toolbar
2. On the **Web Cron** tab, set **Web Cron** to Enabled and save
3. Copy the **Webcron Link (Base)** URL
4. In your hosting cron manager, add a job that runs every 5 minutes (`*/5 * * * *`):

```bash
curl -s --max-time 60 "PASTE_YOUR_WEB_CRON_URL_HERE" > /dev/null 2>&1
```

Replace `PASTE_YOUR_WEB_CRON_URL_HERE` with the URL from step 3.

### CLI Cron

For servers with SSH access. Run `crontab -e` and add, with your site's path:

```bash
*/5 * * * * cd /path/to/joomla && php cli/joomla.php scheduler:run > /dev/null 2>&1
```

The Automation tab shows this line with your site path already filled in.

### Lazy Scheduler

Joomla's Lazy Scheduler runs tasks when visitors load pages. It is on by default (check under **System → Manage → Scheduled Tasks → Options → Lazy Scheduler**). On a quiet site, emails can be delayed by hours, so use web cron or CLI cron in production.

## Checking the Tasks

- **System → Scheduled Tasks** shows each task's last run and whether it succeeded
- **Store Health → Scheduled Tasks** checks that each task exists, is enabled and has run recently – see [Dashboard & Store Health](/licensedock/admin/dashboard#store-health)
- **Logs → Email** shows emails sitting in the Queued state if the queue task is not running
