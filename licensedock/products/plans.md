# Plans & Pricing

A product has one or more plans. Each plan has one or more prices. Plans control how a license behaves; prices control how the customer is billed.

## Plans

| Field | Notes |
|-------|-------|
| Title | Plan name shown to customers (e.g. *Developer*) |
| Alias | URL slug, unique per product |
| Description | Short tagline shown under the plan title on the pricing card |
| Activation Type | `domain`, `device`, `seat`, or `instance` |
| Activation Limit | Max activations per license. `0` = unlimited |
| Features | List of bullet points shown on the pricing card |
| Recommended | Adds a *Recommended* badge to this plan's card |
| Recommended Label | Custom badge text (default *Recommended*) |
| Status | Published, Unpublished |

### Activation Type

The activation type controls what each activation represents and what the customer's app sends to the API.

| Type | Tracks | Example identifier |
|------|--------|--------------------|
| `domain` | Websites | `example.com` (protocol, `www.`, and path are stripped server-side) |
| `device` | Computers, phones, IoT | `MacBook-Pro-ABC123` (kept as-is) |
| `seat` | Individual users | `user@company.com` (lowercased) |
| `instance` | Server / container instances | `prod-api-01` (kept as-is) |

LicenseDock normalises identifiers based on type, so a customer activating from `https://www.Example.com/` and `example.com/path` end up sharing the same activation slot.

## Prices

| Field | Notes |
|-------|-------|
| Billing Cycle | `monthly`, `quarterly`, `semi_annual`, `annual`, or `one_time` |
| Price | Recurring price, or full price for `one_time` |
| Trial Days | `0` = no trial |
| Trial Price | Cost during the trial. `0` = free trial. Anything > 0 = paid trial |
| Status | Published, Unpublished |

### Billing Cycles

| Cycle | Behaviour |
|-------|-----------|
| `one_time` | One payment, no expiry. License is lifetime |
| `monthly` | Renews every month |
| `quarterly` | Renews every 3 months |
| `semi_annual` | Renews every 6 months |
| `annual` | Renews every year |

The billing cycle is the single source of truth for whether a price is recurring – `one_time` is the only non-recurring value.

You can offer the same plan with multiple cycles. For example a *Developer* plan with both monthly and annual prices – the customer picks at checkout.

### Trials

A trial is opt-in. The customer reaches checkout with `&trial=1` (from a buy link or *Start trial* CTA) and LicenseDock charges the trial price today. After `trial_days`, the regular price is billed on the chosen cycle.

- **Free trial** – `trial_price = 0`. Card is still required (Stripe and PayPal store it for the renewal; Mollie requires a minimum amount and will charge the equivalent of $0.50 to set up the mandate).
- **Paid trial** – `trial_price > 0`. Charged today, regular price on first renewal.
- Trial cannot be combined with a coupon. Applying a coupon clears the trial flag.

## Setting Up Prices

1. Open a plan
2. Click **Add Price**
3. Set the amount, billing cycle, and (optionally) trial settings
4. Save

## Buy Links

Each price has a **Copy buy link** button in admin. Append `&coupon=CODE` to pre-apply a coupon code, or `&trial=1` to launch the customer into a trial.

```
/checkout?plan_price_id=42
/checkout?plan_price_id=42&trial=1
/checkout?plan_price_id=42&coupon=LAUNCH20
```
