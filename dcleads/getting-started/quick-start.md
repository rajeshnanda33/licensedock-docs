# Quick Start

This walks you from a fresh install to your first test lead.

## 1. Check the Starter Forms

Go to **Components → DC Leads → Forms**. Three published forms are ready:

| Form | Fields | Button |
|------|--------|--------|
| Contact | Name (required), email and phone side by side, message (required) | Send |
| Request a quote | Name (required), phone and email, a **What do you need?** subject list (required), a **Budget** dropdown, message | Get my quote |
| Call me back | Name and phone (both required), a **Best time to call** dropdown | Call me back |

Edit any of them, or click **New** to build your own. See [Building a Form](/dcleads/forms/).

## 2. Set Who Gets New Lead Emails

Go to **Components → DC Leads → Settings → Email**. Enter your address in **Send to** and click **Send test email**. If the test does not arrive, see [Troubleshooting](/dcleads/troubleshooting#emails-not-arriving).

## 3. Put the Form on a Page

Either:

- **Module** – **Content → Site Modules → New → DC Leads - Form**. Pick the form, choose a position and menu assignment, and save.
- **Menu item** – **Menus → [your menu] → New**, type **DC Leads → Form**. Pick the form and save.

See [Placing a Form](/dcleads/forms/placing) for every option.

## 4. Send a Test Lead

Open the page on the site, fill in the form and send it. The thank-you message replaces the form.

Take a few seconds over it. A form sent faster than **Minimum seconds on the form** (3 by default) is saved with the status **Spam** – see [Spam Protection](/dcleads/settings/spam).

## 5. See the Lead

Go to **Components → DC Leads → Leads**. The lead is at the top with the status **New**, and the notification email is in your inbox.

To test campaign tracking, open the page in a private window with tags on the URL, for example `?utm_source=test&utm_campaign=launch`, and send the form again. The lead shows **launch** in the Source column. See [Campaign Tracking](/dcleads/leads/tracking).

## 6. Check the Dashboard

**Components → DC Leads → Dashboard** runs the health checks. Fix anything marked as needing attention. See [Dashboard](/dcleads/admin/dashboard).
