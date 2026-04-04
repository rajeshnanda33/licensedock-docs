# Deactivate License

Remove an activation from a license, freeing up an activation slot.

## Request

```
POST /api/index.php/v1/licensedock/licenses/deactivate
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `license_key` | string | Yes | The license key |
| `identifier` | string | Yes | Activation identifier to remove |

### Example

```bash
curl -X POST https://yoursite.com/api/index.php/v1/licensedock/licenses/deactivate \
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
    "message": "Activation removed successfully"
  }
}
```

### Errors

| Code | When |
|------|------|
| `INVALID_REQUEST` | Missing `license_key` or `identifier` |
| `LICENSE_NOT_FOUND` | License key doesn't exist |
| `ACTIVATION_NOT_FOUND` | No activation with that identifier |
