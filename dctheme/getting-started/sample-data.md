# Sample Data

The **Sample Data - DC Theme** plugin builds a complete example site – a fictional dental practice – with every DC Theme module already placed in the regions it suits. It is a quick way to see the template working before you build your own pages.

Installing the plugin changes nothing on its own. The demo is only built when you run it.

:::info
Run the sample data on a fresh or test site. It sets its own home page and writes demo values into your DC Theme template style.
:::

## Run It

1. Make sure **DC Theme - Default** is the default site template style
2. On the **Home Dashboard**, find the **Sample Data** panel
3. Click **DC Theme** and confirm

When it finishes, a message lists what was created. Open the site to see the demo.

The demo runs on a single language site only. With more than one content language published it stops before writing anything, because it replaces the main menu's home page.

## What It Builds

| Area | What is created |
|------|-----------------|
| Articles | Service, pricing, style guide, legal and header demo pages, plus nine posts, in three new categories: **Services**, **Pages** and **News** |
| Menus | A two-level **Main Menu** with a new Home item set as the site home page, a **Legal** menu and an **Account** menu (login, register, password and username reminders, profile, log out) |
| Contact | A contact record with the enquiry form switched on, linked from a **Contact** menu item |
| Modules | Hero banners on the home and contact pages, Section bands in `sections-top` and `sections-bottom` holding features, stats, testimonials, a logo strip, an FAQ, pricing and a gallery, a mega panel on the Services menu item, sidebars, footer columns and a legal links row |
| Template style | Business name, logo, dark logo, favicon, social links, a phone number shown in the top bar and a WhatsApp number, written to the existing DC Theme style |
| Header demos | Six extra template styles, one per header layout and scroll behaviour, each assigned to its own page under **Styles** in the main menu |
| Users | **Allow User Registration** is switched on in the Users options, so the registration page works |

The contact form is addressed to `hello@example.com`. Change the email in **Components → Contacts** if you keep the contact page.

## Run It Again

Running the sample data again removes everything the previous run created and builds it fresh. Your own articles, menu items and modules are left alone.

Every article, category, menu item and module the demo creates carries the note `[DC Theme demo]`, and the extra template styles are titled `[DC Theme demo] ...`. That is how a re-run finds its own work.

## Remove or Replace It

There is no one-click removal. To clear the demo by hand, search for `[DC Theme demo]` and trash or delete the matches in:

- **Content → Articles** and **Content → Categories**
- **Menus → All Menu Items**, then delete the Legal and Account menus in **Menus → Manage** if you do not need them
- **Content → Site Modules**
- **System → Site Template Styles** (the six header demo styles)

Then delete the **Ridgeway Dental** contact in **Components → Contacts**.

Before you delete the demo Home item, set your own home menu item. The values written to **DC Theme - Default** (logo, business name, social links, phone and WhatsApp) stay until you change them on the style.

A simpler path for a real site is to keep the parts you like and edit them: replace the text and images in the modules, swap the logo on the Identity tab, and rename the menu items.

## Next Steps

- [Branding](/dctheme/template/branding) – replace the demo logo and business name
- [Layout](/dctheme/template/layout) – see which positions the demo uses
