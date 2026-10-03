# Dashboard

**Components → DC Leads → Dashboard** is the component's start page. It shows lead counts, a health check of your setup and the latest leads.

## Lead Counts

| Tile | Counts | Opens |
|------|--------|-------|
| Leads today | Leads received since midnight | Leads from today |
| Last 7 days | Leads received in the last 7 days | Leads from that date on |
| Last 30 days | Leads received in the last 30 days | Leads from that date on |
| Still new | Leads with the status **New**, of any age | Leads filtered to New |

Days follow your own time zone. Leads with the status Spam are left out, so each tile matches the list it opens. **Still new** turns red while it is above zero.

## Is Everything Working?

Every check is run each time the Dashboard opens. Checks that need a look are listed first, each with a button to the screen that fixes it. Passed checks are folded into "[n] other checks passed" below them.

| Check | Fine | Needs attention | Broken | Fix link |
|-------|------|-----------------|--------|----------|
| How mail is sent | Mail goes through SMTP | Mail goes through PHP mail or sendmail, which often lands in spam | **Send Mail** is off in Global Configuration | Open Global Configuration |
| From address | The sender address is shown | The sender is not on your site's domain or the Global Configuration sender's domain, so inboxes may treat it as spam | The sender is not a valid email address | Open Settings when **From email** is set in DC Leads, else Open Global Configuration |
| Who is told about new leads | Lists the addresses lead emails go to | **Email me new leads** is off. Leads are still stored | No valid address to send lead emails to | Open Settings |
| Delivery in the last 30 days | Every lead email went out | – | Shows how many lead emails were not sent | Show these leads |
| Spam protection | A captcha and the honeypot are on | Only the honeypot is on. Add a captcha if spam gets through | – | Open Settings |
| Campaign tracking | The DC Leads system plugin is on | – | The plugin is off. Leads will not record the ad, and saving Permissions resets Settings | Open the plugin |
| Forms on the site | At least one published DC Leads module or menu item | No form is on the site yet | – | Add a module |
| License and updates | Shows the license status and expiry date | No license key entered. Forms keep working | The key is expired, over its site limit, for another product or not recognised. Forms keep working | Open Settings |

**Delivery in the last 30 days** is shown only while **Email me new leads** is on, and does not count leads with the status Spam. **Show these leads** opens the lead list filtered to **Email not sent**, where you can select them and click **Resend email**.

The license check asks the store again at most once a day, or straight away after the key changes.

## Latest Leads

The five most recent leads, not counting spam, with their status, form and how long ago they arrived. A lead whose notification email failed shows **Email not sent**. **View all** opens the full lead list.
