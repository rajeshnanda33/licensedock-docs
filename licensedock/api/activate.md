# Activate License

Register an activation against a license.

## Request

```
POST /api/index.php/v1/licensedock/licenses/activate
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `license_key` | string | Yes | The license key |
| `identifier` | string | Yes | Activation identifier (domain, device ID, etc.) |
| `name` | string | No | Friendly name for the activation |

### Example

```bash
curl -X POST https://yoursite.com/api/index.php/v1/licensedock/licenses/activate \
  -H "Content-Type: application/json" \
  -d '{
    "license_key": "ABCD-1234-EFGH-5678",
    "identifier": "example.com",
    "name": "Production Site"
  }'
```

## Response

### Success (200)

```json
{
  "data": {
    "activation_id": 42,
    "license_key": "ABCD-1234-EFGH-5678",
    "identifier": "example.com",
    "name": "Production Site",
    "activated_at": "2026-03-20T03:21:26Z"
  }
}
```

### Errors

| Code | When |
|------|------|
| `INVALID_REQUEST` | Missing `license_key` or `identifier` |
| `LICENSE_NOT_FOUND` | License key doesn't exist |
| `LICENSE_INACTIVE` | License is not active |
| `LICENSE_EXPIRED` | License has expired |
| `ACTIVATION_LIMIT_REACHED` | All activation slots are used |
