# Validate License

Check whether a license is usable, and optionally whether a given identifier is activated on it.

License problems come back as data. An unknown, inactive or expired key returns `200` with `valid: false`, so a client that only wants to know "should I unlock this?" reads one field.

## Request

```
POST /api/index.php/v1/licensedock/licenses/validate
```

### Parameters

| Parameter | Type | Required | Notes |
|-----------|------|----------|-------|
| `license_key` | string | Yes | The license key. `dlid` is accepted as an alias |
| `identifier` | string | No | If sent, `identifier_activated` says whether it is activated on this license. Max 255 characters |
| `product_id` | integer | Recommended | A key for another product is refused with `PRODUCT_MISMATCH` |

### Example

```bash
curl -X POST https://yoursite.com/api/index.php/v1/licensedock/licenses/validate \
  -d "license_key=A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6" \
  -d "identifier=example.com" \
  -d "product_id=42"
```

## Response

### Valid license (200)

```json
{
  "data": {
    "valid": true,
    "status": "active",
    "license_key": "A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6",
    "product": "My Extension",
    "plan": "Developer",
    "activation_type": "domain",
    "activation_limit": 5,
    "activations_used": 2,
    "expires_at": "2027-03-20T03:21:26Z",
    "identifier_activated": true
  }
}
```

### Unknown key (200)

```json
{
  "data": {
    "valid": false,
    "status": "invalid",
    "license_key": "A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6",
    "product": null,
    "plan": null,
    "activation_type": null,
    "activation_limit": 0,
    "activations_used": 0,
    "expires_at": null,
    "identifier_activated": false
  }
}
```

| Field | Notes |
|-------|-------|
| `valid` | `true` only when `status` is `active` and the license hasn't expired |
| `status` | `active`, `expired`, `suspended`, `revoked`, `cancelled`, or `invalid` for an unknown key. A license past its expiry date reports `expired` even before the scheduled task updates it |
| `activation_limit` | `0` means unlimited |
| `expires_at` | `null` for a license that doesn't expire |
| `identifier_activated` | `true` when no `identifier` was sent. Otherwise, whether that identifier is activated on this license |

### Errors

| Code | HTTP | When |
|------|------|------|
| `INVALID_REQUEST` | 400 | Missing `license_key`, or `identifier` over 255 characters |
| `PRODUCT_MISMATCH` | 403 | `product_id` was sent and the key doesn't cover it |
| `RATE_LIMITED` | 429 | Per-IP or per-key limit hit. See [Rate Limiting](/licensedock/api/#rate-limiting) |
| `INTERNAL_ERROR` | 500 | Unexpected server failure |

Validate never returns `LICENSE_INVALID` or `LICENSE_EXPIRED`. Read `valid` and `status`.

## Side Effects

A validate call updates `last_check_at` and `last_check_ip` and increments `check_count` on the license, so you can see in the admin when the customer last checked in.

This happens when no `identifier` is sent, or when the identifier sent is activated. A call with an identifier that isn't activated leaves those fields alone.
