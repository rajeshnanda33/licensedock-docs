# Testimonials

**DC Theme - Testimonials** shows customer quotes as a grid, a carousel or a scrolling row, each with an optional photo and star rating.

## Add Testimonials

1. Go to **Content → Site Modules → New** and choose **DC Theme - Testimonials**
2. Add one row per quote under **Testimonials**
3. Publish it to a position read by a [Section](/dctheme/modules/section) module, so the quotes sit in a band with a heading, or straight to `content-top` or `content-bottom`

## The Quotes

Drag rows to reorder them. Put the strongest first: it is the one most people read. A row with no quote is skipped.

| Setting | Default | Description |
|---------|---------|-------------|
| Quote | Empty | What the customer said, in their words. Two or three sentences reads better than a paragraph |
| Name | Empty | Who said it |
| Role or place | Empty | Such as a job title, or the area they live in |
| Photo | Empty | An optional photo of the customer |
| Stars | None | **None**, or 1 to 5 in half steps |
| Language | Empty | Only for a quote not in the site's language: its language code, such as `de`, `fr` or `it`. Screen readers then read it in that language |
| Translation | Empty | Shown when Language is set. Shown under the quote, marked as a translation |

## Layout

| Setting | Default | Description |
|---------|---------|-------------|
| Show as | A grid | **A grid** suits many short quotes. **One at a time**, **Centre stage** and **Scrolling row** suit a few longer ones |
| Columns | Automatic | Grid only. **Automatic**, 2, 3 or 4 across on a wide screen. Cards stack on phones |

## Movement

Shown for One at a time, Centre stage and Scrolling row.

| Setting | Default | Description |
|---------|---------|-------------|
| Autoplay | 6 seconds | One at a time and Centre stage. **Off**, **4 seconds**, **6 seconds** or **9 seconds**. Holds while the pointer or keyboard is on it, stops for good once the visitor uses the arrows or dots, and never starts for visitors who ask for less motion |
| When to show the controls | Always | **Always**, **On hover** or **Hidden**. On hover is ignored on touch screens. Hidden keeps the controls working for a keyboard and screen reader |
| Loop | Yes | One at a time and Centre stage. After the last quote, go round to the first. Off, the arrows grey out at each end |
| Speed | Medium | Scrolling row only. **Slow**, **Medium** or **Fast**. Timed per card, so more quotes make the row longer, not faster |

## Search Results

| Setting | Default | Description |
|---------|---------|-------------|
| Add review structured data | No | Writes Review and AggregateRating markup for every quote that has stars and a name |
| What is reviewed | A product | **A product**, **Software or an app**, **A course**, **An event** or **A book** |
| Its name | Empty | The product, course or event the reviews are about, as named on the page. Leave empty and no markup is written |

Use review markup only when the quotes are reviews of the thing named, from people who bought or used it. Google shows no stars for reviews a business publishes about itself, which is why a company or local business cannot be chosen.

## Next Steps

- [Section](/dctheme/modules/section) – put the quotes in a band with a heading
- [Logo Strip](/dctheme/modules/logo-strip) – client logos beside the quotes
