# Managing Licenses

A license is generated automatically when an order completes for a product that requires one. Each license is tied to a customer, a product, a plan, and (for recurring plans) a subscription.

## License Key Format

Keys are 32 hex characters in four 8-character segments:

```
A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6
```

Generated with `random_bytes` and stored unique. Case-sensitive in API calls.

## License Fields

| Field | Notes |
|-------|-------|
| License Key | The string above |
| Customer | Owner of the license |
| Product / Plan | What the license unlocks |
| Subscription | Linked subscription (only for recurring plans) |
| Status | One of `active`, `expired`, `suspended`, `revoked`, `cancelled` |
| Activation Type | Inherited from the plan: `domain`, `device`, `seat`, `instance` |
| Activation Limit | Inherited from the plan. `0` = unlimited |
| Activations Used | Count of current activations |
| Expires At | When the license expires. `NULL` for one-time purchases (lifetime) |
| Last Check At / IP | Timestamp and IP of the last validate API call |
| Check Count | Total validate API calls received |

## Statuses

| Status | Meaning |
|--------|---------|
| `active` | Customer can activate and use the software |
| `expired` | Subscription passed its expiry without renewing |
| `suspended` | Subscription is in dunning – payment failed, awaiting retry |
| `revoked` | Refund issued or chargeback received. Access permanently removed |
| `cancelled` | Manually cancelled by admin (rare) |

A suspended license can return to `active` if the failed renewal is recovered. The other terminal statuses don't revert.

Licenses are never deleted – status changes preserve audit history.

## Lifecycle

| Trigger | Result |
|---------|--------|
| Order completes (paid) | License created, status `active`, expiry set from billing cycle |
| Subscription renews | License `expires_at` extended by one cycle |
| Renewal payment fails | After grace period: subscription marked past-due, license `suspended` |
| Renewal recovered | License back to `active`, new expiry |
| Subscription expires (no renewal) | License `expired` |
| Refund issued (full) | License `revoked` |
| Customer cancels auto-renewal | License stays `active` until current period ends, then `expired` |
| Chargeback / dispute opened | License `suspended` until dispute resolves |

## Admin Management

**Components → LicenseDock → Licenses**.

You can:

- Search by key, customer, or product
- Filter by status, product, plan
- Edit a license: change status, activation limit, expiry
- Add an activation manually (admin can override the activation limit)
- Remove an activation (frees a slot)

## Customer-Facing View

In the customer portal, customers see their license keys, status, expiry, and the list of current activations. They can copy the key, deactivate any of their activations, and check renewal status. See [Customer Portal](/licensedock/portal/).

## Next Steps

- [Activations](/licensedock/licenses/activations) – how activation tracking works
- [API: Activate](/licensedock/api/activate), [Deactivate](/licensedock/api/deactivate), [Validate](/licensedock/api/validate) – integrate license checks into your software
