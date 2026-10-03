# Placing a Form

A form shows on the site through the **DC Leads - Form** module or a **DC Leads → Form** menu item. The form itself (fields, heading, button, thank-you) is set once under **Forms**; the module and menu item only decide where and how it sits on the page.

The same form can be placed any number of times. The [Forms list](/dcleads/forms/#forms-list) shows every placement under **On the site**.

## Module

Go to **Content → Site Modules → New** and choose **DC Leads - Form**. Set the position and menu assignment as for any module.

### Module Tab

| Setting | Default | Notes |
|---------|---------|-------|
| Form | – | Required. Unpublished forms are marked. **Edit form** and **New form** open the form builder in a new tab |
| Anchor | – | Lets a link scroll to this form. Enter `enquiry`, then link to `#enquiry` |

### Display Tab

| Setting | Default | Notes |
|---------|---------|-------|
| Text and form | Text above the form | Where the form's heading and intro text sit: **Text above the form**, **Text below the form**, **Text on the left, form on the right**, **Form on the left, text on the right** or **Centred, text above the form** |
| Text / form split | Half and half | Side by side layouts only. **Text 1/3, form 2/3**, **Text a little narrower**, **Half and half**, **Text a little wider** or **Text 2/3, form 1/3** |
| Side by side from | Laptops and up (992px) | Side by side layouts only. **Tablets and up (768px)**, **Laptops and up (992px)** or **Large screens only (1200px)**. Below this width the text and form stack |
| Form width | Automatic | **Automatic**, **Narrow**, **Normal**, **Wide**, **Two thirds** or **Full width**. Automatic uses a readable column when stacked and the full width when side by side |
| Keep inside the page width | No | Turn on when the module position spans the whole window, so the form lines up with the page content |

Side by side layouts need a heading or intro text on the form. Without either, the form shows as **Text above the form**.

### Advanced Tab

| Setting | Notes |
|---------|-------|
| Module Class | Extra CSS classes added to the form wrapper |
| Layout | Alternative layout from your template |

## Menu Item

Go to **Menus → [your menu] → New**, click **Select** next to **Menu Item Type** and choose **DC Leads → Form**.

| Setting | Tab | Notes |
|---------|-----|-------|
| Form | Details | Required. **Edit form** and **New form** links as in the module |
| Text and form | Display | As in the module |
| Text / form split | Display | As in the module |
| Side by side from | Display | As in the module |
| Form width | Display | As in the module |

The standard Page Display and Metadata tabs work as usual: browser page title, page heading, page class, meta description and robots.

A menu item pointing to an unpublished form returns a 404 page.

## Linking to a Form

Give the module an **Anchor**, for example `enquiry`, then link to it from a button or menu item:

```
#enquiry
/contact#enquiry
```

The anchor is a module setting. To link to a form on a menu item page, link to the page itself.

## Prefill by URL

A link can preselect an option in a Subject, Dropdown, Radio buttons or Checkboxes field, so a button for one plan or service opens the form with that choice already made. Add the field's name and the option to the link:

```
/pricing?subject=growth#enquiry
/start-your-project?subject=joomla-extension&budget=not-sure-yet
```

The form editor shows the pattern and the form's field names under **Prefill by URL**, below Status, once the form is saved.

- The name is the field's **Field name**. Subject always uses `subject`.
- The answer matches in any letter case, and spaces and symbols can be left out: `Growth`, `growth` and `GROWTH` all choose Growth, and `web-application-saas` chooses Web Application / SaaS.
- For Checkboxes, separate several answers with commas: `?services=design,hosting`.
- Only the field's own answers can be chosen. An unknown answer is ignored and the field stays empty.
- An answer the visitor already gave, for example after a failed send, is kept.

It works on pages served from Joomla's page cache too, because the form script reads the link in the browser.

## Several Forms on One Page

Any number of forms, or copies of the same form, can share a page. Each keeps its own errors and values when it is sent without JavaScript.

## Styling

The form uses your template's Bootstrap classes, so it follows the template's inputs, buttons and colours. Searchable lists copy the size and look of the template's own select boxes. Change the button style with **Button classes** on the form – see [Text and Button Tab](/dcleads/forms/#text-and-button-tab).
