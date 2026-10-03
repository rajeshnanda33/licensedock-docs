# Spam Protection

Spam settings live under **Components → DC Leads → Settings → Spam protection**. The invisible checks come first, so most visitors never see a puzzle. Add a captcha only if spam still gets through.

| Setting | Default | Description |
|---------|---------|-------------|
| Honeypot: always on | – | A hidden field that only bots fill in. Not a setting – it cannot be switched off |
| Captcha | Use Default | A Joomla captcha plugin for DC Leads forms. **Use Default** follows Global Configuration, and the description shows which captcha that is now. **No captcha** turns it off for DC Leads only |
| Minimum seconds on the form | `3` | Faster submissions go to Spam. Recommended: 3. `0` turns the timer off. Up to 60 |

## Honeypot

Every form has a hidden field that people never see. A submission with that field filled in is shown the normal thank-you message but is discarded: no lead, no email.

## Minimum Seconds on the Form

The timer measures how long the form was on screen before it was sent. A person needs a few seconds to fill in a form; a bot sends at once.

A submission sent faster than the minimum is not thrown away, in case it came from a quick real visitor:

- It is stored with the status **Spam**
- The notification email is still sent, with the subject starting `[Possible spam]`
- No auto-reply is sent

If one of these is a real enquiry, open it and set the status to **New**.

The timer also works on pages served from Joomla's page cache. On a cached page, the form script starts the timer on the visitor's first scroll, tap, key press or mouse move.

## Captcha

Any enabled Joomla captcha plugin works, for example the built-in Proof of Work captcha. The captcha shows above the button on every DC Leads form.

| Captcha setting | Result |
|-----------------|--------|
| Use Default | The **Default Captcha** from **System → Global Configuration → Site** |
| No captcha | No captcha on DC Leads forms, whatever Global Configuration says |
| A plugin | That captcha on DC Leads forms only |

A captcha plugin that is chosen but disabled is skipped, so it never blocks leads. The [Dashboard](/dcleads/admin/dashboard) spam check passes only when the chosen captcha is enabled.

## Limits

These limits are fixed:

| Limit | What happens |
|-------|--------------|
| 30 submissions per hour from one IP address | Further sends show "We already have several messages from you. Please try again in an hour." and are not stored |
| 1 auto-reply per email address per day | Later leads from the same address are stored and notified, with no auto-reply |
| No auto-reply to link spam | A link in the name, HTML or forum link code, or three or more links across the answers. The lead is still stored and notified |

The hourly limit counts only submissions that pass validation.

::: tip Behind a proxy or Cloudflare
Turn on **Behind Load Balancer** under **System → Global Configuration → Server**. Without it, every visitor appears to come from the proxy's address and shares the 30 per hour limit.
:::
