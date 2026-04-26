# Activations

An activation records that a license is being used somewhere – a website, a device, a user, or a server instance. The plan's **activation type** controls what each activation represents.

## Activation Types

| Type | Tracks | Identifier example | Normalisation |
|------|--------|---------------------|---------------|
| `domain` | Websites | `example.com` | Protocol, `www.`, and path stripped. Lowercased |
| `device` | Computers, phones, IoT | `MacBook-Pro-ABC123` | Kept as-is |
| `seat` | Individual users | `user@company.com` | Lowercased |
| `instance` | Server / container instances | `prod-api-01` | Kept as-is |

Normalisation happens server-side in the API. A customer's app can send `https://www.Example.com/path` and it's stored as `example.com` – so the same site can't accidentally consume two activation slots.

## How It Works

The customer's software (or a license-check plugin in your Joomla extension, WordPress plugin, desktop app, etc.) talks to LicenseDock through three API calls:

| Endpoint | Purpose |
|----------|---------|
| [`POST /licenses/activate`](/licensedock/api/activate) | Register a new activation |
| [`POST /licenses/validate`](/licensedock/api/validate) | Check the license is still good (run on app start, periodically, or before features that need it) |
| [`POST /licenses/deactivate`](/licensedock/api/deactivate) | Remove an activation, freeing a slot |

Activation is idempotent – calling activate twice with the same identifier returns success without creating a duplicate.

## Activation Limit

Each plan has an **Activation Limit**. `0` means unlimited. When the limit is reached, the API returns:

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

The customer needs to deactivate one of their existing activations (from your app or the customer portal) to free a slot.

## Activation Record

Each activation row holds:

| Field | Notes |
|-------|-------|
| Identifier | Normalised based on activation type |
| Name | Optional friendly label – set this from your app to help customers identify activations in the portal |
| IP Address | IP of the request that activated |
| Activated At | Timestamp |

## Admin Override

Admins can add or remove activations directly from **Components → LicenseDock → Licenses → Edit**. Adding bypasses the activation limit so support can help customers without forcing them to deactivate first.

## For Developers

Building license-check into your software? Start with the API reference:

- [Activate](/licensedock/api/activate)
- [Deactivate](/licensedock/api/deactivate)
- [Validate](/licensedock/api/validate)
