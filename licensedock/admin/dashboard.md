# Dashboard & Store Health

## Dashboard

**Components → LicenseDock → Dashboard** is the component's start page. It shows sales figures for a chosen period, and an **Attention Needed** bar when something needs a look.

### Period and Mode

| Control | Options |
|---------|---------|
| Mode | **Live** or **Test**. Test orders never mix with live figures |
| Period buttons | Today, 7D, 30D, 90D, 12M |
| Period menu | This Month (default), This Year, Last Month, Last Year, All Time, or a custom date range |
| Reporting currency | Appears only when the store holds data in more than one currency. Every figure – money and counts – follows the selected currency |

Where a comparison period exists, the figures show the change against the previous period of the same length.

### Figures

| Tile | What it counts |
|------|----------------|
| Total Revenue | Paid invoices in the period, excluding tax and credit notes, by invoice date. Renewals and plan-change charges are included. Refunds in the period are shown underneath |
| Tax Collected | Tax on the same paid invoices. Shown only while tax is enabled |
| Abandoned | Unpaid checkouts that have had at least one recovery email, and their total value. Counts every such checkout open now, whatever the period |
| New Orders | Completed new orders in the period, with the number of renewals underneath |
| New Customers | Customer records created in the period |
| New Subscriptions | Subscriptions started in the period. Cancellations and expiries in the period, and the churn rate, are shown underneath |
| Active Subscriptions | Subscriptions active now |

Tiles that link through open the matching filtered list – for example **Total Revenue** opens the paid invoices.

The churn rate is the share of paid subscriptions active at the start of the period that were lost during it. It is shown once at least 10 subscriptions were active at the start.

Below the tiles are a **Revenue** chart, a **Top Products** table and a **Revenue by Product** chart for the same period.

### Attention Needed

The bar at the top lists issues as badges. Each badge links to the screen where you can deal with it.

| Badge | Links to |
|-------|----------|
| Suspended subscriptions | Subscriptions filtered to Suspended |
| Store health issues | Store Health |

The badges count live data only. The Store Health badge comes from the last time the health check was run, so run it again after fixing something.

## Store Health

**Components → LicenseDock → Store Health** checks the store's setup and background processing. Click **Run Health Check** to run it; the page shows when it last ran. Each check passes, warns or fails, and most failing checks link to the screen that fixes them.

| Group | Checks |
|-------|--------|
| Store | Store name, HTTPS, currency |
| Plugins | The web services, user, task and page cache plugins are enabled |
| License | LicenseDock activation, and whether you run the latest version |
| Payment Gateways | At least one gateway enabled; each gateway's mode, connection and webhook secret; the webhook base URL host; webhook processing over the last 7 days; the last webhook received per gateway |
| Tax | Tax rates, your tax number, rate drift, price display, EU VAT settings, and tax checks needing review. Shown only while tax is enabled |
| Products | Published products, every product has plans, every plan has prices |
| Downloads | Download folder exists and is writable, protected files are not publicly reachable, downloadable files, bundles deliver files, versions with no files, file integrity |
| Orders | Stuck pending orders, licensed items have licenses issued, historical orders imported into Invoices, plan-change payments awaiting review |
| Subscriptions | No orphaned active subscriptions, past-due subscriptions within grace, renewals, expiries and trials happening on schedule, subscriptions on disabled gateways, gateway pricing matches |
| Email | Joomla mail sending or the custom SMTP host and port, delivery rate over the last 7 days, queued emails |
| Scheduled Tasks | Each LicenseDock task exists, is enabled and has run recently |

For scheduled tasks, "recently" means within 15 minutes for the email queue and within 120 minutes for reminders and abandoned checkout recovery. The abandoned checkout task is only checked while recovery is enabled.

## Clearing Test Data

**Components → LicenseDock → Cleanup** removes every test order and everything under it: order items, payments and refunds, invoices and credit notes, subscriptions, licenses and license activations. The screen shows the counts before you confirm.

- Live orders are never touched
- Coupon uses made by test orders are given back
- Joomla accounts created by test checkouts are left alone – the screen links to **Users** so you can review them
- There is no undo
