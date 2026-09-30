# Checkout Consent

Checkboxes shown above the pay button – terms acceptance, a cooling-off waiver for digital content, a marketing opt-in and your own – plus a privacy policy notice. Each order keeps a record of exactly what the buyer saw and ticked.

Everything here is off until you publish it.

## Managing Consents

Go to **Components → LicenseDock → Checkout Consent**. There is also a **Checkout Consent →** link at the foot of **Settings → Storefront → Checkout Fields**.

Three standard consents are installed, unpublished:

| Consent | Built-in wording | Rules |
|---------|------------------|-------|
| Terms & Conditions | I accept the {link}. | Required by default. Can't be pre-ticked. Links to your terms page |
| Cooling-off waiver | I expressly consent to the digital content being supplied before the 14-day withdrawal period ends, and I acknowledge that I thereby lose my right of withdrawal once supply begins. | Always required while published. Can't be pre-ticked |
| Marketing opt-in | Send me occasional product news and offers by email. Unsubscribe anytime. | Never required. May be pre-ticked. Always shown as its own box |

**New** adds a **Custom checkbox**, which can be required or optional, can link to one page, and can be pre-ticked when it is not required.

Publish and unpublish rows from the list. The **Required** column shows which ones block the purchase.

## Editing a Consent

| Field | Notes |
|-------|-------|
| Label | The checkbox text. Leave blank on a standard consent to use its built-in wording. Use `{link}your text{/link}` to link your own words, or `{link}` alone to insert the page name as the link |
| Menu item | Terms and custom checkboxes. The page to link to. On a multilingual site the link follows the buyer's language through menu associations |
| or an external URL | Used only when **Menu item** is **– None –**, e.g. a hosted page or PDF. The same URL is used for every language |
| Status | Published or Unpublished |
| Required | Block the purchase until the box is ticked |
| Pre-checked | Marketing and custom checkboxes only. Show the box already ticked |
| Ordering | Position above the pay button |

The edit screen shows a **Recommended** note beside the toggles where one applies.

When `{link}` is used without text, the link text is the menu item's page heading or title, or "Terms and Conditions" / "more information" for a URL.

## Privacy Policy Notice

Below the consent list, the **Privacy Policy** card adds a line near the pay button:

> Your personal data will be used to process your order and as described in our Privacy Policy.

It is an information notice with no checkbox, and shows whether or not any consent box is published.

| Field | Notes |
|-------|-------|
| Menu item | The privacy policy page. Follows the buyer's language through associations |
| or an external URL | Used when **Menu item** is **– None –** |
| Status | Published or Unpublished. Unpublished by default |

## On the Checkout Page

- Boxes appear above the pay button in the order you set. They load unticked every time, except those set to **Pre-checked**. A reminder link or a returning session never ticks them.
- A link to a Joomla menu item opens in a modal, so the buyer stays on checkout. An external URL opens in a new tab.
- An unticked required box shows "Please accept this to continue." next to it. The server checks again and refuses the order with "Please accept the required agreements to continue."
- The block only appears when the customer can actually pay: at least one gateway is enabled, or the order is free.

## Proof of Consent

When the order is placed, LicenseDock stores for every published consent:

- the exact wording the buyer saw, in their language, with link text in place
- whether it was required
- whether it was ticked
- the time, and the language

The record appears in the order details in **Orders**, and in the purchase confirmation email through the `{consent_section}` variable.

## Marketing Opt-In

Ticking the marketing box marks the customer as **Opted in** in the **Marketing** column of **Customers**, with the date. A later order with the box unticked does not remove an earlier opt-in.
