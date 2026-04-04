# API Reference

LicenseDock provides a REST API for license management, update checks, and secure downloads.

## Base URL

```
https://yoursite.com/api/index.php/v1/licensedock/
```

## Authentication

All endpoints authenticate using the `license_key` included in the request. No additional setup needed.

## Response Format

### Success

```json
{
  "data": {
    "key": "value"
  }
}
```

### Error

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable description"
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_REQUEST` | Missing or invalid parameters |
| `LICENSE_NOT_FOUND` | License key doesn't exist |
| `LICENSE_INACTIVE` | License exists but is not active |
| `LICENSE_EXPIRED` | License has expired |
| `ACTIVATION_LIMIT_REACHED` | Maximum activations reached |
| `ACTIVATION_NOT_FOUND` | Activation identifier not found |
| `PRODUCT_MISMATCH` | License doesn't match the requested product |
| `DOWNLOAD_NOT_FOUND` | No download available |
| `FILE_NOT_FOUND` | Download file missing from server |

## Conventions

- Dates are **ISO 8601** format: `2026-03-20T03:21:26Z`
- Absent values are `null`, not empty strings
- All responses use `Content-Type: application/json`

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | [/licenses/activate](/api/activate) | Activate a license |
| POST | [/licenses/deactivate](/api/deactivate) | Deactivate a license |
| POST | [/licenses/validate](/api/validate) | Validate a license |
| GET | [/updates/:product_id](/api/updates) | Check for updates |
| GET | [/downloads/:product_id](/api/downloads) | Download a product file |
