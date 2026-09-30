# PHP Client

`LicenseDockClient` is a small PHP class that calls the LicenseDock API. It's a reference client: copy it into your software and adapt it as needed. It's also the base class of the [WordPress SDK](/licensedock/integrations/wordpress).

It needs PHP 7.4 or later and the cURL extension.

## Getting the File

Download the SDK from your account at contona.com, next to the LicenseDock package. `LicenseDockClient.php` is in the root of `licensedock-sdk-v2.1.0.zip`.

## Quick Start

```php
require_once 'LicenseDockClient.php';

$client = new LicenseDockClient('https://your-store.com', 42);
$key    = 'A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6';

$result = $client->activate($key, 'customer-site.com');

if ($result->success) {
    echo $result->data->status;          // "active"
    echo $result->data->activations_used;
} else {
    echo $result->code . ': ' . $result->message;
}
```

## Constructor

```php
new LicenseDockClient(string $storeUrl, int $productId, int $timeout = 15)
```

| Argument | Notes |
|----------|-------|
| `$storeUrl` | Your store's root URL. The client adds `/api/index.php/v1/licensedock` |
| `$productId` | The product your software is. Sent with every license call, so a key for another product is refused with `PRODUCT_MISMATCH` |
| `$timeout` | Request timeout in seconds |

## Methods

| Method | Endpoint | Notes |
|--------|----------|-------|
| `activate(string $licenseKey, string $identifier, string $name = '')` | [POST /licenses/activate](/licensedock/api/activate) | `$name` labels the activation, e.g. "John's MacBook" |
| `deactivate(string $licenseKey, string $identifier)` | [POST /licenses/deactivate](/licensedock/api/deactivate) | |
| `validate(string $licenseKey, string $identifier = '')` | [POST /licenses/validate](/licensedock/api/validate) | With an identifier, `data->identifier_activated` says whether it's activated |
| `checkUpdate(string $licenseKey = '')` | [GET /updates/{id}](/licensedock/api/updates) | The key is optional. With it, the result is scoped to the license's plan and carries the license state |
| `getDownloadUrl(string $licenseKey, string $identifier = '')` | – | Builds the [download](/licensedock/api/downloads) URL. Makes no request |
| `getProductId()` | – | |
| `getApiUrl()` | – | e.g. `https://your-store.com/api/index.php/v1/licensedock` |
| `getStoreUrl()` | – | |

`$identifier` is whatever the plan's activation type expects: a domain, a device fingerprint, an email address or an instance ID. See [Activation Types](/licensedock/integrations/#activation-types).

## Result Object

Every API method returns the same shape:

```php
$result->success   // bool
$result->data      // object|null – the API's "data" payload
$result->message   // string – error message, '' on success
$result->code      // string – error code, '' on success
```

`data` after `validate()`:

```json
{
  "valid": true,
  "status": "active",
  "license_key": "A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6",
  "product": "My App",
  "plan": "Pro",
  "activation_type": "device",
  "activation_limit": 5,
  "activations_used": 1,
  "expires_at": "2027-03-20T00:00:00Z",
  "identifier_activated": true
}
```

Three things to handle:

- **`validate()` returns license problems as data.** An unknown, inactive or expired key gives `success = true` with `data->valid === false`. Branch on `data->valid`, and read `data->status` for the reason.
- **A connection failure has an empty `code`.** `message` starts with `Connection error:`. A response that isn't JSON gives `Invalid response from server.`, also with an empty code.
- **Treat an unknown `code` as a generic failure.** Later store versions add codes. The current list is in the [API Reference](/licensedock/api/#error-codes).

`RATE_LIMITED` and `INTERNAL_ERROR` say nothing about the license. Don't lock a customer out over them.

## Custom Updaters

For desktop apps, CLI tools and anything else that updates itself:

```php
$update = $client->checkUpdate($key);

if ($update->success
    && $update->data->update_available
    && version_compare($update->data->version, MY_APP_VERSION, '>')
) {
    if ($update->data->download_url === null) {
        // Product is "Account only": send the customer to their account.
    } else {
        $url = $client->getDownloadUrl($key, $deviceId);
        // Download $url, then install.
    }
}
```

- `update_available` means a published version exists. The API doesn't know what's installed, so compare `version` yourself.
- `download_requires` says what the download will need: `"license_key"`, `"activated_identifier"`, `"account"` or `null`. With `"activated_identifier"`, activate first, then download with the identifier.
- The notes for the version are in `data->release_notes`, and the date in `data->date` (`Y-m-d`).
- An expired license still sees the update. `data->license_status` is `expired`, and the download is refused with `LICENSE_EXPIRED`. Use it to show a renewal message.

All fields are listed on [Check Updates](/licensedock/api/updates).

### Downloading

`getDownloadUrl()` only builds the URL. Fetch it with any HTTP client, and check the status before saving the body as a package:

```php
$ch = curl_init($client->getDownloadUrl($key, $deviceId));
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTPHEADER     => ['Accept: application/json'],
]);
$body = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code === 200) {
    file_put_contents($packagePath, $body);
} else {
    $error = json_decode($body);   // { "error": { "code": ..., "message": ... } }
}
```

Sending an identifier opts in to being checked against it. One that isn't activated is refused with `ACTIVATION_NOT_FOUND`, so activate before you download with it.

## Bundles

Point each product at its **own** product ID and use the **bundle's** key.

```php
// Both products were sold together in a bundle.
$reports = new LicenseDockClient('https://your-store.com', 42);  // Reports add-on
$export  = new LicenseDockClient('https://your-store.com', 43);  // Export add-on

$reports->activate($bundleKey, 'customer-site.com');
$export->activate($bundleKey, 'customer-site.com');
```

The store accepts a bundle key for each product in the bundle. Activations belong to the bundle license, and its plan sets the activation type and limit. Activating the same identifier from two products in the bundle uses one slot – the second call finds it already activated.

Update checks and downloads for a bundled product see its all-plans files. Only one level is resolved: a bundle inside a bundle doesn't pass its products through.

## Using Another HTTP Client

Requests go through one protected method. Override it to use your framework's HTTP client:

```php
class MyLicenseClient extends LicenseDockClient
{
    protected function send(string $method, string $url, ?array $data): array
    {
        // POST $data as form fields (application/x-www-form-urlencoded).
        // Return ['body' => string, 'code' => int, 'error' => string].
        // 'error' is '' unless the request itself failed.
    }
}
```

The WordPress SDK does exactly this with `wp_remote_get()` / `wp_remote_post()`.

## Other Languages

The client is a thin layer over form-encoded HTTP calls. Port it, or call the endpoints directly – see the [API Reference](/licensedock/api/).
