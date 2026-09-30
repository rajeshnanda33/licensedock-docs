# Downloads

Attach versioned releases to a product. Customers who own the product download them from their account, and licensed installs receive them through the [downloads API](/licensedock/api/downloads) and [update check](/licensedock/api/updates).

Manage them on the product's **Downloads** tab. Save the product first – the tab is empty until the product exists.

## Adding a Version

1. Open the product and go to the **Downloads** tab
2. Click **Add Version**
3. Enter the **Version** (required, for example `1.2.0`) and, optionally, a **Release date**
4. Add one or more files
5. Write the **Release notes**
6. Set the status and click **Apply**

### Version fields

| Field | Notes |
|-------|-------|
| Version | Required. Use semantic versioning, such as `1.0.0` or `2.1.3` |
| Release date | Optional. The date shown to customers. Blank uses the upload date. It does not affect which version auto-update serves |
| Release notes | Shown to customers on the download page. Start lines with `-`, `*` or `•` to render a bullet list |
| Status | Published or Unpublished. Only published versions are offered to customers and updaters |

## Files

Each version can hold several files – installer and documentation, builds for different platforms, source and compiled packages. Click **Add File** for each one.

| Field | Default | Notes |
|-------|---------|-------|
| Source | Upload | **Upload** from your computer, or **From server** to pick a file already on the server |
| Label | – | Optional. Shown as a badge next to the filename, such as *Install*, *Docs* or *Source* |
| Plan | – All plans – | Optional. Restricts the file to customers on one plan |
| Updates | Include in auto-updates | Turn off for files that are not the installable package – a PDF manual, an SDK, source code |

### Plan-restricted files

A file restricted to a plan is visible and downloadable only for customers whose license is on that plan. Files set to **– All plans –** are available to every plan. Customers who get the product through a [bundle](/licensedock/products/bundles) have no plan on it, so they receive only all-plans files.

### Auto-update files

Only files with **Include in auto-updates** ticked are served to updaters – Joomla's update system, the SDKs and the downloads API. Other files are marked **Manual** in the version list and can only be downloaded from the customer's account.

Auto-update serves the **newest published version that has an installable file**, by upload date. The order of the version list does not change this. The version list shows which version is currently served with a **Served to updaters** badge, or **Serves:** followed by plan names when different plans get different versions because of plan-restricted files.

## File Storage

Files are stored under the **Download Path** set in **Settings → Downloads**. When no path is set, LicenseDock uses a `licensedock-data/downloads` folder next to your site root – outside the web root – when the server allows it. The settings page checks whether the folder is publicly reachable and warns you if it is.

The download folder has reserved subfolders:

| Folder | Purpose |
|--------|---------|
| `_uploads` | Upload large files here over SFTP, then pick them with **From server**. The file moves into the product's folder when the version is saved |
| `_shared` | Files shared across products. They stay in place and can be attached to several versions |
| One folder per product ID | Holds that product's version folders |

The upload limit shown under the file list is your PHP upload limit. For larger files, use `_uploads`.

### Allowed file types

| Group | Extensions |
|-------|------------|
| Archives | zip, rar, 7z, tar, gz |
| Documents | pdf, doc, docx, xls, xlsx, ppt, pptx, txt, csv |
| Images | png, jpg, jpeg, svg, webp |
| Audio | mp3, wav, flac, aac, m4a |
| Video | mp4, mov, webm |
| Design | psd, ai, xd, fig, sketch |
| Fonts | ttf, otf, woff, woff2 |
| 3D | stl, obj, fbx, blend, glb |
| Books | epub |
| Data | sql |

Executable and script types are always rejected: `php`, `phtml`, `php3`, `php4`, `php5`, `phps`, `phar`, `sh`, `bash`, `exe`, `bat`, `cmd`, `com`, `cgi`, `pl`, `py`, `htaccess` and `html`.

## Delivery to Customers

Two settings decide how files reach buyers. They are independent.

### Delivery Method (store-wide)

**Settings → Downloads → Delivery Method** controls download links for buyers:

| Option | Behaviour |
|--------|-----------|
| Email + Account | Default. Download links in the receipt email (valid for 3 days) and on the account page |
| Account Only | Download links on the account page only. Buyers must sign in |

### Download API Access

**Download API Access** on the product's **Details** tab controls how the download API serves the product to updaters and SDKs.

| Option | Behaviour |
|--------|-----------|
| Not set | Default. The product's own settings decide, re-checked on every request |
| License key | A valid license key for the product is required. Where it is used is not checked |
| License key + activated identifier | The request must also send an identifier that is already activated on the license |
| Account only – never served by the API | The API refuses the download. The customer downloads from their account |
| Public – no license key needed | Anyone can download the product's all-plans files, no key needed |

With **Not set**, the API behaves as follows:

| Product | API behaviour |
|---------|---------------|
| Requires License = Yes | License key required |
| Requires License = No, paid | Account only – the API cannot identify a buyer without a key |
| Requires License = No, free | Public |

The option you pick can only make access stricter than this. A more open setting does not apply while **Requires License** is Yes, and the key-based options do not apply to a product that issues no license key. Below the field, the edit screen shows **Currently in force:** with the mode the API actually uses, and a warning when it differs from your choice.

## Integration URLs

The **Integration** section of the Downloads tab shows copy-ready details for this product under **Joomla**, **WordPress** and **REST API** tabs, including its download URL and update URL. The URLs serve nothing until a version has a file:

```
https://example.com/api/index.php/v1/licensedock/downloads/{product_id}
https://example.com/api/index.php/v1/licensedock/updates/{product_id}
```

See [Downloads API](/licensedock/api/downloads) and [Joomla Extensions](/licensedock/integrations/joomla) for the full reference.

## Download Log

Every download is logged. Open **Components → LicenseDock → Downloads** to browse served downloads by product and version. **Refused Downloads** lists downloads the API refused, grouped by license and reason, and keeps them for 90 days.

## Translations

Release notes and file labels are translatable. See [Translations](/licensedock/products/translations).
