# Tax

LicenseDock charges tax by destination: the buyer's billing country (and, where it matters, their state or province) decides the rate. You list the places where you are registered to collect, and every other destination is not taxed.

Tax is off by default. While it is off, nothing about tax is charged or shown anywhere.

## Setting Up

1. Go to **Components → LicenseDock → Settings → Billing** and set **Enable tax** to **Yes** in the **Tax** card.
2. Choose the **Tax mode**, pricing and label (below) and save.
3. Go to **Components → LicenseDock → Taxes** and add a rate for each country where you are registered.
4. For EU VAT rules, enter your own EU VAT number as **Tax ID** in the **Invoice Settings** card on the same Billing tab.

## Tax Settings

**Settings → Billing → Tax**:

| Setting | Options | Default |
|---------|---------|---------|
| Enable tax | Yes / No. The master switch | No |
| Tax mode | **Rate table only** – charges exactly what you have listed. **EU VAT rules** – adds intra-EU reverse charge for verified business VAT numbers, and the cross-border setting below | Rate table only |
| Cross-border EU sales | Shown in EU VAT rules mode. **One-Stop Shop – charge the buyer's country rate**, or **Under €10,000 – charge my own country rate** | One-Stop Shop |
| Product prices are | **Tax-exclusive** – tax is added on top. **Tax-inclusive** – the price already includes it | Tax-exclusive |
| Tax label | **Automatic**, VAT, GST, Sales Tax, Tax. The word used for tax on product pages, checkout, the payment page and invoices, translated into the buyer's language | Automatic |
| Tax note on product page | **Automatic** – a line under prices such as "Plus VAT where applicable" or "Includes VAT where applicable". **Hidden** – no line | Automatic |

**Automatic** label resolves to VAT when your own Tax ID is an EU VAT number, and to Tax otherwise. The settings page shows what it currently resolves to.

The product-page note only appears when you collect tax in at least one country.

The card warns you when tax is on but no countries have been added, and, in EU VAT rules mode, when your own EU VAT number is missing.

## Tax Rates

**Components → LicenseDock → Taxes** lists where you collect tax. Each rate has:

| Field | Notes |
|-------|-------|
| Country | Where you are registered to collect tax |
| State / Province | Leave as **Country-wide** unless the rate differs in a particular state or province. Offered for countries with a state or province list |
| Rate (%) | Percentage, up to three decimals (e.g. `20`, `8.875`) |
| Status | Published or Unpublished |

The list ends with a fixed row: **All other countries – Not taxed**. There is no fallback rate. A destination without a published row is not taxed, and the checkout shows no tax line for it.

A rate of `0` is different from no row: it is a zero-rated sale, and the checkout and invoice show a 0% line.

### Importing Rates

The **Import rates** toolbar menu adds reference rates:

| Option | Adds |
|--------|------|
| Import EU rates | The standard VAT rate for each of the 27 EU countries you do not already have |
| Import Canadian rates | GST/HST for each Canadian province you do not already have. BC, Manitoba, Saskatchewan and Quebec are added at the 5% federal GST rate only. Raise them yourself if you are separately registered for PST or QST |

Existing rows are never changed. The imported rates carry the date they were compiled, shown at the foot of the list. Check them against your own advice.

### How a Rate Is Chosen

1. The buyer's billing country is the destination.
2. If there is a row for the buyer's state or province, it applies. Otherwise the country-wide row applies.
3. In EU VAT rules mode with **Under €10,000 – charge my own country rate**, a consumer in another EU country is charged your home country's rate. Buyers outside the EU are never affected.
4. No matching row: not taxed.

Rates, prices, discounts and tax are worked out on the server when the order is placed. The live figures on the checkout page are a preview of that same calculation.

## Tax-Exempt Prices

When tax is on, each plan price has a **Tax class** in the price editor:

| Option | Effect |
|--------|--------|
| Standard (taxed) | Taxed at the destination rate |
| None (tax-exempt) | Never taxed. Checkout and invoices say so in words, e.g. "VAT exempt" |

## Inclusive and Exclusive Pricing

Say your price is 100 and the buyer's country charges 10%:

| Mode | Buyer pays | You keep |
|------|-----------|----------|
| Tax-exclusive | 110 | 100 |
| Tax-inclusive | 100 | 90.91 |

With inclusive pricing a consumer pays the same price everywhere, and what you keep varies with the destination. Where you don't collect tax (a country with no rate row, or a reverse-charged business buyer), you keep all 100.

## Tax on the Checkout Page

The tax line changes live as the buyer picks a country, state or province, or enters a tax ID.

| Situation | Tax-exclusive | Tax-inclusive |
|-----------|---------------|---------------|
| Country not chosen yet | Tax row reads "(calculated from billing address)" | Nothing yet |
| Taxed | Row above the total: "VAT (20%)" and the amount | Note under the total: "Includes €16.67 VAT (20%)" |
| Zero-rated (0% row) | "VAT (0%)" row | "Includes €0.00 VAT (0%)" |
| Tax-exempt price | "VAT exempt" | "VAT exempt" |
| Country not in your rates | No tax row | No note |
| Reverse charge | "VAT (reverse charged)" row, no amount | "Reverse charge – you account for VAT" |
| Order total is 0 | No tax row | No note |

A signed-in customer's saved country and tax ID are used on first load, so a returning business buyer sees their result straight away.

## The Buyer's Tax ID

The billing **Tax ID** field takes the name used in the buyer's country: VAT number across the EU and in the UK, GSTIN in India, ABN in Australia, GST/HST number in Canada, EIN in the US, and others. Its placeholder shows a sample number in the local format.

- It is never required, because consumers have no tax ID.
- While tax is on it can't be hidden, even if the Checkout Fields setting says Hide.
- Only EU VAT numbers, in EU VAT rules mode, are checked. Any other tax ID is stored on the order and printed on the invoice as entered.

## EU VAT and Reverse Charge

In **EU VAT rules** mode, a business buyer in another EU country who enters a valid VAT number is not charged VAT. The invoice records that the buyer accounts for it.

All four conditions must hold:

1. Your own Tax ID (Settings → Billing → Invoice Settings) is an EU VAT number.
2. The buyer is billed in an EU member state, and the sale would otherwise be taxed under your rates.
3. The buyer is in a different member state from you, and their VAT number was issued by the country they are billed in.
4. The VAT number is confirmed by the EU's VIES service, and VIES returns a consultation number.

Sales to a business in your own country still carry VAT. Numbers with the XI (Northern Ireland) prefix are recorded but never reverse-charged.

What the buyer pays under reverse charge:

- **Tax-exclusive** – the listed price, with nothing added.
- **Tax-inclusive** – the listed price, carrying no VAT.

### What the Buyer Is Told

The message under the Tax ID field depends on the check:

| Message | Meaning | VAT charged |
|---------|---------|-------------|
| Verified: *company name* (or Verified) | Valid, cross-border, evidenced | No |
| Domestic sale – VAT applies | Valid, but the buyer is in your country | Yes |
| We couldn't verify this number. | VIES says the number is invalid | Yes |
| VAT number must match your billing country. | The number's country prefix differs from the billing country | Yes |
| We couldn't check this number right now, so VAT applies. | VIES was unreachable | Yes |
| Too many attempts. Try again in a minute. | More than 10 checks in 10 minutes from one IP | Yes |

A sale is never refused because VIES is down. VAT is charged, and the order is flagged:

- **Orders** list: filter **Tax check → Needs review**.
- **Store Health**: "Tax checks needing review" counts such orders from the last 90 days.

If the number later verifies, you can refund the VAT.

Each reverse-charged order stores the VIES consultation number as proof of the check.

## Tax on Invoices and Emails

The order stores its tax snapshot (rate, amount, inclusive or exclusive, and the outcome), so invoices show what was charged at the time, whatever settings change later.

| Outcome | Invoice shows |
|---------|---------------|
| Taxed | The tax label with its rate, e.g. "VAT (20%)", and the amount. Inclusive invoices show the tax as contained in the total |
| Zero-rated | "VAT (0%)" |
| Exempt | "VAT exempt", no amount |
| Reverse charge | "VAT (reverse charged)" and the statement "Reverse charge – VAT to be accounted for by the recipient" |
| Not collected | No tax line |

The buyer's tax ID appears on the invoice. Reverse-charge wording always says VAT, whatever your **Tax label** setting.

Subscription renewals, proration charges and plan changes reuse the tax context from the original order: the same rate, the same inclusive or exclusive treatment and the same outcome.

See [Invoices](/licensedock/invoices/).

## Tax Report

**Components → LicenseDock → Tax Report** shows tax collected per country for a **Month**, **Quarter** or **Year**, in **Live** or **Test** mode.

- EU destinations are grouped under "EU destinations – the figures an OSS return is made from", with a total. Other destinations are listed separately.
- Columns: Country, Net, Tax, Charges.
- Figures come from issued invoices. Refunds are subtracted in the quarter their credit note was issued. Reverse-charged sales carry no tax and don't appear.
- **Export** downloads the visible period when it has rows.
