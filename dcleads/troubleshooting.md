# Troubleshooting

Start with **Components → DC Leads → Dashboard**. Its health checks cover most setup problems and link to the fix – see [Dashboard](/dcleads/admin/dashboard).

## Emails Not Arriving

Leads are stored before any email is sent, so a mail problem never loses a lead. Check the lead list first – if the lead is there with **Email not sent**, the mail server refused the message.

1. Go to **Settings → Email** and click **Send test email**. The message shows the mail server's error if the send fails.
2. If the test is sent but never arrives, check the spam folder.
3. Switch Joomla to SMTP under **System → Global Configuration → Server**. PHP mail and sendmail often land in spam.
4. Use a **From email** on your own domain, covered by its SPF record. The Dashboard warns when the sender is on another domain.
5. Once mail works, filter the lead list by **Email not sent**, select the leads and click **Resend email**.

If **Send to** is empty, lead emails go to the **From Email** in Global Configuration.

## Auto-reply Not Sent

An auto-reply is skipped when:

- **Send auto-reply** is off
- The visitor gave no email address
- The same address had an auto-reply in the last 24 hours – common when you test with your own address
- The submission was sent faster than **Minimum seconds on the form** and is stored as Spam
- The answers look like link spam

See [Auto-reply](/dcleads/settings/email#auto-reply).

## Real Leads Marked as Spam

A lead lands in **Spam** when it was sent faster than **Minimum seconds on the form**. You still get the email, with `[Possible spam]` in the subject. Open the lead and set the status to **New**.

If this happens often – for example when visitors autofill short forms – lower the setting, or set it to `0` to turn the timer off. See [Spam Protection](/dcleads/settings/spam).

## "We already have several messages from you"

One IP address can send 30 submissions an hour. If many visitors share one address – a site behind Cloudflare or another proxy – turn on **Behind Load Balancer** under **System → Global Configuration → Server**, so Joomla sees each visitor's own address.

## Page Caching

DC Leads forms work with Joomla's caching, including the **System - Page Cache** plugin:

- **Session token** – a cached page holds an old form token. When the form is sent, the server answers with a fresh token and the form sends again once, on its own. The visitor sees nothing.
- **Spam timer** – on a cached page, the form script starts the timer on the visitor's first scroll, tap, key press or mouse move.
- **Campaign tracking** – the tracking plugin runs before a cached page is served, so tags and landing pages are still recorded.
- **Errors without JavaScript** – after a failed plain post, Joomla's conservative or progressive caching is turned off for the page that shows the errors, so the visitor sees their errors and values.

## "Please complete the check above the button" After Solving the Captcha

The **System - Page Cache** plugin can cache the captcha challenge that the Proof of Work captcha fetches, so every visitor gets the same stored challenge and a solved captcha is refused. From DC Leads 1.1.0 the tracking plugin keeps captcha requests out of the page cache. On 1.0.0, open **System → Plugins → System - Page Cache** and add this line to **Exclude URLs**:

```
option=com_ajax
```

Then clear the cache under **System → Clear Cache**.

Saving DC Leads Settings clears Joomla's system cache.

## "The security token did not match"

The visitor's session expired while the page was open. With JavaScript, the form gets a fresh token and sends again on its own, as described above. Without JavaScript, the lead is not stored: the visitor sees Joomla's security token or session expired message and has to send the form again.

## Leads Show No Source

- Enable **System - DC Leads** under **System → Plugins**.
- Tracking takes the first tagged URL of a visitor session. When testing, open the tagged URL in a fresh private window.

See [Campaign Tracking](/dcleads/leads/tracking).

## Form Not Showing

- The form must be published under **Components → DC Leads → Forms**. A module showing an unpublished form shows nothing; a menu item returns a 404 page.
- Check the module's position, menu assignment and access level as usual.
- The **On the site** column of the Forms list shows every module and menu item that places the form.

## Settings Reset After Saving Permissions

The **System - DC Leads** plugin protects your settings when Permissions is saved. Keep it enabled.

## No Updates Showing

Updates need an active license. Check the **License** tab under **Settings**, or the **License and updates** check on the Dashboard. Then click **Clear Cache** and **Check For Updates** on **System → Update → Extensions**.
