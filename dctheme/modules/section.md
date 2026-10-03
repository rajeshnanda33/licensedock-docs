# Section

**DC Theme - Section** is a full-width band with a heading, a background and a column grid. Stack several in `sections-top` or `sections-bottom` to build a landing page.

A section takes its content from its own editor, or lays out every module published to a position you name. The second way is how you put other modules – testimonials, pricing, an FAQ – inside a styled band with a heading.

## Add a Section

1. Go to **Content → Site Modules → New** and choose **DC Theme - Section**
2. Set the position to `sections-top` or `sections-bottom`
3. Fill in the settings below and assign it to the pages that need it

Sections in the same position appear in their module ordering. The order of `sections-top` against the hero and breadcrumbs is set on the template's Layout tab – see [Layout](/dctheme/template/layout#band-order).

## Words

| Setting | Default | Description |
|---------|---------|-------------|
| Heading | Empty | Shown above the content. Leave empty for a band with no heading |
| Heading level | Heading 2 | **Heading 2**, **Heading 3** or **Plain text**. Use plain text if the heading is decorative |
| Heading size | Large | **Large**, **Medium** or **Small**. Independent of the level, so a band can sit correctly in the outline without dominating the page |
| Intro line | Empty | A short line under the heading |
| Heading alignment | Left | **Left** or **Centred** |

## Content

| Setting | Default | Description |
|---------|---------|-------------|
| Content from | This module | **This module** or **A module position** |
| Content | Empty | Shown for This module. An editor field for the band's content |
| Module position | Empty | Shown for A module position. Any position name you choose, such as `section-features` |

With **A module position**, each module published to that position becomes one column of the grid. Give the position a new name, type the same name into those modules' **Position** field, and assign them to the same pages as the section.

A section with no content hides itself, heading included, so an unfinished band never shows on the page.

## The Band

| Setting | Default | Description |
|---------|---------|-------------|
| Background | Page background | **Page background**, **Surface tint** or **Brand colour**. Text, links and muted text are recoloured to stay readable on the surface and brand bands |
| Width | Container | **Container** holds the content to the site width. **Fluid** keeps only the edge padding. **Full** drops that too |
| Reach the screen edges | No | Lets the band out past the page column. Needed only for a section in `content-top`, `content-bottom` or a sidebar. Bands in `hero`, `sections-top` and `sections-bottom` already span the screen |
| Content width | Full width | **Full width**, **10 of 12**, **8 of 12** or **6 of 12**. Narrows and centres the content, for text meant to be read. Full width suits card grids |
| Columns | Automatic | **Automatic**, or 1 to 6. How many across on a wide screen. Automatic gives one column per module, up to four. Never more than there are modules, and everything stacks on phones |

With **Reach the screen edges** on, **Width** still decides the content: Container keeps the words in line with the page while the colour runs to the edges. Leave it off for a band with a border or rounded corners.

## Advanced

The **Advanced** tab has **Layout** and **Module Class**. Classes typed into Module Class are added to the band itself, so you can target one section from `user.css`.

## Next Steps

- [Testimonials](/dctheme/modules/testimonials), [Pricing](/dctheme/modules/pricing), [FAQ](/dctheme/modules/faq) – modules that sit well inside a section
- [Layout](/dctheme/template/layout) – positions and widths
