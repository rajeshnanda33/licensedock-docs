# PayPal

LicenseDock integrates with PayPal for one-time and recurring payments.

## Setup

1. Create a [PayPal Developer account](https://developer.paypal.com)
2. Create an app in the PayPal Developer Dashboard to get your credentials
3. In Joomla admin, go to **Components → LicenseDock → Settings → Gateways**
4. Enter your PayPal credentials:
   - **Sandbox Client ID**
   - **Sandbox Secret**
   - **Live Client ID**
   - **Live Secret**
5. Set the mode to **Sandbox** or **Live**

## Webhook Setup

Webhooks let PayPal notify your store about payment events.

1. In the PayPal Developer Dashboard, go to your app settings
2. Under **Webhooks**, click **Add Webhook**
3. Enter your webhook URL:
   ```
   https://yoursite.com/api/index.php/v1/licensedock/webhooks/paypal
   ```
4. Select the relevant event types

## How Payments Work

- **One-time:** Customer approves the payment on PayPal, then returns to your site
- **Recurring:** PayPal charges the customer automatically on each billing cycle and notifies your store
