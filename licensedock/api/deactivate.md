# Deactivate License

Remove an activation, freeing up a slot.

## Request

```
POST /api/index.php/v1/licensedock/licenses/deactivate
```

### Parameters

| Parameter | Type | Required | Notes |
|-----------|------|----------|-------|
| `license_key` | string | Yes | The license key (or use `dlid`) |
| `identifier` | string | Yes | The activation to remove |
| `dlid` | string | – | Alias for `license_key` |

### Example

```bash
curl -X POST https://yoursite.com/api/index.php/v1/licensedock/licenses/deactivate \
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
| `INVALID_REQUEST` | 400 | Missing `license_key` or `identifier` |
| `LICENSE_NOT_FOUND` | 403 | License key doesn't exist |
| `ACTIVATION_NOT_FOUND` | 404 | No activation matches that identifier on this license |
| `RATE_LIMITED` | 429 | More than 60 requests in 60 seconds from this IP |

## Identifier Normalisation

The `identifier` is normalised the same way as on activate – see [API conventions](/licensedock/api/#identifier-normalisation).
