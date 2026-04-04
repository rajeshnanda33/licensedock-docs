# Validate License

Check whether a license is valid and optionally whether a specific activation exists.

## Request

```
POST /api/index.php/v1/licensedock/licenses/validate
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `license_key` | string | Yes | The license key |
| `identifier` | string | No | Check if this specific identifier is activated |

### Example

```bash
curl -X POST https://yoursite.com/api/index.php/v1/licensedock/licenses/validate \
  -H "Content-Type: application/json" \
  -d '{
    "license_key": "ABCD-1234-EFGH-5678",
    "identifier": "example.com"
  }'
```

## Response

### Success (200)

```json
{
  "data": {
    "valid": true,
    "license": {
      "key": "ABCD-1234-EFGH-5678",
      "status": "active",
      "activation_limit": 5,
      "activations_count": 2,
      "expires_at": "2027-03-20T03:21:26Z",
      "product": {
        "id": 1,
        "name": "My Extension"
      },
      "plan": {
        "id": 1,
        "name": "Developer"
      }
    }
  }
}
```

### Errors

| Code | When |
|------|------|
| `INVALID_REQUEST` | Missing `license_key` |
| `LICENSE_NOT_FOUND` | License key doesn't exist |
| `LICENSE_INACTIVE` | License is not active |
| `LICENSE_EXPIRED` | License has expired |
