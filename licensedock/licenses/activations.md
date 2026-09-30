# Activations

An activation records that a license is in use somewhere – a website, a device, a user or a server instance. The plan's **Activation Type** decides what an activation represents, and its **Activation Limit** decides how many are allowed.

## Activation Types

| Type | Tracks | Identifier example | Normalisation |
|------|--------|--------------------|---------------|
| `domain` | Websites | `example.com` | Scheme, leading `www.`, port and path stripped, then lowercased |
| `device` | Computers, phones, IoT | `MacBook-Pro-ABC123` | Trimmed only |
| `seat` | Individual users | `user@company.com` | Lowercased |
| `instance` | Server or container instances | `prod-api-01` | Trimmed only |

Normalisation runs on the server for every activate, deactivate and download call, and for activations added in admin. A customer's software can send `https://www.Example.com:8080/path` and it is stored as `example.com`, so the same site can't use two slots.

Identifiers are also compared case-insensitively by the database, so `ABC123` and `abc123` count as the same device or instance.

Identifiers and names are limited to 255 characters. A domain that normalises to nothing (for example `http://`) is refused with `INVALID_REQUEST`.

## How It Works

Your software talks to LicenseDock through three API calls:

| Endpoint | Purpose |
|----------|---------|
| [`POST /licenses/activate`](/licensedock/api/activate) | Register an activation |
| [`POST /licenses/validate`](/licensedock/api/validate) | Check the license is still good |
| [`POST /licenses/deactivate`](/licensedock/api/deactivate) | Remove an activation and free its slot |

Activation is idempotent. Activating an identifier that is already active returns success without using another slot.

When the request includes `product_id`, LicenseDock refuses a key that belongs to a different product with `PRODUCT_MISMATCH`, so a valid key from another product in your store can't activate yours.

The activate endpoint allows 20 calls per hour per license key, on top of the per-IP limit, so a leaked key can't be used to fill every slot.

## Activation Limit

Each plan has an **Activation Limit**. `0` means unlimited. The license copies the limit when it is issued. When the limit is reached, activate returns:

```json
{
  "error": {
    "code": "ACTIVATION_LIMIT_REACHED",
    "message": "Activation limit reached.",
    "activation_limit": 5,
    "activations_used": 5
  }
}
```

To free a slot, the customer's software calls deactivate, or you remove an activation in admin.

| Event | Effect on the license's limit and type |
|-------|-----------------------------------------|
| Admin changes the limit | Takes effect at once |
| Plan change applied (immediately or at renewal) | Reset to the new plan's limit and type |
| Renewal through checkout (Renew button) | Reset to the plan's limit and type |
| Automatic gateway renewal | Unchanged |

If a limit drops below the number of activations already in use, the existing activations stay. New activations are refused until the count is back under the limit.

## Rejected Attempts

Activation attempts that fail because the limit is reached or the license has expired are recorded against the license, one row per identifier with a count of tries. They appear under **Rejected activation attempts** in the license's details. Many distinct identifiers there can mean a key is being shared. Rows untouched for 90 days are removed by the **Reminders & Expiration** task.

## Activation Record

| Field | Notes |
|-------|-------|
| Identifier | Normalised for the activation type |
| Name | Optional label sent by your software (for example "John's MacBook"). Shown on hover in the customer portal |
| IP | IP address of the activate request. Empty for activations added in admin |
| Activated | Timestamp |

## Managing Activations in Admin

**Components → LicenseDock → Licenses → ⋯ → Manage Activations** opens the activations modal for one license.

| Action | Notes |
|--------|-------|
| **Add** | Enter the identifier and an optional **Name (optional)**. The identifier is normalised like an API call. Adding follows the same rules as the API: the license must be active and unexpired, below its limit, and the identifier must not already be active |
| **Remove activation** | Deletes the activation and frees a slot. Can't be undone |
| **Change limit** | Sets this license's limit. `0` means unlimited. A limit below the current number of activations is refused |

**Change limit** is the way to give one customer an extra slot without a plan change or a charge.

## Activation-Gated Downloads

A product's **Download API Access** setting can require an activated identifier for downloads through the API. With **License key + activated identifier**:

| Request | Result |
|---------|--------|
| Valid key, no identifier sent | Refused with `ACTIVATION_REQUIRED` |
| Valid key, identifier not activated on the license | Refused with `ACTIVATION_NOT_FOUND` |
| Valid key, activated identifier | File served |

With **License key**, the identifier is optional, but an identifier that is sent must be activated. Refusals are listed under **Refused Downloads** in the Download Log. See [Downloads](/licensedock/products/downloads) and the [Downloads API](/licensedock/api/downloads).

## Customers and Activations

Customers see their activated identifiers on the **Licenses** page of the customer portal. The portal is read-only for activations: customers free a slot from inside your software (deactivate) or by asking you to remove it in admin.

## For Developers

- [Activate](/licensedock/api/activate)
- [Deactivate](/licensedock/api/deactivate)
- [Validate](/licensedock/api/validate)
