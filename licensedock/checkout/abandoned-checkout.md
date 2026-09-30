# Abandoned Checkout Recovery

When a customer goes to the payment page and never pays, LicenseDock can email them a link that puts their checkout back together.

## What Counts as Abandoned

An order is created when the customer clicks **Proceed to payment** and is sent to the gateway. If it is still **pending** later – the customer closed the tab at Stripe, PayPal or Mollie, or never came back – it is abandoned.

Reminders go only to pending orders that have a billing email. They are not sent for:

- visitors who looked at the checkout page but never submitted it (no order exists yet)
- orders the customer cancelled at the gateway, or that failed
- a buyer who has since completed another order with the same email

## Settings

**Components → LicenseDock → Settings → Automation → Abandoned Checkout Recovery**:

| Setting | Default | Notes |
|---------|---------|-------|
| Enabled | Yes | Turns the reminders on or off |
| Intervals (hours) | `1,24,72` | Comma-separated hours, one per reminder |
| Max Attempts | `3` | Stop after this many emails (1–10) |

The first reminder goes out the first interval after the order was created. Each later reminder waits its own interval after the previous one was sent. With the defaults, that is 1 hour after the order, then 24 hours after the first reminder, then 72 hours after the second.

The number of reminders is whichever is smaller: the number of intervals, or **Max Attempts**.

## Scheduled Task

Reminders are sent by the Joomla scheduled task **LicenseDock - Abandoned Checkout Recovery**. Create it in **System → Scheduled Tasks → New**. The recommended rule is **Interval, Minutes → 15**.

Reminder emails go through LicenseDock's email queue, so **LicenseDock - Process Email Queue** must be running too.

## The Reminder Email

The template is **Abandoned Checkout Reminder** in **Components → LicenseDock → Email Templates**. It is sent in the language the order was placed in.

| Variable | Content |
|----------|---------|
| `{customer_name}` | Billing name |
| `{product}` | Product and plan |
| `{order_number}` | The pending order's number |
| `{order_total}` | Order total in the order's currency |
| `{recovery_link}` | The link back to checkout |

The default subject is "Finish your purchase of {product}". The same template is used for every reminder. See [Emails](/licensedock/emails/).

## The Recovery Link

```
/index.php?option=com_licensedock&task=checkout.recover&token=<32 hex characters>
```

Opening it:

1. Cancels the original pending order, so it gets no more reminders and can't be paid twice.
2. Restores the plan price, trial choice and coupon into the session and the `ld_cart` cookie.
3. Fills in the buyer's name, email and billing address from the order, so it works on a different device too. On the same device, details saved in the browser take priority.
4. Sends the customer to the checkout page.

Paying creates a new order. The link can be clicked again safely: it restores the checkout each time.

The link fails with "Invalid selection." when the token is unknown, or when the plan price, plan or product has been unpublished since. Each IP address can open recovery links 10 times an hour.

Coupons are validated again at checkout, so an expired coupon is dropped with a message.
