# Hero Banner

**DC Theme - Hero Banner** is the headline band at the top of a page: an eyebrow, a headline, supporting text and up to two buttons, with a picture, a video, another module or nothing beside the words.

## Add a Hero

1. Go to **Content → Site Modules → New** and choose **DC Theme - Hero Banner**
2. Set the position to `hero`
3. Fill in the settings below
4. On the **Menu Assignment** tab, pick the pages that should show it

Use one hero per page. The `hero` band is full width by default – see [Layout](/dctheme/template/layout#widths).

## Shape

| Setting | Default | Description |
|---------|---------|-------------|
| What goes with the words | A picture | **A picture**, **A video**, **Another module** or **Nothing**. Pick this first: it decides which settings below appear |
| Where it goes | Beside the words | **Beside the words**, **Beside, on the left**, **Below the words** or **Behind the words**. Hidden when the companion is Nothing |
| Shading behind the words | 62 | Behind the words only. How much black is laid over the picture or video, as a percentage from 20 to 95. 62 keeps white text readable on a white photo; a dark picture carries the words at 40 or less |
| Module position | `hero-form` | Another module only. Publish a module to this position and it appears in a panel beside or below the words |
| Width | Same width as the words | Below the words only. **Full width** runs the picture or video across the whole band and crops it to a set height |
| Background | Page background | **Page background**, **Surface tint** or **Brand colour**. The text on Brand is picked to stay legible |

**Behind the words** needs a picture or an uploaded video. With a YouTube or Vimeo link, another module or nothing, the hero falls back to **Beside the words**, and the form warns you before you save.

### A Form Beside the Words

Joomla has no form module of its own. Set **What goes with the words** to **Another module**, then publish your form extension's module to the `hero-form` position, assigned to the same pages. Any module works there – the sample data puts a Custom module with contact details in it.

## Words

| Setting | Default | Description |
|---------|---------|-------------|
| Eyebrow | Empty | Small line above the headline, such as a sector or location |
| Headline | Empty | The main promise. Short works better than complete |
| Headline level | Heading 1 | **Heading 1**, **Heading 2**, **Heading 3** or **Plain text**. Heading 1 on the home page. Elsewhere the page title is already the Heading 1, so use Heading 2 |
| Supporting text | Empty | An editor field for a sentence or two under the headline |

## The Picture

Shown when **What goes with the words** is A picture.

| Setting | Default | Description |
|---------|---------|-------------|
| Image | Empty | Behind the words uses it full bleed, so pick something that still reads with a dark wash over it |
| Image description | Empty | Alt text for screen readers. Leave empty only if the image is purely decorative |

## The Video

Shown when **What goes with the words** is A video.

| Setting | Default | Description |
|---------|---------|-------------|
| Video from | A file on this site | **A file on this site** or **YouTube or Vimeo** |
| Video | Empty | An MP4 file. Keep it short and compress it well |
| Video link | Empty | The ordinary link from the address bar, such as `youtube.com/watch?v=...`, `youtu.be/...` or `vimeo.com/...`. No embed code needed |
| Video poster | Empty | The still shown before play. Falls back to the hero image when empty |
| Image description | Empty | Describes the video for screen readers |

A YouTube or Vimeo video loads nothing from those sites until the visitor presses play, and then plays from `youtube-nocookie.com` or with Vimeo's do-not-track option. An uploaded video behind the words plays as a background, with a button to stop it.

## Buttons

| Setting | Default | Description |
|---------|---------|-------------|
| Button text | Empty | The main button. Leave empty for no button |
| Main button colour | Brand | **Brand** or **Accent**. Keep the accent for the one action that matters most |
| Button link | Empty | Where the main button goes |
| Button icon | Empty | A Bootstrap Icons name shown before the text, such as `arrow-right`. Needs **Bootstrap Icons** on in the template style |
| First button opens | In this tab | **In this tab** or **In a new tab** |
| Second button text | Empty | An optional second, outlined button |
| Second button link | Empty | Where the second button goes |
| Second button icon | Empty | A Bootstrap Icons name, such as `whatsapp` or `telephone` |
| Second button opens | In this tab | **In this tab** or **In a new tab** |

A button only shows when it has both text and a link. A new tab suits a booking system or another site. Keep pages on your own site in the same tab.

## Next Steps

- [Section](/dctheme/modules/section) – the bands below the hero
- [Typography](/dctheme/template/typography#icons) – switch on Bootstrap Icons
