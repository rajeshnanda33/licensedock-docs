# Joomla Extensions

Joomla has its own updater, so a Joomla extension needs no SDK. You give Joomla an update XML that points at LicenseDock's download endpoint, and Joomla sends the customer's license key as its Download Key.

The product's **Downloads → Integration → Joomla** tab in the LicenseDock admin shows every snippet on this page with your store URL, host and product ID filled in.

## How It Works

```
Manifest <updateservers> → your update XML → Joomla offers the update
  → Joomla downloads <downloadurl>?dlid=KEY → LicenseDock checks the key → package
```

1. Your extension's manifest declares an update server URL
2. Joomla fetches that URL and reads the XML for available versions
3. A newer version shows in **System → Update → Extensions**
4. On update, Joomla downloads from the `<downloadurl>` in the XML, with the customer's key appended as `dlid`

## Required Setup

### 1. Write the update XML

LicenseDock doesn't generate Joomla's XML. Host a static file on your site, e.g. `https://your-store.com/updates/my-extension.xml`, and point its download URL at the product's [download endpoint](/licensedock/api/downloads):

```xml
<?xml version="1.0" encoding="utf-8"?>
<updates>
  <update>
    <name>My Extension</name>
    <element>com_myext</element>
    <type>component</type>
    <version>2.1.0</version>
    <downloads>
      <downloadurl type="full" format="zip">https://your-store.com/api/index.php/v1/licensedock/downloads/42</downloadurl>
    </downloads>
    <sha256>your-package-sha256-checksum</sha256>
    <targetplatform name="joomla" version="[5-6]\.[0-9]+"/>
  </update>
</updates>
```

The download URL is fixed per product and always serves the latest version. Update the `<version>` and `<sha256>` in this file at each release. Joomla compares `<version>` with the installed version, and checks the downloaded file against `<sha256>` when it's present.

`<element>` and `<type>` must match your extension. For a package, use `pkg_myext` and `package`.

### 2. Add the update server to your manifest

```xml
<updateservers>
  <server type="extension" name="My Extension">https://your-store.com/updates/my-extension.xml</server>
</updateservers>
```

Without an update site, Joomla never checks for updates, and option (b) below has no row to write the key to.

### 3. Get the key onto the download URL

Pick one.

**a. Let Joomla collect it (recommended).** Add a `<dlid>` element to the manifest, next to `<updateservers>`:

```xml
<dlid prefix="dlid=" suffix=""/>
```

Joomla then shows a **Download Key** field for your extension under **System → Update Sites**, and appends the key to every update download. Tell your customers:

1. Go to **System → Update Sites**
2. Open your extension's update site
3. Paste the license key into **Download Key**
4. Save

**b. Collect it in your own settings screen.** Write the key onto your update site yourself, so customers enter it in one place inside your extension. Don't add `<dlid>` in this case. Run this after you've confirmed the key is good (for example in the success branch of the activation call below), so a bad key never replaces a working one:

```php
if ($licensed) {
    $eq = 'dlid=' . $key;   // Joomla appends extra_query to every update download
    $db->setQuery(
        'UPDATE ' . $db->quoteName('#__update_sites', 's')
        . ' INNER JOIN ' . $db->quoteName('#__update_sites_extensions', 'se') . ' ON se.update_site_id = s.update_site_id'
        . ' INNER JOIN ' . $db->quoteName('#__extensions', 'e') . ' ON e.extension_id = se.extension_id'
        . ' SET s.extra_query = ' . $db->quote($eq)
        . ' WHERE e.element = ' . $db->quote('com_myext')
        . ' AND NOT (s.extra_query <=> ' . $db->quote($eq) . ')'
    )->execute();
}
```

Either way, the URL Joomla requests is:

```
https://your-store.com/api/index.php/v1/licensedock/downloads/42?dlid=A1B2C3D4-E5F6A7B8-C9D0E1F2-A3B4C5D6
```

That's the whole required setup. Joomla offers your updates, and each download checks that the license is valid, current and for this product.

### Errors in Joomla

When the request carries `dlid`, the download endpoint answers errors with an HTML page carrying the status code, the error code, a message and a link to the customer's account. Joomla records a failed update download against the HTTP status. The codes are in [Downloads](/licensedock/api/downloads#errors).

Joomla sometimes joins the key with `&amp;dlid=` in place of `&dlid=`. LicenseDock reads both.

## Optional: Enforce the Activation Limit

The setup above doesn't record which sites use a key, so one key can update any number of sites. Joomla's updater sends the key and nothing else – no site URL, no identifying header. Closing that takes three steps inside your extension, each depending on the one before.

### 1. Read the key inside your extension

If you chose (b), you already have it. If you chose (a), the customer typed it into Joomla, so read it back from the update site:

```php
$q = $db->getQuery(true)
    ->select($db->quoteName('s.extra_query'))
    ->from($db->quoteName('#__update_sites', 's'))
    ->join('INNER', $db->quoteName('#__update_sites_extensions', 'se') . ' ON se.update_site_id = s.update_site_id')
    ->join('INNER', $db->quoteName('#__extensions', 'e') . ' ON e.extension_id = se.extension_id')
    ->where($db->quoteName('e.element') . ' = ' . $db->quote('com_myext'));

parse_str((string) $db->setQuery($q)->loadResult(), $dl);
$key = $dl['dlid'] ?? '';
```

### 2. Activate the site's domain

A plain API call, so it can go anywhere in your extension. The save handler of your settings screen is the natural place.

```php
use Joomla\CMS\Factory;
use Joomla\CMS\Http\HttpFactory;
use Joomla\CMS\Uri\Uri;

$domain = Uri::getInstance()->toString(['host']);

$response = (new HttpFactory())->getHttp()->post(
    'https://your-store.com/api/index.php/v1/licensedock/licenses/activate',
    ['license_key' => $key, 'identifier' => $domain, 'product_id' => 42]
);
$body = json_decode((string) $response->getBody(), true);

if (isset($body['error'])) {
    // Limit reached, invalid or expired key, wrong product.
    Factory::getApplication()->enqueueMessage($body['error']['message'], 'warning');
    $licensed = false;
} else {
    $licensed = true;
}
```

Pass the fields as an array so they go as form fields. The API ignores a JSON body.

### 3. Send the domain with the update download

The only place to add it is the `onInstallerBeforePackageDownload` event, which fires just before Joomla downloads a package. It has to be a plugin: a component's listeners are only registered while that component runs, and during an update the running component is `com_installer`. If you already ship a system plugin, add the method there. Otherwise ship a small plugin in the `installer` group inside your package.

```php
use Joomla\CMS\Event\Installer\BeforePackageDownloadEvent;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Uri\Uri;
use Joomla\Event\SubscriberInterface;

final class MyExtIdentifier extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return ['onInstallerBeforePackageDownload' => 'addIdentifier'];
    }

    public function addIdentifier(BeforePackageDownloadEvent $event): void
    {
        $url = $event->getUrl();

        // This fires for every package Joomla downloads. Without the host check
        // you would send your customer's domain to other vendors' update servers.
        if (Uri::getInstance($url)->getHost() !== 'your-store.com') {
            return;
        }

        $event->updateUrl(
            $url . (str_contains($url, '?') ? '&' : '?')
                 . 'identifier=' . urlencode(Uri::getInstance()->getHost())
        );
    }
}
```

`getUrl()` and `updateUrl()` are the event's own methods. `$event->setArgument('url', …)` also works. `$event['url'] = …` throws, because the event is immutable. The older by-reference `&$url` listener signature still works in current Joomla and is dropped in Joomla 7.

With all three steps in place, set the product's **Download API Access** to **License key + activated identifier**. A download from a site that was never activated is then refused with `ACTIVATION_REQUIRED` or `ACTIVATION_NOT_FOUND`.

Check **Components → LicenseDock → Downloads**, filtered to **Refused**, after switching, to see which customers are affected.

## Validating Keys in Your Extension

For paid features, validate the key and cache the answer. Each call is an HTTP request to your store, and the answer rarely changes, so re-check with validate about once a day:

```php
$response = (new HttpFactory())->getHttp()->post(
    'https://your-store.com/api/index.php/v1/licensedock/licenses/validate',
    ['license_key' => $key, 'identifier' => $domain, 'product_id' => 42]
);
$body = json_decode((string) $response->getBody(), true);

$valid = !empty($body['data']['valid']) && !empty($body['data']['identifier_activated']);
```

Validate returns license problems as data: an unknown, suspended or expired key comes back as `200` with `valid: false`. See [Validate License](/licensedock/api/validate).

To call the API through a small class, copy `LicenseDockClient.php` from the SDK into your extension. See [PHP Client](/licensedock/integrations/php).
