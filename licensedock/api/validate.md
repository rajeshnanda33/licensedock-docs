# Validate License

Check whether a license is still valid. Optionally check whether a specific identifier is currently activated.

This endpoint always returns `200` – an inactive or expired license comes back with `valid: false` rather than an error code. That makes integration simpler for clients that just want to know "should I unlock the feature?".

## Request

```
POST /api/index.php/v1/licensedock/licenses/validate
```

### Parameters

| Parameter | Type | Required | Notes |
|-----------|------|----------|-------|
| `license_key` | string | Yes | The license key (or use `dlid`) |
| `identifier` | string | No | If provided, the response confirms whether this identifier is activated |
| `dlid` | string | – | Alias for `license_key` |

### Example

```bash
curl -X POST https://yoursite.com/api/index.php/v1/licensedock/licenses/validate \
  -H "Content-Type: application/json" \
  -d '{
    "license_key": "A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6",
    "identifier": "example.com"
  }'
```

## Response

### Success (200)

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

| Field | Notes |
|-------|-------|
| `valid` | `true` only if `status` is `active` and the license isn't expired |
| `status` | `active`, `expired`, `suspended`, `revoked`, or `cancelled`. Reflects the live state |
| `expires_at` | `null` for lifetime licenses |
| `identifier_activated` | `true` when no `identifier` was supplied. Otherwise `true` if that identifier is activated on this license |

### Errors

| Code | HTTP | When |
|------|------|------|
| `INVALID_REQUEST` | 400 | Missing `license_key` |
| `LICENSE_NOT_FOUND` | 403 | License key doesn't exist |
| `RATE_LIMITED` | 429 | More than 60 requests in 60 seconds from this IP |

The validate endpoint never emits `LICENSE_INACTIVE` or `LICENSE_EXPIRED` – read `valid` and `status` instead.

## Side Effects

Each validate call updates `last_check_at`, `last_check_ip`, and increments `check_count` on the license, so admins can see when the customer last phoned home.
