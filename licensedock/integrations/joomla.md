# Joomla Extensions

Joomla has its own updater, so a Joomla extension needs no SDK. You give Joomla an update XML that points at LicenseDock's download endpoint, and Joomla sends the customer's license key with each update download.

The product's **Downloads → Integration → Joomla** tab in the LicenseDock admin shows Setup A and Setup B with your store URL and product ID filled in.

## How It Works

```
Manifest <updateservers> → your update XML → Joomla offers the update
  → Joomla downloads <downloadurl>?dlid=KEY → LicenseDock checks the key → package
```

1. Your extension's manifest declares an update server URL
2. Joomla fetches that URL and reads the XML for available versions
3. A newer version shows in **System → Update → Extensions**
4. On update, Joomla downloads from the `<downloadurl>` in the XML, with the update site's stored line (`dlid=KEY`) appended

## Pick a Setup

| | Setup A | Setup B |
|---|---|---|
| Who asks for the key | Joomla's Download Key box | your extension's settings |
| Limits how many sites a key can update | no | yes |
| Code | none | one settings field and one small class |

Both give your customers updates inside Joomla. Choose B if one key should only update the number of sites its plan allows.

## Setup A: Joomla Asks for the Key

### 1. Put the update XML on your server

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

The download URL is fixed per product and always serves the latest version. Update `<version>` and `<sha256>` in this file at each release. Joomla compares `<version>` with the installed version, and checks the downloaded file against `<sha256>` when it's present.

`<element>` and `<type>` must match your extension. For a module, plugin, template or package, also add `<client>site</client>` (a plugin also needs `<folder>` with its group): Joomla assumes `administrator` when `<client>` is missing, and then never offers the update. For a package, use `pkg_myext` and `package`.

### 2. Add these lines to your manifest

```xml
<!-- in your extension's manifest, e.g. com_myext.xml -->
<changelogurl>https://your-store.com/api/index.php/v1/licensedock/changelog/42</changelogurl>
<updateservers>
  <server type="extension" name="My Extension">https://your-store.com/updates/my-extension.xml</server>
</updateservers>
<dlid prefix="dlid=" suffix=""/>
```

`<dlid>` makes Joomla show a **Download Key** field for your extension under **System → Update Sites**, and append the key to every update download. Tell your customers:

1. Go to **System → Update Sites**
2. Open your extension's update site
3. Paste the license key into **Download Key**
4. Save

### 3. Set the product's Download API Access

Set it to **License key**. Joomla now offers your updates, and each download checks that the license is valid, current and for this product. One key can update any number of sites.

## Setup B: Your Extension Asks for the Key

Each site activates its key, and a download from a site that was never activated is refused. A local or staging site keeps the key without using up a site, and gets no updates. The site's domain travels as `identifier` in the update site's stored line, next to the key, so this needs no plugin, and it works the same for a component, module, plugin or template.

### 1. Put the update XML on your server

The same file as Setup A, step 1.

### 2. Add these lines to your manifest

Leave out `<dlid>`: your extension stores the key itself.

```xml
<!-- in your extension's manifest, e.g. com_myext.xml -->
<changelogurl>https://your-store.com/api/index.php/v1/licensedock/changelog/42</changelogurl>
<updateservers>
  <server type="extension" name="My Extension">https://your-store.com/updates/my-extension.xml</server>
</updateservers>
```

### 3. Add a License key field with a filter

Joomla calls a field's `filter` while saving the form, so the same field works in a component's Options (`config.xml`), a module, a plugin or a template, with no save handler of your own:

```xml
<!-- In your settings form: config.xml (a component's Options), or the <config>
     of your module, plugin or template manifest. -->
<field name="license_key" type="text" label="License key"
       filter="YourVendor\Component\Myext\Administrator\Helper\License::activate"/>
```

### 4. Add the License class

On save, `activate()` activates the site and stores the key with its domain on your update site. On a local or staging site (`localhost`, `.test`, `.local`, an IP) it stores the key only, without activating, so no site is used up. If the key is refused or the store can't be reached, it stores the key without a domain and tells the admin.

```php
namespace YourVendor\Component\Myext\Administrator\Helper;

use Joomla\CMS\Factory;
use Joomla\CMS\Http\HttpFactory;
use Joomla\CMS\Uri\Uri;
use Joomla\Database\DatabaseInterface;

\defined('_JEXEC') or die;

final class License
{
    private const STORE   = 'https://your-store.com/api/index.php/v1/licensedock';
    private const PRODUCT = 42;
    private const ELEMENT = 'com_myext';   // your extension's element - pkg_myext if you ship a package

    // The field's filter: Joomla calls it while saving your settings, and saves what it returns.
    public static function activate($value): string
    {
        $key    = trim((string) $value);
        $domain = Uri::getInstance()->getHost();

        if ($key === '') {
            return '';
        }

        // A local or staging site keeps the key but is not activated: no site is used up,
        // and with no domain on the update site it gets no updates.
        if (!self::isLiveHost($domain)) {
            self::store($key, '');

            return $key;
        }

        $body = self::call('activate', ['license_key' => $key, 'identifier' => $domain, 'product_id' => self::PRODUCT]);

        if (!isset($body['data'])) {
            // Limit reached, invalid or expired key, wrong product, or the store was not reached.
            Factory::getApplication()->enqueueMessage($body['error']['message'] ?? 'The license could not be checked. Try again later.', 'warning');
            self::store($key, '');

            return $key;
        }

        self::store($key, $domain);

        return $key;
    }

    // Call at most once a day. A site whose domain is not activated - a copy of another
    // site - keeps the key but stops sending a domain, so it stops updating.
    public static function recheck(string $key): void
    {
        $domain = Uri::getInstance()->getHost();

        if ($key === '') {
            return;
        }

        // A local copy of a live site never updates on that site's activation.
        if (!self::isLiveHost($domain)) {
            self::store($key, '');

            return;
        }

        $body = self::call('validate', ['license_key' => $key, 'identifier' => $domain, 'product_id' => self::PRODUCT]);

        if (!isset($body['data'])) {
            return;   // no answer: leave things as they are
        }

        $activated = !empty($body['data']['valid']) && !empty($body['data']['identifier_activated']);
        self::store($key, $activated ? $domain : '');
    }

    private static function isLiveHost(string $host): bool
    {
        $host = strtolower($host);

        if ($host === '' || $host === 'localhost' || filter_var(trim($host, '[]'), FILTER_VALIDATE_IP)) {
            return false;
        }

        foreach (['.test', '.local', '.localhost', '.localdomain', '.invalid', '.example'] as $suffix) {
            if (str_ends_with($host, $suffix)) {
                return false;
            }
        }

        return true;
    }

    private static function call(string $endpoint, array $fields): ?array
    {
        try {
            $response = (new HttpFactory())->getHttp()->post(self::STORE . '/licenses/' . $endpoint, $fields, [], 10);

            return json_decode((string) $response->getBody(), true) ?: null;
        } catch (\Throwable) {
            return null;
        }
    }

    // Joomla sends the update site's line with every update download.
    private static function store(string $key, string $domain): void
    {
        $db      = Factory::getContainer()->get(DatabaseInterface::class);
        $element = self::ELEMENT;
        $extra   = 'dlid=' . rawurlencode($key) . ($domain !== '' ? '&identifier=' . rawurlencode($domain) : '');

        $siteIds = $db->setQuery(
            $db->createQuery()
                ->select($db->quoteName('se.update_site_id'))
                ->from($db->quoteName('#__update_sites_extensions', 'se'))
                ->join('INNER', $db->quoteName('#__extensions', 'e'), $db->quoteName('e.extension_id') . ' = ' . $db->quoteName('se.extension_id'))
                ->where($db->quoteName('e.element') . ' = :element')
                ->bind(':element', $element)
        )->loadColumn();

        if ($siteIds) {
            $db->setQuery(
                $db->createQuery()
                    ->update($db->quoteName('#__update_sites'))
                    ->set($db->quoteName('extra_query') . ' = :extra')
                    ->whereIn($db->quoteName('update_site_id'), $siteIds)
                    ->bind(':extra', $extra)
            )->execute();
        }
    }
}
```

Joomla appends the stored line to the download URL, so the store sees `?dlid=KEY&identifier=customer-site.com` and checks that this domain was activated for the key.

### 5. Re-check once a day

A copied site carries the original site's stored line. The daily re-check asks the store about this site's own domain: if it isn't activated, the site keeps the key but stops sending a domain, so it stops updating. A local copy drops the domain without asking the store.

```php
// Somewhere that runs regularly - your component's dashboard, a module's render, a
// system plugin. Keep the time of the last call with your settings, so it runs at
// most once a day.
License::recheck($params->get('license_key', ''));
```

### 6. Optional: check the domain at download time

The stored line carries the domain that was activated. If someone copies a whole site (files and database), the copy carries that line too and can download under the original site's activation.

If your extension ships a system plugin, close that gap there: at download time, replace the stored domain with the domain of the site actually downloading. A copied site then sends its own domain, which was never activated, and the store refuses it with `ACTIVATION_NOT_FOUND` until it activates and uses up a site.

```php
use Joomla\CMS\Event\Installer\BeforePackageDownloadEvent;
use Joomla\CMS\Uri\Uri;

// In the system plugin you already ship: one entry in getSubscribedEvents(), and the method.
public static function getSubscribedEvents(): array
{
    return [
        // ...the events your plugin already handles stay as they are
        'onInstallerBeforePackageDownload' => 'onInstallerBeforePackageDownload',
    ];
}

public function onInstallerBeforePackageDownload(BeforePackageDownloadEvent $event): void
{
    $url   = $event->getUrl();
    $parts = parse_url($url);

    // Only this product's download on your store - never another vendor's.
    if (strcasecmp($parts['host'] ?? '', 'your-store.com') !== 0
        || !preg_match('#/licensedock/downloads/42/?$#', $parts['path'] ?? '')
    ) {
        return;
    }

    // The site doing the download, not the one stored when the key was saved.
    parse_str($parts['query'] ?? '', $query);
    $query['identifier'] = Uri::getInstance()->getHost();

    $event->updateUrl(strtok($url, '?') . '?' . http_build_query($query, '', '&', PHP_QUERY_RFC3986));
}
```

The host and path check keeps it to your own product's download, so the customer's domain is never sent to another vendor's update server. Modules and content plugins can't do this themselves: only a plugin loaded during an update download receives the event.

### 7. Set the product's Download API Access

Set it to **License key + activated identifier**. A download is then refused with `ACTIVATION_REQUIRED` when no domain is sent, and `ACTIVATION_NOT_FOUND` when the domain was never activated.

After switching an existing product, check **Components → LicenseDock → Downloads**, filtered to **Refused**, to see which customers are affected.

## Setup A Plus the Site Limit

For an extension already selling with Setup A that wants the site limit without asking customers to type their key again. It reaches the same result as Setup B with more code: Joomla keeps the key, your extension reads it and activates the site, and a plugin adds the domain to each update download.

### 1. Read the key Joomla stored

```php
use Joomla\CMS\Factory;
use Joomla\Database\DatabaseInterface;

// The key the customer entered as Joomla's Download Key lives in the
// update site's extra_query as "dlid=KEY". Read it - no extra field.
$db      = Factory::getContainer()->get(DatabaseInterface::class);  // or $this->getDatabase()
$element = 'com_myext';   // your extension's element - pkg_myext if you ship a package
$query   = $db->createQuery()
    ->select($db->quoteName('s.extra_query'))
    ->from($db->quoteName('#__update_sites', 's'))
    ->join('INNER', $db->quoteName('#__update_sites_extensions', 'se'), $db->quoteName('se.update_site_id') . ' = ' . $db->quoteName('s.update_site_id'))
    ->join('INNER', $db->quoteName('#__extensions', 'e'), $db->quoteName('e.extension_id') . ' = ' . $db->quoteName('se.extension_id'))
    ->where($db->quoteName('e.element') . ' = :element')
    ->bind(':element', $element);

parse_str((string) $db->setQuery($query)->loadResult(), $dl);
$key = $dl['dlid'] ?? '';   // hand this to the activate() call in step 2
```

### 2. Activate the site with it

Do this in your settings screen's save handler, not on every page load.

```php
use Joomla\CMS\Factory;
use Joomla\CMS\Http\HttpFactory;
use Joomla\CMS\Uri\Uri;

$domain = Uri::getInstance()->toString(['host']);  // this site, e.g. customer-site.com
// $key: the key read in step 1

$response = (new HttpFactory())->getHttp()->post(
    'https://your-store.com/api/index.php/v1/licensedock/licenses/activate',
    ['license_key' => $key, 'identifier' => $domain, 'product_id' => 42]
);
$body = json_decode((string) $response->getBody(), true);

if (isset($body['error'])) {
    // Not activated: limit reached, invalid/expired key, wrong product.
    // Warn the admin or degrade paid features.
    Factory::getApplication()->enqueueMessage($body['error']['message'], 'warning');
    $licensed = false;
} else {
    $licensed = true; // activated on this domain – full features
}
```

Pass the fields as an array so they go as form fields. The API ignores a JSON body.

### 3. Add the domain to each update download with a plugin

Joomla rebuilds the stored line from the Download Key box whenever the customer saves it, so the domain can't be stored there. It has to be added at download time, in the `onInstallerBeforePackageDownload` event, and only a plugin receives it: a component's listeners are registered only while that component runs, and during an update the running component is `com_installer`. The method is the same either way; only where it lives differs.

**Your extension already ships a system plugin?** Add the method to it. System plugins load on every request, the command line included, so it gets this event too. It stops only if the site owner switches that plugin off.

```php
// In the system plugin you already ship: two use lines, one entry in
// getSubscribedEvents(), and the method. Nothing else changes.
use Joomla\CMS\Event\Installer\BeforePackageDownloadEvent;
use Joomla\CMS\Uri\Uri;

public static function getSubscribedEvents(): array
{
    return [
        // ...the events your plugin already handles stay as they are
        'onInstallerBeforePackageDownload' => 'addIdentifier',
    ];
}

public function addIdentifier(BeforePackageDownloadEvent $event): void
{
    $url = $event->getUrl();

    // This fires for EVERY package Joomla downloads. Without the host
    // check you would send your customer's domain to every other
    // vendor's update server.
    if (Uri::getInstance($url)->getHost() !== 'your-store.com') {
        return;
    }

    $event->updateUrl(
        $url . (str_contains($url, '?') ? '&' : '?')
            . 'identifier=' . urlencode(Uri::getInstance()->getHost())
    );
}
```

**No plugin yet?** Create one in the `installer` group. Joomla loads that group right before every update download and nowhere else.

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- plugins/installer/myext/myext.xml -->
<extension type="plugin" group="installer" method="upgrade">
    <name>plg_installer_myext</name>
    <version>1.0.0</version>
    <namespace path="src">YourVendor\Plugin\Installer\Myext</namespace>
    <files>
        <folder plugin="myext">services</folder>
        <folder>src</folder>
    </files>
</extension>
```

```php
<?php
// plugins/installer/myext/services/provider.php
\defined('_JEXEC') or die;

use Joomla\CMS\Extension\PluginInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use YourVendor\Plugin\Installer\Myext\Extension\Myext;

return new class () implements ServiceProviderInterface {
    public function register(Container $container)
    {
        $container->set(
            PluginInterface::class,
            function (Container $container) {
                $plugin = new Myext((array) PluginHelper::getPlugin('installer', 'myext'));
                $plugin->setApplication(Factory::getApplication());

                return $plugin;
            }
        );
    }
};
```

```php
<?php
// plugins/installer/myext/src/Extension/Myext.php
namespace YourVendor\Plugin\Installer\Myext\Extension;

use Joomla\CMS\Event\Installer\BeforePackageDownloadEvent;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Uri\Uri;
use Joomla\Event\SubscriberInterface;

\defined('_JEXEC') or die;

final class Myext extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return ['onInstallerBeforePackageDownload' => 'addIdentifier'];
    }

    public function addIdentifier(BeforePackageDownloadEvent $event): void
    {
        $url = $event->getUrl();

        // This fires for EVERY package Joomla downloads. Without the host
        // check you would send your customer's domain to every other
        // vendor's update server.
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

Ship the plugin in a package with your extension, because a component or module can't install a plugin on its own. A module or template has no other way here: only plugins receive events. The update site and the Download Key then sit on the package (`pkg_myext`), so the update XML describes the package. Swap the module line for your extension:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- pkg_myext.xml - your module and the installer plugin, installed and updated together -->
<extension type="package" method="upgrade">
    <name>Your Extension</name>
    <packagename>myext</packagename>
    <version>1.0.0</version>
    <scriptfile>script.php</scriptfile>
    <files>
        <file type="module" id="mod_myext" client="site">mod_myext.zip</file>
        <file type="plugin" id="myext" group="installer">plg_installer_myext.zip</file>
    </files>
    <changelogurl>https://your-store.com/api/index.php/v1/licensedock/changelog/42</changelogurl>
    <updateservers>
        <server type="extension" name="Your Extension">https://your-store.com/updates/my-extension.xml</server>
    </updateservers>
    <dlid prefix="dlid=" suffix=""/>
</extension>
```

Joomla installs every new plugin switched off, so switch it on from the package's install script:

```php
// Your package's install script (<scriptfile> in pkg_myext.xml).
use Joomla\CMS\Factory;
use Joomla\CMS\Installer\InstallerAdapter;
use Joomla\Database\DatabaseInterface;

public function postflight(string $type, InstallerAdapter $adapter): bool
{
    // Install only: an update must never re-enable a plugin the site owner turned off.
    if ($type === 'install') {
        $db      = Factory::getContainer()->get(DatabaseInterface::class);
        $kind    = 'plugin';
        $folder  = 'installer';
        $element = 'myext';

        $db->setQuery(
            $db->createQuery()
                ->update($db->quoteName('#__extensions'))
                ->set($db->quoteName('enabled') . ' = 1')
                ->where($db->quoteName('type') . ' = :kind')
                ->where($db->quoteName('folder') . ' = :folder')
                ->where($db->quoteName('element') . ' = :element')
                ->bind(':kind', $kind)
                ->bind(':folder', $folder)
                ->bind(':element', $element)
        )->execute();
    }

    return true;
}
```

`getUrl()` and `updateUrl()` are the event's own methods. `$event['url'] = …` throws, because the event is immutable. The older by-reference `&$url` listener signature still works in current Joomla and is dropped in Joomla 7.

### 4. Set the product's Download API Access

Set it to **License key + activated identifier**, as in Setup B, step 7.

## Errors in Joomla

When the request carries `dlid`, the download endpoint answers errors with an HTML page carrying the status code, the error code, a message and a link to the customer's account. Joomla records a failed update download against the HTTP status. The codes are in [Downloads](/licensedock/api/downloads#errors).

Joomla sometimes joins the key with `&amp;dlid=` in place of `&dlid=`. LicenseDock reads both.

## Optional: A Changelog Button

Joomla shows a **Changelog** button next to an extension when it has a changelog URL. Point it at the product's [changelog endpoint](/licensedock/api/changelog), which serves the release notes from the product's **Downloads** tab.

Add the line to your manifest, next to `<updateservers>`:

```xml
<changelogurl>https://your-store.com/api/index.php/v1/licensedock/changelog/42</changelogurl>
```

and inside `<update>` in your update XML:

```xml
<changelogurl>https://your-store.com/api/index.php/v1/licensedock/changelog/42</changelogurl>
```

Joomla reads the manifest copy for the installed version in **System → Manage → Extensions**, and the update XML copy for the offered version in **System → Update → Extensions**.

Joomla shows only the entry whose version exactly equals the version in your package. Enter the same string on the Downloads tab: `2.1.0` and `v2.1.0` don't match, and Joomla then shows no button.

Labels and headings in the release notes become Joomla's groups (Bug Fixes, New Features and so on). See [Writing release notes](/licensedock/products/downloads#writing-release-notes).

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
