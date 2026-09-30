# Deactivate License

Remove an activation and free its slot.

## Request

```
POST /api/index.php/v1/licensedock/licenses/deactivate
```

### Parameters

| Parameter | Type | Required | Notes |
|-----------|------|----------|-------|
| `license_key` | string | Yes | The license key. `dlid` is accepted as an alias |
| `identifier` | string | Yes | The activation to remove. Normalised the same way as on activate |
| `product_id` | integer | Recommended | A key for another product is refused with `PRODUCT_MISMATCH` |

### Example

```bash
curl -X POST https://yoursite.com/api/index.php/v1/licensedock/licenses/deactivate \
  -d "license_key=A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6" \
  -d "identifier=example.com" \
  -d "product_id=42"
```

## Response

### Success (200)

```json
{
  "data": {
    "status": "deactivated",
    "license_key": "A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6",
    "identifier": "example.com",
    "activations_used": 4
  }
}
```

### Errors

| Code | HTTP | When |
|------|------|------|
| `INVALID_REQUEST` | 400 | Missing `license_key` or `identifier`, or `identifier` over 255 characters |
| `LICENSE_INVALID` | 403 | Key doesn't exist, or its status isn't `active` |
| `PRODUCT_MISMATCH` | 403 | `product_id` was sent and the key doesn't cover it |
| `ACTIVATION_NOT_FOUND` | 404 | No activation matches that identifier on this license |
| `RATE_LIMITED` | 429 | Per-IP or per-key limit hit. See [Rate Limiting](/licensedock/api/#rate-limiting) |
| `INTERNAL_ERROR` | 500 | Unexpected server failure |

A suspended, revoked or cancelled license can't remove activations through the API. A license that is `active` but past its expiry date still can.

## Identifier Normalisation

See [API conventions](/licensedock/api/#identifier-normalisation).
