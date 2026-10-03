# Header

The header holds the logo, the menu, header buttons and the light and dark switch. Its settings are on the **Layout** tab of **System → Site Template Styles → DC Theme - Default**, in the **Page and header** group.

## Layout and Behaviour

| Setting | Default | Description |
|---------|---------|-------------|
| Header layout | Menu centred | Where the menu sits, picked from a drawing of each layout |
| Header on scroll | Normal | **Normal** scrolls away with the page. **Fixed** stays at the top. **Smart** hides going down and returns on the way up |

The four header layouts:

| Layout | Arrangement |
|--------|-------------|
| Menu beside the logo | Logo, then the menu reading left to right, header buttons on the right |
| Menu centred | Logo left, menu in the middle, header buttons right |
| Menu at the far right | Logo left, menu beside the header buttons on the right. Gives a wide logo the whole left of the bar |
| Logo above a centred menu | Two rows: the logo centred, the menu centred beneath it. Suits a long name |

Any layout works with any scroll behaviour.

To use a different header on some pages, duplicate the template style, change **Header layout** on the copy, and assign the copy to those menu items on its **Menu Assignment** tab.

## What Goes in the Header

The header is built from module positions. Nothing in it is hardcoded.

| Position | Where it renders |
|----------|------------------|
| `menu` | The main navigation, between the logo and the header buttons. Publish a [DC Theme - Menu](/dctheme/modules/menu) module here |
| `header-actions` | The right of the header, usually a call to action button |
| `switch` | The right of the header, after `header-actions` |

The phone number, social icons and the light and dark button can also be drawn in `header-actions` by setting their position on the Social and Features tabs – see [Extras](/dctheme/template/extras) and [Colours](/dctheme/template/colours#light-and-dark-mode).

## Top Bar

A thin bar above the header with a left and a right side. It appears only when something is in it.

| Position | Where it renders |
|----------|------------------|
| `topbar-l` | Left side of the top bar |
| `topbar-r` | Right side of the top bar |

The phone number, social icons and the light and dark button can be placed in either side by their own settings. Below 768px the two sides stack into one centred column.

## Mobile Menu

Below 992px the menu collapses into a button in the header, which opens a panel from the side.

| Position | Where it renders |
|----------|------------------|
| `offcanvas` | The menu in the panel. When empty, the panel reuses the modules in `menu`, and a DC Theme - Menu module there is shown vertically |
| `offcanvas-bottom` | Below the menu in the panel, for anything that is not navigation |

The panel can also hold call and WhatsApp buttons, the social icons and the light and dark button. The menu button only appears when the panel has something to show.

| Setting | Default | Description |
|---------|---------|-------------|
| Buttons in the offcanvas | Call, WhatsApp | Tick which buttons the panel shows. Each uses the number from the Identity tab and appears only when that number is set |

## Shown On

In the **Shown on** group, tick the screens each part appears on. Desktop is 992px and up, Tablet 768px to 991px, Phone below 768px.

| Setting | Default | Description |
|---------|---------|-------------|
| Top bar shown on | Desktop, Tablet, Phone | Clearing them all also hides `topbar-l` and `topbar-r` |
| Header shown on | Desktop, Tablet, Phone | The menu button lives in the header, so a screen without it has no navigation |
| Header buttons shown on | Desktop, Tablet | Anything published to `header-actions`. Off on phones is common |

## Widths

In the **Region widths** group:

| Setting | Default | Description |
|---------|---------|-------------|
| Top bar width | Container | **Container** holds the row to the container width. **Fluid** fills the screen but keeps the edge padding. **Full** drops that too |
| Header width | Container | Same choices as Top bar width |

**Container width** in the **Page and header** group sets how wide a Container row may grow – see [Layout](/dctheme/template/layout#widths).

The **Arrangement** group on the same tab shows a layout map of the whole page, where these switches and widths can also be set per screen.

## Next Steps

- [Layout](/dctheme/template/layout) – regions, widths and every position
- [Menu module](/dctheme/modules/menu) – dropdowns and mega panels
