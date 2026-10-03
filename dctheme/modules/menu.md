# Menu

**DC Theme - Menu** renders a Joomla menu as a horizontal bar with dropdowns, a vertical list or an inline row, and can turn any dropdown into a wide mega panel built from modules.

## Add a Menu

1. Go to **Content → Site Modules → New** and choose **DC Theme - Menu**
2. Choose the **Menu** to show
3. Publish it to the position that suits the style:

| Use | Position | Menu style |
|-----|----------|------------|
| Main navigation | `menu` | Horizontal |
| Mobile panel, when it should differ from the header menu | `offcanvas` | Vertical |
| Sidebar or footer column | `sidebar-left`, `sidebar-right`, `footer-1` to `footer-6` | Vertical |
| Legal links beside the copyright | `copyright-l` or `copyright-r` | Inline |

A DC Theme - Menu in `menu` is reused in the mobile panel automatically, shown vertically, when nothing is published to `offcanvas`.

## Shape

| Setting | Default | Description |
|---------|---------|-------------|
| Menu style | Horizontal | **Horizontal** for a header, **Vertical** for a sidebar or footer, **Inline** for a copyright row |
| Separator | Space | Inline only. **Space**, **Dot**, **Vertical bar**, **Slash** or **Dash** |
| How submenus open | Click to expand | Vertical only. **Click to expand** suits a long menu, **Always open** suits a footer column. The current page's branch opens either way |

## Items

| Setting | Default | Description |
|---------|---------|-------------|
| Menu | Empty | The Joomla menu to show |
| Start from | The active page | Where the menu starts. The active page follows the visitor. The list offers every menu on the site, so pick an item from the menu chosen above |
| First level | 1 | The first menu level to show |
| Last level | 0 | How deep to go. Zero means all the way down |
| Include every branch | Yes | On, the menu carries the children of every item. Off, only the branch of the page being read |

## Mega Panels

A mega panel replaces an item's dropdown with a wide panel built from its sub-items, from modules published to a position you name, or both. Add one row per item under **Mega panels**.

| Setting | Default | Description |
|---------|---------|-------------|
| Menu item | Empty | The item whose dropdown becomes a panel |
| Panel holds | Sub-items | **Sub-items**, **Module position, then sub-items**, **Sub-items, then module position** or **Module position only**. An item with no sub-items always shows the position |
| Module position | Empty | Any position name you choose, such as `mega-services`. Nothing published there means no panel, and the item behaves normally |
| Columns | Automatic | **Automatic**, 2, 3 or 4 |
| Panel width | Automatic | **Automatic**, **Medium, 600px**, **Large, 900px**, **Content width** or **Full width of the page** |
| Panel alignment | From the item | **From the item**, **Centred on the item**, **Centred on the page** or **To the item's end**. A panel that would leave the screen is pulled back |

To fill a panel with modules:

1. Add a row under **Mega panels**, pick the menu item and type a position name, for example `mega-services`
2. Create the modules for the panel – a Custom module per column works well – and type `mega-services` into each one's **Position** field
3. Assign those modules to every page, or at least every page the menu shows on

## Next Steps

- [Header](/dctheme/template/header) – header layouts and the mobile panel
- [Layout](/dctheme/template/layout) – every position
