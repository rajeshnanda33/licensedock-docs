# Guest Checkout

Customers can buy without registering first. LicenseDock creates their Joomla account after payment.

## Flow

1. A guest opens checkout from a **Buy Now** button or a buy link.
2. The checkout page offers an **Already have an account? Sign in** panel for returning customers, and **Name** and **Email** fields for everyone else.
3. The guest fills in their details and billing address and pays.
4. When the order completes, LicenseDock looks for a Joomla user with the billing email:
   - **None found** – a new user is created with that name and email, a random password and the group set in **Users → Options → New User Registration Group**. The account is marked as not yet activated.
   - **Found** – the order is linked to that existing user. No second account is created, and their password is left alone.
5. The guest receives the purchase confirmation email with the order, license keys and download links. For a new account it also contains a **Set Password & Sign In** link.

The activation link is valid for 14 days. Once the customer sets a password, the account is a normal Joomla account and they can sign in to the [customer portal](/licensedock/portal/).

## Thank-You Page for Guests

The guest's thank-you page depends on the account:

| Situation | What the page shows |
|-----------|---------------------|
| New account, not yet activated | **Check your inbox**, with instructions to open the email and click **Set Password & Sign In**, and a **Resend the email** link |
| Email already had an account | "You already have an account with us." and **Sign in to your account** |

**Resend the email** sends a separate account activation email with a fresh 14-day link. It works only from the thank-you page's own signed link, and can be used once a minute.

## Signing In During Checkout

Returning customers can sign in from the panel on the checkout page. Their selection, trial and coupon survive the login, and their saved billing details are filled in. A normal Joomla login page works too.

A guest who never signs in but uses the email of an existing account is still handled: the order joins that account after payment.

## What Is Remembered

| Data | Where | Lifetime |
|------|-------|----------|
| Plan price, trial flag, coupon | Session and the `ld_cart` cookie | Session, or 24 hours for the cookie |
| Name and email typed so far | Session | Session |
| Name, email and billing fields | The browser's `localStorage`, same device only | The longest abandoned-checkout reminder interval plus 12 hours, capped at 7 days. 24 hours when reminders are off |

The `localStorage` copy never leaves the browser and is cleared on the thank-you page. It lets a guest who returns from a reminder email find their details already filled in. When a reminder link is opened on a different device, the details come from the original order instead – see [Abandoned Checkout Recovery](/licensedock/checkout/abandoned-checkout).

The `ld_cart` cookie holds only the price ID, trial flag and coupon code. See [The `ld_cart` Cookie](/licensedock/checkout/#ld-cart-cookie).
