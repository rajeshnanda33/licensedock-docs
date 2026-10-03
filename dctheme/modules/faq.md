# FAQ

**DC Theme - FAQ** shows questions and answers as an accordion, and writes FAQ structured data for you.

## Add an FAQ

1. Go to **Content → Site Modules → New** and choose **DC Theme - FAQ**
2. Add one row per question under **Questions**
3. Publish it to `content-top` or `content-bottom`, or to a position read by a [Section](/dctheme/modules/section) module so it sits in a band with a heading

## The Questions

Drag rows to reorder them. A row missing either the question or the answer is skipped.

| Setting | Default | Description |
|---------|---------|-------------|
| Question | Empty | Ask it the way a visitor would. Plain text, no formatting |
| Answer | Empty | An editor field. Answer the question in the first sentence, then add detail. Links and lists are fine |
| Open to begin with | No | Shows this answer already expanded. Useful on the one question everybody asks |

## Behaviour

| Setting | Default | Description |
|---------|---------|-------------|
| Answers open | One at a time | **One at a time** keeps the list short enough to scan. **Any number** suits a page where people compare answers |
| Question level | H3 | **H2**, **H3** or **H4**. Questions are headings, so a screen reader can jump between them. Use H3 under a band heading, H4 if the band heading is already an H3 |
| Add FAQ structured data | Yes | Writes FAQPage markup describing the questions. Turn it off if the same questions are already marked up elsewhere on the page |

:::info
Google stopped showing FAQ rich results in May 2026, so the markup no longer changes how the page looks in Google. It is still valid, and other search and AI systems read it.
:::

## FAQ in a Custom Field

For questions that belong to one article, use a subform custom field instead: put `dc-faq` in the field's **Render Class** and the template renders it as an accordion with FAQ structured data. The first value in each row is the question, the rest is the answer.

## Next Steps

- [Section](/dctheme/modules/section) – put the questions in a band with a heading
- [Pricing](/dctheme/modules/pricing) – a price table above the questions
