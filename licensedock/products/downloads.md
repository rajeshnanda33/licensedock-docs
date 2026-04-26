# Downloads

Attach versioned releases to a product. Customers with a valid license see them in the customer portal and via the [downloads API](/licensedock/api/downloads).

## Adding a Download

1. Open the product
2. Go to the **Downloads** tab → **Add Download**
3. Set the **Version** (e.g. `1.2.0`) and **Changelog**
4. Upload one or more files
5. Save

## Multiple Files per Version

Each release can hold several files. This is useful for:

- Cross-platform builds (Windows, macOS, Linux)
- Source vs compiled
- Add-ons or language packs

Each file has its own **Label** (e.g. *Windows installer*, *macOS dmg*, *Source*) – the label is what customers see in the portal.

## File Storage

Files are stored under the configured download path (default `licensedock/downloads`). Subfolders are organised per product. The webserver should not allow direct access to this directory – LicenseDock streams files through the download endpoint after verifying the license.

### Allowed File Types

LicenseDock allows the formats you'd expect for digital products: archives (zip, tar.gz, 7z), documents (pdf, docx, epub), images, audio, video, design files, fonts, 3D, and structured data.

Executable file types are blocked at upload – `.php`, `.phtml`, `.sh`, `.bash`, `.exe`, `.bat`, `.cmd`, `.cgi`, `.pl`, `.py`, `.htaccess`, and `.html` are rejected to prevent webshell uploads.

## Versioning

The **Version** field is plain text – use semantic versioning (`1.2.3`) for predictable ordering.

When you upload a new version, the older releases stay available – customers always see the latest in the portal, but the API's update check returns the highest published version.

## Joomla Extension Updates

If you sell Joomla extensions, point Joomla's update server to LicenseDock so customers receive updates inside their Joomla admin. See [Joomla Update Server Integration](/licensedock/api/updates#joomla-update-server-integration).

## Secure Delivery

- The download API verifies the license is active, not expired, and tied to the requested product before streaming
- Path traversal is blocked – every served file must resolve inside the download base directory
- Each download is logged with user, license, IP, file, version, and timestamp – view the log under **Components → LicenseDock → Downloads**
