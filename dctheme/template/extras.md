# Extras

Smaller features of the template, set in **System → Site Template Styles → DC Theme - Default**.

## Contact Numbers

The phone and WhatsApp numbers are entered once, in the **Contact** group on the **Identity** tab, and used everywhere the template needs them.

| Setting | Default | Description |
|---------|---------|-------------|
| Phone | Empty | With the country code, or it will not dial from abroad. Punctuation is ignored |
| WhatsApp number | Empty | With the country code, or the link goes nowhere. Punctuation is ignored |

The phone number feeds the **Call** button in the mobile menu panel. To show it as a link elsewhere, use these settings on the **Social** tab:

| Setting | Default | Description |
|---------|---------|-------------|
| Show the phone number | Nowhere | `topbar-l`, `topbar-r`, `header-actions`, `copyright-l`, `copyright-r`, `footer-1`, `footer-2`, `footer-3` or **Nowhere** |
| Phone number position on a phone | Same as above | A different place below 992px, where the menu becomes a button |

## Back to Top

On the **Features** tab, in the **Floating buttons** group:

| Setting | Default | Description |
|---------|---------|-------------|
| Back to top button | Yes | Appears once the visitor scrolls past the first screen |

## WhatsApp Button

| Setting | Default | Description |
|---------|---------|-------------|
| Floating WhatsApp button | Yes | A round WhatsApp button in the corner. Needs the WhatsApp number on the Identity tab. Without one it draws nothing |
| WhatsApp message | `Hi, I'd like to know more` | The message the chat opens with. The page title is added on a new line, so you know which page the visitor wrote from |

When both floating buttons are on, back to top sits above the WhatsApp button.

## Social Profiles

On the **Social** tab, fill in the profiles you use. Empty fields draw nothing.

| Setting | Default | Description |
|---------|---------|-------------|
| Facebook, Instagram, YouTube, LinkedIn, X, TikTok, Pinterest, Threads, Telegram, Google Business Profile | Empty | The full profile URL. Icons appear in this order |
| Include WhatsApp | No | Adds a WhatsApp icon to the row, using the number from Identity. Separate from the floating button |
| Show the icons | above the copyright | **above the copyright**, `footer-1` to `footer-6`, `copyright-l`, `copyright-r`, `topbar-l`, `topbar-r`, `header-actions`, `offcanvas` or **Nowhere** |
| Social icons position on a phone | Same as above | A different place below 992px. The mobile menu panel is where a row of icons has room on a narrow screen |

An icon row placed in a footer position creates that footer column on its own, even with no module published there.

## Reveal on Scroll

On the **Features** tab, in the **Motion** group:

| Setting | Default | Description |
|---------|---------|-------------|
| Reveal sections on scroll | Yes | Sections fade up as they come into view. Visitors who ask their device for reduced motion always get a still page |
| How much movement | Balanced | **Subtle**, **Balanced** or **Expressive**. How far each section travels and how long it takes |

Section bands, pricing tables, testimonials and the article card grids animate already. To animate your own content, switch the editor to code view and add `data-dc-reveal` to the tag:

```html
<div data-dc-reveal="up">Arrives when the visitor scrolls to it</div>
```

| Value | Movement |
|-------|----------|
| `up` | Slides up |
| `down` | Slides down |
| `start` | Slides in from the start side (left in a left-to-right language) |
| `end` | Slides in from the end side |
| `zoom` | Grows slightly into place |
| `fade` | Fades in with no movement |

To make a row arrive one item at a time, put `data-dc-reveal-group` on the wrapper. Each child still needs its own `data-dc-reveal`:

```html
<div class="row" data-dc-reveal-group>
  <div class="col" data-dc-reveal="up">First</div>
  <div class="col" data-dc-reveal="up">Then this</div>
</div>
```

Items in a group follow each other 80ms apart. Set a different step in milliseconds with `data-dc-reveal-group="120"`. To delay one element, add `data-dc-reveal-delay="200"` to it.

With **Reveal sections on scroll** off, the attributes do nothing and can stay in your content.

## Your Own CSS and JavaScript

For styles the settings do not cover, create this file:

```
media/templates/site/dctheme/css/user.css
```

and for scripts:

```
media/templates/site/dctheme/js/user.js
```

Both are loaded automatically when they exist, after the template's own files, so your rules win. Neither file ships in the package, so an update never overwrites them.

On a child template, put them under the child's own folder instead, for example `media/templates/site/dctheme_child/css/user.css`.

`user.css` can also adjust the reveal motion beyond the three presets:

```css
:root { --dc-reveal-shift: 2rem; --dc-reveal-ease: ease-out; }
```

## Reference Tab

The **Reference** tab is documentation only – nothing on it is saved. It lists the class names DC Theme adds for content, such as `dc-list`, `dc-lead`, `dc-figure`, `dc-stat` and `dc-step`, with examples, plus the `user.css` and `user.js` paths.

## Next Steps

- [Hero Banner](/dctheme/modules/hero) – the first module most pages need
- [Section](/dctheme/modules/section) – build pages from bands
