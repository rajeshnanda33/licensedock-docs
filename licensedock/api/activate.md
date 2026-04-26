# Activate License

Register an activation against a license. Idempotent – activating with the same identifier twice returns success without creating a duplicate.

## Request

```
POST /api/index.php/v1/licensedock/licenses/activate
```

### Parameters

| Parameter | Type | Required | Notes |
|-----------|------|----------|-------|
| `license_key` | string | Yes | The license key (or use `dlid`) |
| `identifier` | string | Yes | Activation identifier – domain, device ID, email, or instance name |
| `name` | string | No | Friendly label for the activation, shown in the customer portal |
| `dlid` | string | – | Alias for `license_key` |

### Example

```bash
curl -X POST https://yoursite.com/api/index.php/v1/licensedock/licenses/activate \
  -H "Content-Type: application/json" \
  -d '{
    "license_key": "A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6",
    "identifier": "example.com",
    "name": "Production Site"
  }'
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

The same response is returned on a duplicate activation – check `activations_used` to know whether a new slot was consumed.

### Errors

| Code | HTTP | When |
|------|------|------|
| `INVALID_REQUEST` | 400 | Missing `license_key` or `identifier` |
| `LICENSE_NOT_FOUND` | 403 | License key doesn't exist |
| `LICENSE_INACTIVE` | 403 | License status isn't `active` |
| `LICENSE_EXPIRED` | 403 | License `expires_at` is in the past |
| `ACTIVATION_LIMIT_REACHED` | 403 | All activation slots are used |
| `RATE_LIMITED` | 429 | More than 60 requests in 60 seconds from this IP |

When the limit is reached, the response includes the current usage so your app can surface it:

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

## Identifier Normalisation

The `identifier` is normalised based on the plan's activation type before lookup. See [API conventions](/licensedock/api/#identifier-normalisation).
