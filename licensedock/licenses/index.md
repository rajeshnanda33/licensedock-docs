# Managing Licenses

LicenseDock issues a license key when an order completes for a product with **Requires License** set to **Yes**. Each license belongs to one customer, one product and one subscription record. LicenseDock creates a subscription record for every purchase, including one-time purchases, so the license always has a subscription to follow.

## License Key Format

Keys are 32 uppercase hex characters in four 8-character segments:

```
A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6
```

Keys are generated with `random_bytes` and stored unique. The API matches keys case-insensitively, so a customer who pastes the key in lowercase still validates.

## What a License Holds

| Field | Notes |
|-------|-------|
| License Key | The key above |
| Customer | Owner of the license |
| Product | What the license unlocks |
| Subscription | The subscription record the license follows |
| Status | `active`, `expired`, `suspended`, `revoked` or `cancelled` |
| Activation Type | Copied from the plan: `domain`, `device`, `seat` or `instance` |
| Activation Limit | Copied from the plan when issued. `0` = unlimited. Editable per license |
| Activations | Current activations used |
| Expires | Copied from the subscription. Empty for lifetime purchases |
| Last Check / Total Checks | Time, IP and count of validate API calls |

For recurring plans the expiry date includes a 2-day buffer past the billing date, so access never lapses while a renewal payment is being confirmed.

## Statuses

| Status | Meaning | Set by |
|--------|---------|--------|
| `active` | The API accepts the key | Order completion, renewal, dispute won |
| `expired` | The subscription ended without renewal | The **Reminders & Expiration** task, or a dunning grace period running out |
| `suspended` | Access paused, reversible | A chargeback or dispute being opened, or an admin setting the subscription to Suspended |
| `revoked` | Access removed after a full refund, a lost dispute or a voided order | Refund and dispute handling |
| `cancelled` | Reserved as a terminal admin state | Not set by any automatic flow in 1.9.3 |

Only `active` licenses can activate, validate as valid or download. A license whose expiry date has passed is treated as expired by the API straight away, even before the scheduled task updates its status.

Licenses are never deleted. Status changes keep the history.

## Lifecycle

| Event | Subscription | License |
|-------|--------------|---------|
| Order completes | Created as `active` (or `trialing`) | Created as `active`, expiry from the subscription |
| Gateway renewal succeeds | Stays `active`, dates move forward | Expiry extended |
| Renewal payment fails | `past_due` | Stays `active` while the gateway retries |
| Dunning grace period runs out | `expired` | `expired` |
| Late renewal succeeds after that | Back to `active` | Back to `active` |
| Customer cancels auto-renewal | Stays `active` until the paid period ends, then `expired` | Stays `active`, then `expired` |
| Renewal through checkout (Renew button) | Back to `active`, new expiry | Back to `active`, new expiry |
| Full refund | `cancelled` | `revoked` |
| Partial refund | Unchanged | Unchanged |
| Dispute opened | Unchanged | `suspended` |
| Dispute won | Unchanged | Back to `active` |
| Dispute lost | `cancelled` | `revoked` |

See [Subscriptions](/licensedock/subscriptions/) for the full subscription lifecycle and [Dunning](/licensedock/subscriptions/dunning) for failed payments.

## Admin Screen

**Components → LicenseDock → Licenses** lists every license with its key, customer, product, status, activations and expiry.

| Filter | Options |
|--------|---------|
| Search | License ID, key, customer name, customer email, product title |
| Product | Any product |
| Status | Active, Expired, Revoked, Suspended, Cancelled |
| Mode | Live (default), Test, All. Test licenses come from test/sandbox orders |

Each row's menu has three actions:

| Action | What it does |
|--------|--------------|
| **View** | Opens **License Details**: key, product, customer, status, activation type, limit, expiry, creation date, last check and total checks, plus current activations and rejected activation attempts |
| **Manage Subscription** | Opens the linked subscription on the Subscriptions screen |
| **Manage Activations** | Add or remove activations, change the activation limit. See [Activations](/licensedock/licenses/activations) |

### Changing status or expiry

A license follows its subscription. To extend, suspend or expire a license, edit the subscription on **Components → LicenseDock → Subscriptions**. Saving a subscription copies its status and expiry onto its licenses:

| Subscription status saved | License status |
|---------------------------|----------------|
| Active, Trialing, Past due | `active` |
| Suspended | `suspended` |
| Expired | `expired` |
| Pending, Cancelled | Unchanged. Only the expiry date is copied |

Revoked and cancelled licenses are left alone. Subscriptions billed by a gateway can't be edited this way, because the gateway owns their dates. For those, use **Cancel Subscription**. See [Subscriptions](/licensedock/subscriptions/#admin-screen).

### Issuing a license by hand

Create a manual order: **Orders → New Order**. Pick the customer (or enter a new one), the product and plan, an optional **Price override** and **Subscription start date**, and the **Order type** (Real, Real but complimentary, or Test). Completing the order as paid issues the subscription and license and emails the customer.

### Generating missing licenses

If completed orders exist for license-issuing products without a license (for example after switching **Requires License** to Yes), the Licenses screen shows a notice and a toolbar button to generate them. Existing licenses are left untouched and the action is safe to run more than once.

Licenses can also be brought in from another store with **Components → LicenseDock → Import**.

## Customer View

Customers see their licenses on the **Licenses** page of the [Customer Portal](/licensedock/portal/#licenses): key with a copy button, status, activations used against the limit, and the identifiers currently activated.

## Next Steps

- [Activations](/licensedock/licenses/activations) – how activation tracking works
- [API: Activate](/licensedock/api/activate), [Deactivate](/licensedock/api/deactivate), [Validate](/licensedock/api/validate) – license checks in your software
