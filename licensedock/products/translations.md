# Translations

On a multilingual Joomla site, LicenseDock can show product, plan, download and tag content in each site language. Each product keeps one set of plans, prices, orders and licenses – translations are an overlay on top of the source text.

## Requirements

- Joomla multilingual set up (the **System - Language Filter** plugin enabled)
- At least one content language besides the source language, installed and published

Without a second language, the translation screen shows *Install and publish at least one extra content language to start translating.*

## Translating a Product

1. Open the product and save it once
2. Click **Translations** at the right end of the toolbar
3. Pick a language tab
4. Fill in the fields you want translated. The source text is shown with each field
5. Click **Save** or **Save & Close**. **Back to item** returns to the product

Leave a field blank to fall back to the source language.

Tags have the same **Translations** button on the tag edit screen.

## What Is Translatable

| Item | Fields |
|------|--------|
| Product | Title, Short description, Description, Description (below plans), Highlights, Button text, Info buttons (labels), Meta title, Meta description, Meta keywords |
| Plan | Title, Description, Recommended label, Features (texts) |
| Download version | Release notes |
| Download file | Label |
| Tag | Title, Description |

The product translation screen covers the product, its plans and its download versions and files on one page.

Aliases, prices, images and URLs are shared by all languages.

## Status

Each language tab shows a status icon, and a field whose source has changed carries an *Outdated* badge:

| Status | Meaning |
|--------|---------|
| Translated | A translation exists |
| Not translated | No translation yet – the source text shows |
| Outdated | The source text changed after this translation was saved. Review it and save again |

Feature lists and info buttons are matched to the source by position. Reordering or editing them in the source marks their translation as outdated.

## Buy Links on Multilingual Sites

**Copy buy link** always produces a link in the site's default language, so the checkout page loads without a language redirect.
