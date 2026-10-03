# Pricing

**DC Theme - Pricing** shows a price table: one card per plan, with features, a button and an optional highlighted card. Amounts are formatted for the currency you choose.

A three-tier price table is one module with three plans, not three modules.

## Add a Price Table

1. Go to **Content → Site Modules → New** and choose **DC Theme - Pricing**
2. Add one row per plan under **Plans**
3. Publish it to `content-top` or `content-bottom`, or to a position read by a [Section](/dctheme/modules/section) module so it sits in a band with a heading

## The Plans

Each row in **Plans** is one card. Drag rows to reorder them.

| Setting | Default | Description |
|---------|---------|-------------|
| Plan name | Empty | What the option is called, such as Consultation or Full treatment |
| Amount | Empty | Digits only, no symbol or separators. Enter `150000` and it displays correctly for your currency. Decimals show only where there are any, so `95` shows as a round number and `49.99` does not |
| Period | Empty | Shown after the amount, such as `per visit` or `per month`. Leave empty for a one-off price |
| One-off fee | Empty | A setup, build or installation charge paid once, beside the recurring Amount. Leave empty if there is none |
| One-off fee, up to | Empty | When the one-off is quoted as a range, the top of the range |
| Recurring fee, up to | Empty | When the recurring fee is quoted as a range, the top of the range |
| Headline instead of the total | Empty | Replaces the headline figure with your own text |
| Small print | Empty | A short qualifier such as `starting from` or `including GST` |
| What is included | Empty | One feature per line. Each line becomes a row in the card |
| Highlight this card | No | Draws a brand-coloured border and makes the button solid. Use it on one card only |
| Badge | Empty | A short label above the plan name, such as `Most popular` |
| Button text | Empty | The card's button |
| Button link | Empty | Where the button goes |
| Button opens | Same tab | **Same tab** or **New tab**. A booking system on another site is usually better in a new tab |

A row with neither a name nor a price is skipped.

### One-Off and Recurring Fees

With a **One-off fee** filled in, the headline becomes the one-off and the Amount added together, labelled `to start`, and the card lists the two parts underneath: **Once** with the one-off, and **Then** with the Amount and its Period. When either part is a range, its row reads `X to Y`.

Where that total is a number nobody actually pays – for example a build quoted as a range beside a monthly fee – write the headline yourself in **Headline instead of the total**.

### Feature Lines

Each line of **What is included** can use `<strong>`, `<em>`, `<b>`, `<i>` and `<small>`. Any other markup is shown as text.

Add a note after a double pipe and it appears as a small info marker that shows the note on hover or focus:

```
Unlimited revisions || Within the agreed scope
```

## Money

| Setting | Default | Description |
|---------|---------|-------------|
| Currency | US Dollar (USD) | Sets the symbol, the separators and the decimal places on every price in this table. Six common currencies at the top, 40 in all |

## Layout

| Setting | Default | Description |
|---------|---------|-------------|
| Lakh and crore shorthand | No | Rupee prices of a lakh or more are written as `1.5 lakh` rather than `1,50,000`. Ignored for every other currency |
| Note under the table | Empty | One line under all the cards, for anything true of every plan, such as tax |
| Cards across | Automatic | **Automatic**, 2, 3 or 4. Automatic gives one column per plan, up to four. Cards stack below 768px and go at most two across until 992px |
| Plan name level | H3 | **H3**, **H4** or **No heading**. Use H3 under a band heading, H4 if the band heading is already an H3 |

## Next Steps

- [Section](/dctheme/modules/section) – put the table in a band with a heading
- [FAQ](/dctheme/modules/faq) – answer pricing questions below the table
