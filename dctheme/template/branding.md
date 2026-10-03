# Branding

Logos, icons, the site name and the copyright line are set on the **Identity** tab of **System → Site Template Styles → DC Theme - Default**.

## Logos and Icons

| Setting | Default | Description |
|---------|---------|-------------|
| Logo | Empty | The header logo. Without one, the site name is shown as text |
| Logo (dark backgrounds) | Empty | Optional light version, used in dark mode. Both logos are in the page and CSS picks one, so the right logo shows on the first paint |
| Site name | Empty | Shown in place of a missing logo, and used as the logo's alt text. Empty uses the Site Name from Global Configuration |
| Sharing image | Empty | Shown when someone shares a link on WhatsApp or Facebook. Around 1200 by 630 pixels |
| Favicon | Empty | An SVG is sharpest. A 512x512 PNG works everywhere |
| Home screen icon | Empty | Only needed if your favicon is an SVG, which iOS cannot use. A 180x180 PNG with no transparency |

Any logo shape works. The template measures the file and reserves its exact space, so the header does not jump while the logo loads.

A `favicon.ico` placed in `media/templates/site/dctheme/` is picked up on its own. When the favicon is a PNG, JPG or WebP and **Home screen icon** is empty, the favicon is used as the home screen icon too.

## Share Image

The template writes Open Graph and Twitter card tags on every page. The image is chosen in this order:

1. On an article, the **Social image** custom field (added by the package in the **DC Theme** field group), then the article's full text image, then its intro image
2. On a category blog or list, the category's image
3. On a contact page, the contact's image
4. The **Sharing image** from the Identity tab
5. The **Logo**

Fill in the image description on the Social image field or category image and it is written as the image's alt text for the share card.

## Copyright Line

The copyright line in the footer is built from the **Copyright** group on the Identity tab, in this order: **Before ©**, the © symbol, the year, the business name, then **After the name**.

| Setting | Default | Description |
|---------|---------|-------------|
| Business name | Empty | The name the copyright line opens with. Empty uses the Site Name from Global Configuration |
| Year | YYYY | `YYYY`, `YYYY-YYYY`, `YYYY-YY` or **No year**. The year updates itself |
| Start year | Empty | Shown for the two range formats. The year the business started. This year or later prints one year, not a range |
| Before © | Empty | Usually left empty. Type `Copyright` here to get `Copyright ©` |
| After the name | Empty | Added after the name and year. Type `All rights reserved.` here if you want it |

With the defaults the line reads `© 2026 Your Business.`

`YYYY-YY` prints the full end year when the two years are in different centuries, so 1999 gives `1999-2026`.

Which side of the footer's bottom row the line sits on is set by **Copyright line** on the **Social** tab:

| Setting | Default | Description |
|---------|---------|-------------|
| Copyright line | copyright-l | `copyright-l`, `copyright-r` or **Nowhere**. Choose Nowhere to write your own line in a module published to `copyright-l` or `copyright-r` |

## Remove the Generator Tag

On the **Features** tab:

| Setting | Default | Description |
|---------|---------|-------------|
| Remove Joomla generator tag | Yes | Removes the `Joomla! - Open Source Content Management` meta tag from every page |

## Next Steps

- [Colours](/dctheme/template/colours) – palettes, custom colours and dark mode
- [Typography](/dctheme/template/typography) – fonts and sizes
