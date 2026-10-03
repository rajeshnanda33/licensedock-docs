# Leads

Every form submission is stored as a lead under **Components → DC Leads → Leads**, before any email is sent. A lead is kept even when its notification email fails.

## Statuses

| Status | Use for |
|--------|---------|
| New | Not handled yet. Every lead starts here, and the Dashboard counts these as **Still new** |
| Contacted | You have replied or called |
| Quoted | You have sent a quote |
| Won | The lead became a customer |
| Lost | The lead went elsewhere |
| Spam | Not a real enquiry. Submissions sent faster than the [spam timer](/dcleads/settings/spam#minimum-seconds-on-the-form) arrive here |

The buttons above the list show **All** and each status that has leads, with a count. Click one to filter.

Spam stays out of the way: **All**, the list, the **By campaign** card and the CSV export leave out leads with the status Spam. Click **Spam**, or set the Status filter to Spam, to see them. Searching `id:123` finds a lead whatever its status.

To change the status of several leads at once, select them and use **Mark as** in the toolbar. To change one, open it.

## Lead List

| Column | Shows |
|--------|-------|
| Status | The status badge. **Email not sent** appears when the notification email failed |
| Name | Name, with the email and phone as mailto and tel links. "(no name given)" when the form had no name |
| Message | The start of the message, and the form it came from |
| Source | The campaign, else the source tag, else the referring site. **Direct** when none was recorded |
| Assigned to | The admin user handling the lead |
| Received | Date and time |

When leads carry campaign tags, a **By campaign** card above the list shows the eight busiest campaigns with their lead count and how many were won. Click a campaign to filter by it.

### Filters

| Filter | Notes |
|--------|-------|
| Search | Name, email, phone or message. Enter `id:123` to find one lead by ID |
| Status | Any status. With no status chosen, spam is hidden |
| Form | The form the lead came from |
| Email sent or not | **Email not sent** lists leads whose notification failed |
| Campaign | Campaign names that have leads |
| Assigned to | An admin user |
| From / To | Received between two dates, in your own time zone |

Sort by **Newest first** (default), **Oldest first**, **Status**, **Campaign** or **Name**.

### Toolbar

| Button | What it does |
|--------|--------------|
| Mark as | Moves the selected leads to a status |
| Resend email | Sends the notification email again for the selected leads. Shown while **Email me new leads** is on |
| Export CSV | Downloads the leads the current filters match |
| Delete | Deletes the selected leads after a confirmation. There is no undo |
| Permissions | Joomla permissions for DC Leads |

## Lead Detail

Click a name to open the lead.

The left side shows:

- The name, the date received and whether the notification email went out
- **Reply by email**, **Call** and **WhatsApp** buttons. **Reply by email** opens your mail app with the subject "Your enquiry to [site name]". **WhatsApp** appears when the phone number is in international form (starts with `+` or `00`)
- Email, phone, subject and the answers to every other question, under their labels
- The message
- **Where it came from** – the form, landing page, campaign tags, click ID and referring page. See [Campaign Tracking](/dcleads/leads/tracking)

The right side holds the parts you can change:

| Field | Notes |
|-------|-------|
| Status | See [Statuses](#statuses) |
| Assigned to | Any Joomla user |
| Notes | Private notes. Only admins see them |

The submitted answers themselves cannot be edited. **Resend email** in the toolbar sends this lead's notification again.

## Export to CSV

**Export CSV** downloads every lead the current filters and search match, not only the current page. The file is named `leads-YYYY-MM-DD.csv`, is UTF-8 and opens directly in Excel.

| Column | Contents |
|--------|----------|
| `id` | Lead ID |
| `created` | Date and time received |
| `status` | `new`, `contacted`, `quoted`, `won`, `lost` or `spam` |
| `name`, `email`, `phone`, `subject`, `message` | The contact fields |
| `answers` | Every other answer as `Label: value`, separated by `; ` |
| `form` | The form title |
| `page` | Landing page |
| `referrer` | Referring page |
| `source`, `medium`, `campaign`, `term`, `content` | UTM tags |
| `gclid`, `gbraid`, `wbraid`, `fbclid` | Click IDs |
| `assigned` | Name of the assigned user |
| `notes` | Your notes |

Cells that a spreadsheet would run as a formula (starting with `=`, `+`, `-` or `@`) are prefixed with an apostrophe. Phone numbers in international form are left as they are.

## Permissions

DC Leads uses Joomla's standard actions, set under **Permissions** in the toolbar:

| Action | Allows |
|--------|--------|
| Access Administration Interface | Opening DC Leads |
| Create | New forms and **Duplicate** |
| Edit | Editing forms and leads, **Resend email** |
| Edit State | Publishing forms and **Mark as** |
| Delete | Deleting forms and leads |
| Options | The **Settings** screen |
| Configure ACL & Options | The **Permissions** button |
