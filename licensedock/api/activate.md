# Activate License

Register an activation against a license. Idempotent – activating the same identifier twice returns success and uses one slot.

## Request

```
POST /api/index.php/v1/licensedock/licenses/activate
```

### Parameters

| Parameter | Type | Required | Notes |
|-----------|------|----------|-------|
| `license_key` | string | Yes | The license key. `dlid` is accepted as an alias |
| `identifier` | string | Yes | Domain, device ID, email or instance name, per the plan's activation type. Max 255 characters |
| `product_id` | integer | Recommended | The product your software is. A key for another product is refused with `PRODUCT_MISMATCH` |
| `name` | string | No | Label for the activation, shown to the customer. Max 255 characters |

### Example

```bash
curl -X POST https://yoursite.com/api/index.php/v1/licensedock/licenses/activate \
  -d "license_key=A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6" \
  -d "identifier=example.com" \
  -d "product_id=42" \
  -d "name=Production Site"
```

## Response

### Success (200)

```json
{
  "data": {
    "status": "active",
    "license_key": "A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6",
    "product": "My Extension",
    "plan": "Developer",
    "activation_type": "domain",
    "activation_limit": 5,
    "activations_used": 1,
    "expires_at": "2027-03-20T03:21:26Z",
    "identifier": "example.com"
  }
}
```

| Field | Notes |
|-------|-------|
| `identifier` | The normalised value that was stored. Store this one if you deactivate later |
| `activation_limit` | `0` means unlimited |
| `expires_at` | `null` for a license that doesn't expire |
| `product` | The product the license was bought for. For a bundle key, this is the bundle |

An identifier that is already activated returns the same success response without using another slot.

### Errors

| Code | HTTP | When |
|------|------|------|
| `INVALID_REQUEST` | 400 | Missing `license_key` or `identifier`, a value over 255 characters, or a domain that normalises to nothing |
| `LICENSE_INVALID` | 403 | Key doesn't exist, or its status isn't `active` |
| `PRODUCT_MISMATCH` | 403 | `product_id` was sent and the key doesn't cover it |
| `LICENSE_EXPIRED` | 403 | License is past `expires_at` |
| `ACTIVATION_LIMIT_REACHED` | 403 | All activation slots are used |
| `RATE_LIMITED` | 429 | Per-IP or per-key limit hit. See [Rate Limiting](/licensedock/api/#rate-limiting) |
| `INTERNAL_ERROR` | 500 | Unexpected server failure |

The checks run in the order listed, so a bad key is reported as `LICENSE_INVALID` before anything else about it.

When the limit is reached, the response includes the usage so your software can show it:

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

Refused activations for an expired license or a full license are recorded against the license in the admin, so you can see who tried.

## Identifier Normalisation

The `identifier` is normalised by the plan's activation type before lookup. See [API conventions](/licensedock/api/#identifier-normalisation).
