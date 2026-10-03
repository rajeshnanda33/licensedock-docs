# Building a Form

Forms live under **Components → DC Leads → Forms**. Each form is built once and can be placed on as many pages as you like with a module or menu item – see [Placing a Form](/dcleads/forms/placing).

## Forms List

| Column | Shows |
|--------|-------|
| Status | Published or unpublished. An unpublished form is not shown anywhere on the site |
| Title | The form title and its alias |
| On the site | Every module (**Module**) and menu item (**Page**) that shows the form, linked to its edit screen. **Not placed yet** when there are none |
| Fields | Number of fields |
| Leads | Leads received through the form, linked to the filtered lead list |

The toolbar has **New**, **Duplicate**, **Publish**, **Unpublish**, **Check-in** and **Delete**. **Duplicate** copies the selected forms with " (copy)" added to the title; copies start unpublished. Deleting a form keeps the leads already received through it.

Sort by title, **Most leads first**, **Recently changed** or ID.

## Form Details

| Setting | Notes |
|---------|-------|
| Title | Required. Shown in lead emails and the lead list as the form the lead came from |
| Alias | Made from the title when empty. Must be unique |
| Status | Published or Unpublished |

## Fields Tab

Click **Add a field** to add a row. Drag a row, or use the up and down arrows, to change the order. A form needs at least one field.

### Field Types

The type list has two groups. **Contact details** fill the lead's own columns (name, email, phone, subject, message) – a form can hold one of each. **Other questions** are stored as extra answers on the lead, under their label.

| Type | Group | What the visitor gets |
|------|-------|-----------------------|
| Name | Contact details | A text box. Label defaults to "Your name" |
| Email | Contact details | An email box. The address must be valid, with a dot in the domain. Label defaults to "Your email" |
| Phone | Contact details | A phone box with a country flag picker. The number is checked as it is typed and stored in international form, for example `+919876543210`. Label defaults to "Your phone number" |
| Subject | Contact details | A dropdown when **Choices** are entered, a text box otherwise. Label defaults to "Subject" |
| Message | Contact details | A large text area, up to 5,000 characters. Label defaults to "What do you need?" |
| Short text | Other questions | A one-line text box, up to 255 characters |
| Long text | Other questions | A text area, up to 5,000 characters |
| Dropdown | Other questions | A select list of your **Choices** |
| Radio | Other questions | One choice from your **Choices** |
| Checkboxes | Other questions | Any number of your **Choices** |
| Number | Other questions | A number box |
| Date | Other questions | The browser's date picker |
| Website address | Other questions | A web address. `https://` can be left off |
| Country | Other questions | A searchable country list, with an optional state or province field |
| Consent box | Other questions | A checkbox. Label defaults to "I agree to be contacted about this enquiry." Stored as "Yes" when ticked |
| Heading or note | Other questions | No input. The label shows as a small heading and **Note text** as a paragraph |

Every type in **Other questions** needs a label, except Consent box and Heading or note. Contact fields left without a label use the defaults above.

### Field Settings

The settings shown depend on the type.

| Setting | Types | Notes |
|---------|-------|-------|
| Type | All | See the table above |
| Label | All | The question shown above the input |
| Width | All | **Full** or **Half**. Two half-width fields sit side by side from tablet width up and stack on phones |
| Required | All except Heading or note | Required fields get a red `*`, and the form shows "Fields marked * are required." |
| Choices | Subject, Dropdown, Radio, Checkboxes | One per line. Only these values are accepted |
| Choices side by side | Radio, Checkboxes | Shows the choices in a row instead of a list |
| Ask for state or province | Country | Adds a state or province field beside the country |
| Note text | Heading or note | The paragraph under the heading |

**More options: placeholder, help text, name in exports** opens three more settings:

| Setting | Types | Notes |
|---------|-------|-------|
| Placeholder | Name, Email, Phone, Subject, Message, Short text, Long text, Number, Website address | Grey example text inside the empty input |
| Help text | All except Heading or note | A short line under the input |
| Name in exports | Other questions, except Heading or note | A short machine name for the answer. Made from the label when empty. Letters, numbers and underscores |

### Email and Phone

- A form with only one of Email or Phone always requires it, so every lead can be answered.
- A form with both, where neither is required, asks for at least one. The form shows "You only need to give one: email or phone." under them.

### Phone Fields

The flag picker starts on the **Default country** from [General Settings](/dcleads/settings/general). With no default country, it uses the country from the visitor's browser language. When the form also has a Country field, choosing a country sets the flag of an empty phone field.

### Country and State

With **Ask for state or province** on, a second field of the same width appears beside the country. For 13 countries it is a searchable list of that country's divisions, labelled to match:

| Label | Countries |
|-------|-----------|
| State | United States, Australia, India, Brazil, Mexico |
| Province | Canada, Spain, Italy, Indonesia, South Korea |
| Prefecture | Japan |
| Emirate | United Arab Emirates |
| County | Taiwan |

For every other country it is a free text box labelled "State or province". When the country is required, the state is required too wherever a list exists.

The **Default country** setting preselects the country.

## Text and Button Tab

| Setting | Default | Notes |
|---------|---------|-------|
| Heading | – | Shown above the form, or beside it, depending on the module or menu item layout |
| Intro text | – | Editor text shown with the heading |
| Button text | `Send` | The submit button label |
| Button classes | `btn-primary` | Bootstrap button classes, for example `btn-primary btn-lg` or `btn-outline-dark`. The `btn` class is always added |
| Note under the form | – | Small text above the button, for example a privacy notice. For a box the visitor must tick, add a **Consent box** field instead |

## After Sending Tab

| Setting | Default | Notes |
|---------|---------|-------|
| Thank you page | None | A menu item to send the visitor to after a successful send. A page of its own is the easiest way to track an ad conversion |
| Thank you message | "Thank you. We have your message and will reply soon." | Shown in place of the form. Only used when no thank-you page is chosen |

## How the Form Sends

With JavaScript, the form checks each field as the visitor sends it, shows errors beside the fields, and sends in the background with a spinner on the button. The thank-you message replaces the form, or the visitor is taken to the thank-you page.

Without JavaScript, the form posts normally. Errors and the values entered come back on the same page, and the thank-you message shows with the page messages.

The server checks every submission again, whichever way it arrives.

### Conversion Events

After a successful send, the form fires a `dcleads:submitted` browser event (its `detail` holds `form`, the alias, and `formId`) and, when Google Tag Manager's `dataLayer` is on the page, pushes:

```js
{ event: 'dcleads_submitted', dcleads_form: '<form alias>', dcleads_form_id: <form id> }
```

Use either as a conversion trigger, or use a thank-you page.
