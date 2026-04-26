# Guest Checkout

Customers can buy without registering first. The Joomla user account is created silently after payment.

## Flow

1. Guest clicks **Buy Now** on a product
2. On the checkout page they see an inline **Have an account? Sign in** panel for returning customers, alongside the guest name and email fields
3. Guest fills in name, email, billing details, and pays
4. After successful payment, LicenseDock creates a Joomla user with the billing email (or links the order to an existing user with the same email)
5. The guest receives:
   - A purchase confirmation email with order details, license keys, and download links
   - An account activation email with a link to set their password

Once they activate, they have a regular Joomla account and can sign in to the customer portal.

## Existing Email

If the billing email matches an existing Joomla user, the order is linked to that user automatically – no duplicate account is created.

## Inline Sign-In on Checkout

Returning customers can sign in directly on the checkout page without leaving. The session preserves their selection across the sign-in flow, so they don't have to start over.

## What Carries Over

| Data | Where it lives | Lifetime |
|------|----------------|----------|
| Plan, trial flag, coupon | Session + `ld_cart` cookie | 24 hours (cookie) or session lifetime |
| Guest name and email | Session (`BuyerContextHelper`) | Session lifetime |
| Billing details | Form state, not persisted until payment | Page render |

The `ld_cart` cookie is first-party, strictly necessary, and stores only the plan price ID, trial flag, and coupon code – nothing personal.
