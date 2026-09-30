# Tags

Tags group products into categories for the products listing and for tag pages.

## Creating Tags

Go to **Components → LicenseDock → Tags → New**.

| Field | Default | Notes |
|-------|---------|-------|
| Title | – | Required. Tag name, such as *Joomla Extensions* |
| Alias | – | URL slug, generated from the title when left blank |
| Description | – | Plain text shown at the top of the tag page |
| Image | – | Optional image shown at the top of the tag page |
| Status | Unpublished | Published, Unpublished, Archived, Trashed |
| Ordering | 0 | Position in the tag filter dropdown |

## Assigning Tags

Open a product and pick one or more tags in the **Tags** field in the sidebar of the **Details** tab.

## Tag Pages

Create a menu item that lists the products with one tag:

1. **Menus → New**
2. Menu item type: **LicenseDock → Products**
3. Set **Filter by Tag** to the tag
4. Save

The page lists only products with that tag. The tag's image and description appear above the list, the tag title is added to the breadcrumb, and the tag title is used as the page heading unless the menu item sets its own.

Use this to build category pages such as *Joomla Extensions*, *WordPress Plugins* or *Themes* from one catalogue.

## Tag Filter on the Products Page

The products listing has a tag dropdown in its toolbar. It lists published tags that have at least one published product, so empty tags stay hidden. Choosing a tag reloads the listing with a `tag` parameter holding the tag ID, such as `?tag=3`.

## Translations

Tag title and description are translatable. See [Translations](/licensedock/products/translations).
