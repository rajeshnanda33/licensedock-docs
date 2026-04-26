# Quick Start

Get a product live and take a test payment. Five minutes, assuming you've already set the store currency and at least one gateway in [Configuration](/licensedock/getting-started/configuration).

## 1. Create a Product

1. Go to **Components → LicenseDock → Products → New**
2. Fill in **Title**, **Alias** (auto-generates from title), and **Description**
3. Set **Status** to *Published*
4. Save

## 2. Add a Plan

A plan is a tier of the product (e.g. *Single Site*, *Developer*, *Agency*).

1. On the product edit page, click **Add Plan**
2. Set the plan **Title**
3. Pick an **Activation Type** – `domain`, `device`, `seat`, or `instance` – this controls what each activation represents
4. Set the **Activation Limit** (`0` = unlimited)
5. Save

## 3. Add a Price

Each plan has one or more prices.

1. On the plan edit page, click **Add Price**
2. Set the **Amount**
3. Pick a **Billing Cycle** – `monthly`, `quarterly`, `semi_annual`, `annual`, or `one_time`
4. Optionally set **Trial Days** and **Trial Price** (set trial price to 0 for a free trial)
5. Save

You can offer the same plan with multiple billing cycles (e.g. monthly and annual) – the customer picks one at checkout.

## 4. Upload a Download (Optional)

If your product is software, attach the file:

1. On the product edit page, open the **Downloads** tab
2. Click **Add Download**
3. Set the **Version** (e.g. `1.0.0`) and **Changelog**
4. Upload one or more files (you can label each – Windows, macOS, Source, etc.)
5. Save

## 5. Create a Menu Item

LicenseDock needs at least a Checkout menu item to handle payments.

1. **Menus → Main Menu → New**
2. Pick **LicenseDock → Checkout** (you can hide it from the menu – the URL just needs to exist)
3. Save

Add a **LicenseDock → Product** menu item if you want a public product page. Otherwise customers reach checkout via a direct buy link from the plan/price (Copy buy link button in admin).

## 6. Make a Test Purchase

1. Visit the product page (or use the buy link from the plan)
2. Click **Buy Now**
3. Complete checkout using your gateway's test credentials – Stripe accepts `4242 4242 4242 4242` with any future expiry and CVC
4. The order, subscription, and license appear under **Components → LicenseDock**

## What Happens Behind the Scenes

On a successful payment LicenseDock:

1. Marks the order completed and assigns a sequential invoice number
2. Generates a license key (if the plan requires one) and links it to the order
3. Creates a subscription record (for recurring prices)
4. Queues the purchase confirmation email and admin notification
5. Renders an on-demand PDF invoice

## Next Steps

- [Plans & Pricing](/licensedock/products/plans) – activation types and billing cycles in detail
- [Payment Gateways](/licensedock/gateways/stripe) – Stripe, PayPal, Mollie setup
- [API Reference](/licensedock/api/) – integrate license checks into your software
