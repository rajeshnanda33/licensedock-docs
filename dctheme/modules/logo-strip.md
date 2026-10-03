# Logo Strip

**DC Theme - Logo Strip** shows partner, sponsor, client or accreditation logos as a row, or as a scrolling row that keeps moving.

## Add a Logo Strip

1. Go to **Content → Site Modules → New** and choose **DC Theme - Logo Strip**
2. Add the logos, or choose a folder
3. Publish it to a position read by a [Section](/dctheme/modules/section) module, or straight to `content-top` or `content-bottom`

## The Logos

| Setting | Default | Description |
|---------|---------|-------------|
| Logo source | Chosen logos | **Chosen logos** lets each carry a name and a link. **Folder** shows everything in it and needs no edit when a logo is added, but can give neither a link nor a typed name |
| Folder | – Choose a folder – | Folder only. Every folder under `images/`, shown in name order |
| Logos | Empty | Chosen logos only. One row per organisation with **Logo**, **Name** and **Link**. Drag rows to reorder |
| Links open | New tab | Chosen logos only. **Same tab** or **New tab**. Applies to every logo with a link |

**Name** is read out in place of the image. Leave it empty only where the logo is decoration and the name appears nearby.

In a folder, each file's name becomes the organisation's name: `acme-corp.svg` reads as Acme Corp. A number in front sets the order and is not read out, so `01-acme-corp.svg` comes first.

SVG or PNG on a transparent background works best.

## Layout

| Setting | Default | Description |
|---------|---------|-------------|
| Show as | A row | **A row** wraps and centres, which suits a handful. **Scrolling row** keeps moving, which suits enough logos that the movement says there are more |
| Logo height | Medium | **Small** (32px), **Medium** (48px), **Large** (64px) or **Custom**. Every logo is set to the same height and keeps its own width |
| Logo height in pixels | 48 | Custom height, between 16 and 200 |
| Colour | Grey, colour on hover | **Grey, colour on hover** or **Their own colours**. Use their own colours where a sponsor has asked for them |
| Pause button | Always | Scrolling row only. **Always**, **On hover** or **Hidden**. Hidden, the button still works by keyboard and screen reader, but not for someone on a phone |
| Speed | Medium | Scrolling row only. **Slow**, **Medium** or **Fast**. Timed per logo, so adding one makes the row longer, not faster |

## Next Steps

- [Testimonials](/dctheme/modules/testimonials) – customer quotes
- [Section](/dctheme/modules/section) – put the logos in a band with a heading
