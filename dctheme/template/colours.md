# Colours

Colours are set in the **Colours** group on the **Brand** tab of **System → Site Template Styles → DC Theme - Default**. Light and dark mode are on the **Features** tab.

## Palettes

**Colour palette** offers ten ready-made sets of four colours, each checked to stay readable in light and in dark. Pick one and there is nothing else to set.

| Palette | Brand | Accent | Text | Surface |
|---------|-------|--------|------|---------|
| Navy and amber | `#144881` | `#F49631` | `#16202E` | `#F1F5FB` |
| Forest and gold | `#1A5D3A` | `#E3A008` | `#16231C` | `#EFF6F1` |
| Teal and coral | `#0F6E66` | `#F4703A` | `#14252A` | `#EFF6F5` |
| Indigo and amber | `#3730A3` | `#F59E0B` | `#1B1A33` | `#F2F1FB` |
| Graphite and blue | `#273444` | `#3B82F6` | `#16202E` | `#F1F3F6` |
| Plum and amber | `#5B2B6B` | `#F0A02A` | `#241A2B` | `#F6F1F8` |
| Burgundy and gold | `#7A1F3D` | `#D99A2B` | `#26161C` | `#F9F0F3` |
| Ocean and sand | `#15607A` | `#D98E36` | `#132227` | `#EEF5F8` |
| Slate and emerald | `#334155` | `#059669` | `#151C26` | `#F2F4F7` |
| Espresso and amber | `#4A3524` | `#D9822B` | `#241B12` | `#F7F3EE` |

## Custom Colours

Choose **Custom - set your own below** to match a brand. The four colour pickers appear:

| Setting | Default | Description |
|---------|---------|-------------|
| Colour palette | Custom | A ready-made palette, or Custom to use the pickers below |
| Brand colour | `#0B7F58` | Buttons, links and accents |
| Text colour | `#0F1B2A` | Body text and headings. Near black reads better than pure black |
| Surface colour | `#F2F5F8` | Behind the footer and any section set to Surface. Keep it close to white |
| Accent colour | `#E8590C` | A second colour for occasional emphasis. Most sites need only the brand colour |
| Text on brand colour | Automatic | **Automatic**, **Always white** or **Always dark**. Text on buttons and brand-coloured bands |
| Text on the accent colour | Automatic | **Automatic**, **Always white** or **Always dark**. Text on an accent button |

The two "Text on" settings apply to palettes too.

## Contrast Correction

Your colours are kept as you set them, and the template works out readable versions where it needs them:

- **Text on brand and accent** – Automatic picks white or your text colour, whichever meets WCAG AA. Choosing **Always white** on a light brand darkens the button fill until white is readable on it, instead of shipping unreadable text
- **Brand and accent as text** – Links and coloured text are darkened, if needed, to 4.5:1 against the page. Accent icons only need 3:1, so they stay brighter
- **Surface** – Text, muted text and links on surface bands are checked against the surface colour, so even a dark surface stays readable
- **Dark mode** – Brand text is recalculated against the dark background rather than reused

Below the pickers, a report lists every colour that was adjusted, what you set and what is drawn. When nothing needed changing it says **Every colour above is used exactly as you set it.**

Your **Text colour** is never adjusted. If it reads below 4.5:1 against the page, the report warns you to pick a darker one.

## State Colours

The **State colours** group sets the colours Bootstrap and Joomla use for messages, badges and buttons. Change one and every place it is used follows, in light and dark.

| Setting | Default | Description |
|---------|---------|-------------|
| Success colour | `#198754` | Confirmations, completed states and tick marks |
| Info colour | `#0AA2C0` | Neutral notices. Joomla also uses it for article tags |
| Warning colour | `#B45309` | Cautions that are not yet errors |
| Danger colour | `#DC3545` | Errors, failed actions and destructive buttons |
| Secondary colour | `#6C757D` | Quiet buttons and muted badges |

State colours used as text are also corrected for contrast and appear in the report.

## Light and Dark Mode

On the **Features** tab, in the **Colour theme** group:

| Setting | Default | Description |
|---------|---------|-------------|
| Colour theme | Light | **Light**, **Dark** or **System**. What the site opens in. System follows the visitor's device setting |
| Button position | header-actions | Where the light and dark button sits on a wide screen: `header-actions`, `topbar-l`, `topbar-r`, `offcanvas`, `copyright-l`, `copyright-r` or **Nowhere** |
| Button position on a phone | Same as above | Where the button sits below 992px, where the menu becomes a button. **Same as above** keeps one position at every width |

The button offers three choices: **Light**, **Dark** and **Follow my device**. A visitor's choice is remembered in their browser. With **Button position** set to Nowhere, there is no button and the site always uses the **Colour theme** setting.

Dark mode uses neutral dark backgrounds and keeps your brand colour. The logo switches to **Logo (dark backgrounds)** when one is set – see [Branding](/dctheme/template/branding).

When the site is set to Light and has no button, no dark mode CSS is sent at all.

## Colour Classes for Content

The **Reference** tab lists the classes you can type in the editor. The colour ones:

| Class | Use |
|-------|-----|
| `text-primary` | Brand colour as text (Bootstrap) |
| `dc-accent` | Accent colour on words |
| `dc-accent-icon` | Accent colour on an icon, a little brighter |
| `bg-body-secondary` | A panel tinted with your surface colour, with text and links inside it rechecked for contrast |
| `dc-raised` | Lifts a panel off a surface band, in light and dark |

## Next Steps

- [Typography](/dctheme/template/typography) – fonts and sizes
- [Header](/dctheme/template/header) – layout and behaviour
