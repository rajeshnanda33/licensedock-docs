# Layout

The page is a stack of regions, each filled by module positions. Region settings are on the **Layout** tab of **System → Site Template Styles → DC Theme - Default**. A region with nothing published in it takes no space.

## Page Order

From top to bottom:

1. Top bar – `topbar-l`, `topbar-r`
2. Header – logo, `menu`, `header-actions`, `switch`
3. Hero – `hero`
4. Breadcrumbs – `breadcrumbs`
5. Sections top – `sections-top`
6. Content – `sidebar-left`, then `content-top`, the page itself, `content-bottom`, then `sidebar-right`
7. Sections bottom – `sections-bottom`
8. Footer – `footer-1` to `footer-6`
9. Copyright row – `copyright-l`, `copyright-r`

Rows 3 to 5 can be reordered – see [Band Order](#band-order).

When a page has no content of its own – for example a menu item pointing at an empty article, with the page built from a hero and sections – the content area is left out, so no blank gap sits between the bands.

## Module Positions

| Position | Where it renders | Module style |
|----------|------------------|--------------|
| `topbar-l` | Top bar, left side | None |
| `topbar-r` | Top bar, right side | None |
| `menu` | Header, main navigation. Also reused in the mobile panel when `offcanvas` is empty | None |
| `header-actions` | Header, right side. Usually a call to action button | None |
| `switch` | Header, right side after `header-actions` | None |
| `hero` | Full-width band below the header | None |
| `hero-form` | Inside a [Hero Banner](/dctheme/modules/hero) set to show **Another module**, beside or below the words | Set by the module |
| `breadcrumbs` | Below the hero, at the content width. Never shown on the home page | None |
| `sections-top` | Full-width bands above the content | None |
| `content-top` | Inside the content column, above the page | Plain |
| `sidebar-left` | Left column beside the content. Moves below the content under 992px | Card |
| `sidebar-right` | Right column beside the content. Moves below the content under 992px | Card |
| `content-bottom` | Inside the content column, below the page | Plain |
| `sections-bottom` | Full-width bands below the content | None |
| `footer-1` to `footer-6` | Footer columns | Footer |
| `copyright-l` | Bottom row of the footer, left side | None |
| `copyright-r` | Bottom row of the footer, right side | None |
| `offcanvas` | Mobile menu panel. Replaces the header menu there | None |
| `offcanvas-bottom` | Mobile menu panel, below the menu | None |
| `debug` | End of the page | None |

The [Section](/dctheme/modules/section) and [Menu](/dctheme/modules/menu) modules can also read any position name you invent, such as `section-features` or `mega-services`. Those positions are not in the list above, so type the name into the module's **Position** field.

### Module Styles

The template adds five module styles, listed under **Module Style** on a module's **Advanced** tab:

| Style | Look |
|-------|------|
| `dcnone` | Module output only, no wrapper or title |
| `dcplain` | Optional title above the content, no box |
| `dccard` | Bordered panel with a title |
| `dcbordered` | A rule beneath, no box |
| `dcfooter` | Footer column title above the content |

## Band Order

The **Arrangement** group shows a layout map of the page. Drag the Hero, Breadcrumbs and Sections top rows to change their order. The map writes the result to **Band order**.

| Setting | Default | Description |
|---------|---------|-------------|
| Band order | `hero,breadcrumbs,sections-top` | Set by dragging the rows in the layout map |

The map also shows where the template draws the theme switch, social icons, phone number and copyright line, and lets you set the **Shown on** switches and widths for each screen.

## Shown On

Tick the screens each region appears on. Desktop is 992px and up, Tablet 768px to 991px, Phone below 768px. Every region defaults to all three, except **Header buttons shown on**.

| Setting | Default | Description |
|---------|---------|-------------|
| Top bar shown on | Desktop, Tablet, Phone | Clearing them all also hides `topbar-l` and `topbar-r` |
| Header shown on | Desktop, Tablet, Phone | The menu button lives in the header, so a screen without it has no navigation |
| Header buttons shown on | Desktop, Tablet | Anything published to `header-actions` |
| Hero shown on | Desktop, Tablet, Phone | Anything published to `hero` |
| Show breadcrumbs | Desktop, Tablet, Phone | The trail showing where a page sits. Never shown on the home page |
| Sections top shown on | Desktop, Tablet, Phone | Everything published to `sections-top` |
| Sections bottom shown on | Desktop, Tablet, Phone | Everything published to `sections-bottom` |
| Footer shown on | Desktop, Tablet, Phone | The footer columns. The copyright row is separate |
| Copyright row shown on | Desktop, Tablet, Phone | The line under the footer, and anything in `copyright-l` or `copyright-r` |

A region hidden on every screen is not rendered at all.

## Widths

| Setting | Default | Description |
|---------|---------|-------------|
| Container width | 1280px | **1140px**, **1280px** or **1440px**. How wide a row set to Container may grow. 1140 leaves more margin, 1440 suits photographs |
| Top bar width | Container | **Container**, **Fluid** or **Full** |
| Header width | Container | **Container**, **Fluid** or **Full** |
| Hero width | Full | **Container**, **Fluid** or **Full** |
| Sections top width | Full | **Container**, **Fluid** or **Full** |
| Content area width | Container | **Container** or **Fluid**. Full is not offered, because text needs a measure to stay readable |
| Sidebar width | Narrow | **Narrow** (a quarter of the row) or **Wide** (a third). Wide is ignored when both sidebars are published |
| Sections bottom width | Full | **Container**, **Fluid** or **Full** |
| Footer width | Container | **Container**, **Fluid** or **Full** |

**Container** holds the row to the container width. **Fluid** fills the screen but keeps the edge padding. **Full** drops the padding too.

Hero and section bands default to Full because the Hero Banner and Section modules set their own inner width. Anything else published there runs to the screen edge unless you change the band to Container.

### Full-Width Bands Inside the Content

A Section module in `hero`, `sections-top` or `sections-bottom` already spans the screen. In `content-top`, `content-bottom` or a sidebar it sits in the page column; turn on its **Reach the screen edges** setting to let the band run to the screen edges. Beside a sidebar a band stays inside its column.

In an article, use the `dc-section--bleed` class for the same effect:

```html
<section class="dc-section dc-section--surface dc-section--bleed">
  <div class="dc-section__inner">...</div>
</section>
```

Swap `dc-section--surface` for `dc-section--brand`, or drop it for no tint.

### Narrow Pages

Put one of these in a menu item's **Page Class** to limit the line length of the whole page, heading included:

| Class | Width |
|-------|-------|
| `narrow-4` | A form, about 35 characters a line |
| `narrow-5` | A form. The width the login pages use |
| `narrow-6` | The tightest that still reads well, about 52 characters |
| `narrow-8` | The usual choice for a page of text, about 69 characters |
| `narrow-10` | Just in from the edges, for tables or cards |

These apply from 992px up and only when there is no sidebar.

## Footer

| Setting | Default | Description |
|---------|---------|-------------|
| Footer columns per row | Automatic | **Automatic**, or 2 to 6. How many footer positions stand side by side before the row breaks. Automatic keeps up to four across and wraps five or six into rows of three. Applies from 992px up |
| Footer column shares | `1,1,1,1,1,1` | One number per footer position, in order. A column set to 2 is twice as wide as one set to 1. Set them on the footer row of the layout map. Applies from 992px up |
| Footer alignment | Left | **Left**, **Centred on phones** or **Centred** |

Only footer positions with something in them become columns. On phones the columns stack, and from 576px they sit two across.

## Core Page Overrides

DC Theme overrides these core views so they match the template:

| View | What changes |
|------|--------------|
| Article | Template styling, keeping the menu item's page heading and page breaks. The title lines up with the column the body opens with |
| Category blog | Articles and subcategories as a card grid, with page numbers |
| Featured (home) | Articles as a card grid. The page heading steps down to H2 when a hero on the home page holds the H1 |
| Contact | Contact details beside the enquiry form |
| Login, logout, registration, password reset, username reminder | One narrow centred column, the form in a panel, with links between the account pages |
| Profile and profile edit | Matching account layout |
| Breadcrumbs module | Separators drawn in CSS, so screen readers do not read slashes. Writes BreadcrumbList structured data |
| Pagination | Bootstrap pagination in your brand colours |
| List custom field | Prints the option's label, not its stored value |
| Subform custom field | Rows rendered as sections. Put `dc-faq` in the field's **Render Class** for an accordion with FAQ structured data |

The error page and the offline page are styled by the template too.

## Next Steps

- [Consent and Analytics](/dctheme/template/consent-analytics) – tracking tags and the cookie bar
- [Section module](/dctheme/modules/section) – build pages from full-width bands
