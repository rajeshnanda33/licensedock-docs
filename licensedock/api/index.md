# API Reference

LicenseDock provides a REST API for license management, update checks, and secure downloads. Use it to integrate license activation into your software.

## Base URL

```
https://yoursite.com/api/index.php/v1/licensedock/
```

## Authentication

License-key based. Pass `license_key` in the request body (or query string for GET endpoints). Joomla token auth is not used – the routes are public and authenticated by the license key itself.

For compatibility with Joomla's update system, the `dlid` parameter is accepted as an alias for `license_key` on every endpoint.

## Response Format

### Success

```json
{
  "data": {
    "key": "value"
  }
}
```

HTTP `200`. Always JSON, `Content-Type: application/json`.

### Error

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable description"
  }
}
```

The HTTP status reflects the error class (see the table below).

## Error Codes

| Code | HTTP | When |
|------|------|------|
| `INVALID_REQUEST` | 400 | Missing or malformed parameters |
| `LICENSE_NOT_FOUND` | 403 | The supplied key doesn't exist |
| `LICENSE_INACTIVE` | 403 | License exists but its status isn't `active` |
| `LICENSE_EXPIRED` | 403 | License `expires_at` is in the past |
| `ACTIVATION_LIMIT_REACHED` | 403 | License has no free activation slots |
| `ACTIVATION_NOT_FOUND` | 404 | No activation matches the supplied identifier |
| `PRODUCT_MISMATCH` | 403 | License doesn't match the requested product |
| `DOWNLOAD_NOT_FOUND` | 404 | Product has no published download |
| `FILE_NOT_FOUND` | 404 | Download record exists but the file is missing on disk |
| `RATE_LIMITED` | 429 | Too many requests (60/minute per IP) |
| `INTERNAL_ERROR` | 500 | Unhandled server exception – check Joomla error log |

The `validate` endpoint is special: it never returns `LICENSE_INACTIVE` or `LICENSE_EXPIRED` errors. It always returns 200 with `valid: false` instead, so a caller can read the status without exception handling.

## Rate Limiting

All endpoints are rate-limited to **60 requests per 60 seconds per IP**. When exceeded, the response is `429 RATE_LIMITED`.

## Identifier Normalisation

Endpoints that take an `identifier` parameter normalise it based on the plan's activation type:

| Type | Input | Stored as |
|------|-------|-----------|
| `domain` | `https://www.Example.com/path` | `example.com` |
| `seat` | `User@Example.com` | `user@example.com` |
| `device` | `MacBook-Pro-ABC123` | unchanged |
| `instance` | `prod-api-01` | unchanged |

## Conventions

- Dates are **ISO 8601** in UTC: `2026-03-20T03:21:26Z`
- Absent values are `null`, not empty strings
- JSON is encoded with `JSON_UNESCAPED_SLASHES`
- License keys are case-sensitive

## Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | [`/licenses/activate`](/licensedock/api/activate) | Register an activation |
| POST | [`/licenses/deactivate`](/licensedock/api/deactivate) | Remove an activation |
| POST | [`/licenses/validate`](/licensedock/api/validate) | Check license status |
| GET | [`/updates/:product_id`](/licensedock/api/updates) | Check for a newer version |
| GET | [`/downloads/:product_id`](/licensedock/api/downloads) | Download the latest published file |
