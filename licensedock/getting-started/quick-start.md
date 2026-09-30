# Quick Start

Get a product live and take a test payment. This assumes you have set the store currency in [Configuration](/licensedock/getting-started/configuration) and entered test credentials for at least one gateway under **Components → LicenseDock → Payment Gateways**.

## 1. Create a Product

1. Go to **Components → LicenseDock → Products → New**
2. Fill in **Title** (the alias is generated from it) and the description
3. On the **Details** tab, leave **Requires License** on if the product needs a license key
4. Publish and save

Plans and downloads can only be added once the product has been saved.

## 2. Add a Plan

A plan is a tier of the product (e.g. *Single Site*, *5 Sites*, *Unlimited*).

1. Open the **Plans & Pricing** tab and click **Add Plan**
2. Set the plan **Title**
3. Pick an **Activation Type** – Domain, Device, Seat or Instance – which decides what each activation represents
4. Set the **Activation Limit** (`0` = unlimited)
5. Click **Apply**

## 3. Add a Price

Each plan has one or more prices.

1. On the plan card, click **Add Price**
2. Pick a **Billing Cycle** – Monthly, Quarterly, Semi-Annual, Annual or One-Time
3. For One-Time, choose the **Access Duration**: Lifetime, or Valid For a number of days, weeks, months or years
4. Set the **Price**
5. Optionally set **Trial Days** and **Trial Price** (`0` for a free trial)
6. Click **Apply**

Give a plan several prices to offer, for example, monthly and annual billing. See [Plans & Pricing](/licensedock/products/plans).

## 4. Upload a Download (Optional)

If the product is a file or software:

1. Open the **Downloads** tab and click **Add Version**
2. Set the **Version** and **Release notes**
3. Upload one or more files
4. Save

See [Downloads](/licensedock/products/downloads).

## 5. Create a Checkout Menu Item

1. **Menus → Main Menu → New**
2. Menu Item Type: **LicenseDock → Checkout**
3. Save. The item can be hidden from the menu – the URL just needs to exist

Add a **LicenseDock → Single Product** or **Products** menu item for a public product page. Without one, customers can reach checkout through a buy link: **Copy buy link** on each price copies a checkout URL for it.

## 6. Make a Test Purchase

1. Open the product page, or paste the buy link into a browser
2. Click **Buy Now**
3. Pay with your gateway's test credentials – Stripe accepts `4242 4242 4242 4242` with any future expiry date and CVC
4. The order, invoice, license and (for recurring prices) subscription appear under **Components → LicenseDock**

Test orders are marked as test and kept out of the live figures on the [Dashboard](/licensedock/admin/dashboard). **Cleanup** in the LicenseDock menu deletes them all when you are done.

## What Happens on a Successful Payment

1. The order is marked completed
2. A purchase invoice is issued with the next sequential number
3. A license key is generated for each product that requires one
4. A subscription is created for recurring prices
5. The `purchase_confirmation` email is sent with the invoice PDF attached, and `admin_new_order` goes to the admin addresses

A guest buyer gets a Joomla account created in the background. The receipt carries the link to set a password for it.

## Next Steps

- [Plans & Pricing](/licensedock/products/plans) – activation types and billing cycles in detail
- [Payment Gateways](/licensedock/gateways/stripe) – Stripe, PayPal and Mollie setup
- [API Reference](/licensedock/api/) – license checks from your software
