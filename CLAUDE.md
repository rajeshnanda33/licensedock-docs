# LicenseDock Docs – Development Notes

## Project
VitePress documentation site for LicenseDock, a Joomla 5 extension for selling digital products and software licenses.

## Stack
- **Framework:** VitePress
- **Content:** Markdown files
- **Hosting:** Cloudflare Pages (planned), subdomain `docs.licensedock.com`
- **Location:** `~/Projects/licensedock-docs/`

## Commands
- `npm run dev` – local dev server (default port 5173)
- `npm run build` – production build
- `npm run preview` – preview production build

## Structure
```
├── .vitepress/config.mts    ← site config, nav, sidebar
├── index.md                  ← home page (hero + features)
├── getting-started/          ← installation, configuration, quick start
├── products/                 ← products, plans, pricing, downloads, tags
├── checkout/                 ← checkout flow, coupons, guest checkout
├── licenses/                 ← license management, activations
├── gateways/                 ← Stripe, PayPal, Mollie, webhooks
├── api/                      ← REST API reference (6 endpoints)
├── portal/                   ← customer portal
├── emails/                   ← email templates
└── invoices/                 ← invoice settings
```

## Writing Style
- Write for Joomla developers – they know the CMS, don't over-explain Joomla basics
- Keep language simple and direct, no jargon
- Don't mention what's NOT required – just state what IS needed
- Use en-dash (`–`) not em-dash (`—`) for separators
- Use tables for structured data (parameters, error codes, settings)
- Use code blocks for URLs, API requests/responses, XML snippets
- VitePress tips/warnings: use `:::tip` and `:::info` containers sparingly

## Content Rules
- All content must match the actual LicenseDock codebase at `~/Herd/contona-130326/`
- API docs must reflect real endpoints, parameters, and response formats
- When in doubt, read the source code before writing docs
- Sidebar is defined in `.vitepress/config.mts` – update it when adding/removing pages

## Source of Truth
The LicenseDock codebase is at `/Users/rajesh/Herd/contona-130326/`. Always verify against it for accuracy.
