# Webhooks

Webhooks are automatic notifications from payment providers (Stripe, PayPal, Mollie) that tell your store when something happens – a payment succeeds, a subscription renews, a refund is issued, etc.

## Webhook URLs

Each payment provider needs a URL to send notifications to. You'll find these in your admin under **Settings → Gateways**, but here they are for reference:

| Gateway | URL |
|---------|-----|
| Stripe | `https://yoursite.com/api/index.php/v1/licensedock/webhooks/stripe` |
| PayPal | `https://yoursite.com/api/index.php/v1/licensedock/webhooks/paypal` |
| Mollie | `https://yoursite.com/api/index.php/v1/licensedock/webhooks/mollie` |

## What Webhooks Handle

| Event | What LicenseDock does |
|-------|----------------------|
| Payment completed | Marks the order as completed, generates a license, sends confirmation email |
| Subscription renewed | Extends the license expiration, records the payment |
| Subscription cancelled | Updates the subscription status |
| Refund (full) | Revokes the license, updates the order |
| Refund (partial) | Logged only – customer keeps access |

## Security

Each payment provider includes a security code with their notifications so LicenseDock can verify they're genuine. This is set up automatically when you enter your gateway credentials in LicenseDock settings.

## Troubleshooting

If webhooks aren't working:

1. Check that your webhook URL is correct and your site is publicly accessible
2. Make sure your gateway credentials are entered correctly in LicenseDock settings
3. Check your site's error logs for any issues
4. Use Stripe's webhook logs or PayPal's event history to see if notifications are being sent
