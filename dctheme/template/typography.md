# Typography

Fonts and sizes are set in the **Type and shape** group on the **Brand** tab of **System → Site Template Styles → DC Theme - Default**.

## Fonts

Every font is self-hosted in `media/templates/site/dctheme/fonts/`, so no request goes to Google or any other font service. Only the fonts you pick are loaded, and their regular weight is preloaded.

| Setting | Default | Description |
|---------|---------|-------------|
| Body font | Plus Jakarta Sans | Text across the site. The size shown beside each choice is what the page downloads |
| Heading font | Same as body font | Leave as the body font for the fastest page |

**Body font** choices:

| Option | Download |
|--------|----------|
| Funnel Sans | 34KB |
| Plus Jakarta Sans | 54KB |
| Literata, serif | 77KB |
| Inter | 97KB |
| System sans | 0KB – the visitor's own system font |

**Heading font** choices:

| Option | Extra download |
|--------|----------------|
| Same as body font | None |
| Funnel Display | +17KB |
| Literata – serif | +38KB |
| Poppins | +15KB |
| Inter | +47KB |
| Plus Jakarta Sans | +26KB |
| Funnel Sans | +16KB |
| System serif | 0KB – Georgia or the system serif |

Body fonts include italics, which are only fetched when a page actually uses italic text.

## Sizes and Shape

| Setting | Default | Description |
|---------|---------|-------------|
| Text size | Default | **Compact**, **Default** or **Generous**. Scales every size at once. Compact suits text-heavy sites, Generous suits image-led ones |
| Heading size | Level | **Level**, **One size smaller** or **Quieter**. How big headings are across the site: page titles, headings in text, section bands and figures. The hero headline keeps its own size. Level suits a landing-page site, Quieter suits long reading |
| Corner radius | Medium | **Square**, **Small**, **Medium**, **Large** or **Pill**. How rounded buttons, cards, panels and images are |

## Icons

| Setting | Default | Description |
|---------|---------|-------------|
| Bootstrap Icons | No | Use any Bootstrap Icon in your content, like `<i class="bi bi-star"></i>`. Adds up to 145KB |

Turn this on if you add icons to [Hero Banner](/dctheme/modules/hero) buttons. Joomla's own Font Awesome icons (`icon-*` classes used by core layouts) are always available.

## Text Classes for Content

The **Reference** tab lists classes you can type in the editor's code view. The text ones:

| Class | Use |
|-------|-----|
| `dc-lead` | The first paragraph of a page. Follows the type scale. Use it once per page |
| `dc-eyebrow` | A short label above a heading |
| `text-body-secondary` | Quieter text (Bootstrap), already matched to your colours |
| `dc-list dc-list--tick` | A list with a tick on every line, in the brand colour. Also `--tick-circle`, `--cross`, `--arrow`, `--none` and `--cols` |

To limit the line length of a whole page, put `narrow-4`, `narrow-5`, `narrow-6`, `narrow-8` or `narrow-10` in the menu item's **Page Class**. The number is twelfths of the row, and it applies from 992px up when there is no sidebar.

## Next Steps

- [Header](/dctheme/template/header) – layout and behaviour
- [Layout](/dctheme/template/layout) – regions, widths and positions
