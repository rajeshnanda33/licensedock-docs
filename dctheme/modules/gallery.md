# Gallery

**DC Theme - Gallery** shows photos as a grid or a slider, both with a built-in lightbox. Point it at a folder, or pick the images one by one.

## Add a Gallery

1. Go to **Content → Site Modules → New** and choose **DC Theme - Gallery**
2. Choose a folder or add images
3. Publish it to `content-top` or `content-bottom`, a sidebar, or a position read by a [Section](/dctheme/modules/section) module

## The Photos

| Setting | Default | Description |
|---------|---------|-------------|
| Image source | Folder | **Folder** shows everything in it, so adding a photo needs no edit here. **Chosen images** sets the order and lets each photo carry a description |
| Folder | – Choose a folder – | Every folder under `images/`, shown in name order. Photos added to it later appear on their own |
| Images | Empty | Chosen images only. One row per photo with **Image** and **Description**. Drag rows to reorder |

**Description** is the photo's alt text for screen readers and its caption when opened full size. A folder cannot carry descriptions, so choose the images one by one when screen readers need them.

## Layout

| Setting | Default | Description |
|---------|---------|-------------|
| Show as | A grid | **A grid** shows every photo at once. **One at a time** is a slider that suits a few large photos or a narrow position |
| Columns | 3 | Grid only. 2 to 6 across from 992px up. Below 768px it is always two, and between the two it is at most three |
| Image shape | Landscape | Grid only. **Landscape**, **Square**, **Portrait** or **Wide**. Every tile is cropped to one shape. The full picture is never cropped in the lightbox |
| Thumbnails | Plain | Grid only. **Plain** or **With a border**. A border helps photos that are light at the edges |
| Slider height | Medium | Slider only. **Short** (320px), **Medium** (420px), **Tall** (560px), **Very tall** (720px) or **Custom**. Nothing is cropped, so this sets how large the picture can show. Narrow screens get a shorter box |
| Height in pixels | 420 | Custom slider height, between 160 and 1200 |

## Opening Them

| Setting | Default | Description |
|---------|---------|-------------|
| Open images full size | Yes | Clicking a photo opens it over the page, with arrow keys, swipe and Escape to close. Off, the gallery loads no JavaScript at all |
| Loop | No | After the last photo, go round to the first instead of stopping |

## Next Steps

- [Logo Strip](/dctheme/modules/logo-strip) – a row of partner logos
- [Section](/dctheme/modules/section) – put the gallery in a band with a heading
