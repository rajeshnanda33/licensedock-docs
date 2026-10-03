# Email Settings

Email settings live under **Components → DC Leads → Settings → Email**. DC Leads sends through Joomla's mailer, so the mail method (SMTP, PHP mail or sendmail) is set in **System → Global Configuration → Server**.

Leads are always stored before any email is sent. A failed email never loses a lead – the [Dashboard](/dcleads/admin/dashboard) flags it and you can resend it.

## New Lead Emails

| Setting | Default | Description |
|---------|---------|-------------|
| Email me new leads | Yes | Sends a notification for each new lead. Leads are stored either way |
| Send to | – | Comma separated addresses. Empty uses the **From Email** in Global Configuration |
| Send test email | – | Sends a short test to the **Send to** addresses |

**Send test email** uses the values typed on the page, including the sender below, so you can test before saving. The page keeps what you typed. The message tells you where the test went, or the mail server's error.

### The Notification

Each new lead sends one plain text email to every **Send to** address:

- **Subject** – "New enquiry from [name]". When the name is empty, the email, phone or form title is used instead.
- **Body** – the form name, email, phone, subject, message, every other answer, and a link to the lead in the admin.
- **Reply-To** – the visitor's email address, so replying in your mail app answers the lead directly.

Submissions caught by the [spam timer](/dcleads/settings/spam#minimum-seconds-on-the-form) still send the notification, with the subject starting `[Possible spam]` and a note at the top. If it is a real enquiry, open the lead and set its status to **New**.

### Resending

When a notification fails, the lead shows **Email not sent**. Fix the mail setup, then select the leads in the list and click **Resend email**, or open one lead and click **Resend email** in its toolbar. The **Email sent or not** filter lists every lead still waiting.

## Sender

| Setting | Default | Description |
|---------|---------|-------------|
| From name | Global Configuration **From Name** | Shown as the sender of every DC Leads email |
| From email | Global Configuration **From Email** | Use an address on your own domain (covered by its SPF record), or mail may land in spam |

The sender applies to notifications, the auto-reply and the test email.

## Auto-reply

An optional thank-you email to the visitor.

| Setting | Default | Description |
|---------|---------|-------------|
| Send auto-reply | No | Sends the thank-you email to the address the visitor entered |
| Reply-To name | Global Configuration **Reply-To Name**, else the From name | The name on the reply address |
| Reply-To email | Global Configuration **Reply-To Email**, else the first **Send to** address | Where the visitor's reply goes |
| Subject | "Thank you for getting in touch" | Empty uses the text shown in the box |
| Message | See below | Plain text. Empty uses the text shown in the box |

The default message is:

```
Hello {name},

Thank you for your message. We have it and will reply soon.

{sitename}
```

### Placeholders

Both the subject and the message accept:

| Placeholder | Replaced with |
|-------------|---------------|
| `{name}` | The name the visitor entered |
| `{sitename}` | The **Site Name** from Global Configuration |

`{name}` is left empty when the name is longer than 60 characters or looks like a link or email address, so the form cannot be used to send links to other people. "Hello {name}," then becomes "Hello,".

### When No Auto-reply Is Sent

- The visitor gave no email address
- The same address already received an auto-reply in the last 24 hours
- The submission was caught by the spam timer
- The submission looks like link spam: a link in the name, HTML or forum link code, or three or more links across the answers
