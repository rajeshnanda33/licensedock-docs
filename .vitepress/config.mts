import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Contona Docs',
  description: 'Documentation for Joomla extensions by Contona',

  srcExclude: ['CLAUDE.md', 'README.md'],

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Contona Docs',

    extensions: [
      { text: 'LicenseDock', link: '/licensedock/' },
      { text: 'Anything Slider', link: '/anything-slider/' }
    ],

    nav: [
      { text: 'contona.com', link: 'https://contona.com/joomla-extensions' }
    ],

    sidebar: {
      '/licensedock/': [
        {
          text: 'Introduction',
          link: '/licensedock/'
        },
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/licensedock/getting-started/installation' },
            { text: 'Configuration', link: '/licensedock/getting-started/configuration' },
            { text: 'Quick Start', link: '/licensedock/getting-started/quick-start' }
          ]
        },
        {
          text: 'Products',
          items: [
            { text: 'Overview', link: '/licensedock/products/' },
            { text: 'Plans & Pricing', link: '/licensedock/products/plans' },
            { text: 'Downloads', link: '/licensedock/products/downloads' },
            { text: 'Tags', link: '/licensedock/products/tags' }
          ]
        },
        {
          text: 'Checkout',
          items: [
            { text: 'Checkout Flow', link: '/licensedock/checkout/' },
            { text: 'Coupons', link: '/licensedock/checkout/coupons' },
            { text: 'Guest Checkout', link: '/licensedock/checkout/guest-checkout' }
          ]
        },
        {
          text: 'Licenses',
          items: [
            { text: 'Managing Licenses', link: '/licensedock/licenses/' },
            { text: 'Activations', link: '/licensedock/licenses/activations' }
          ]
        },
        {
          text: 'Payment Gateways',
          items: [
            { text: 'Stripe', link: '/licensedock/gateways/stripe' },
            { text: 'PayPal', link: '/licensedock/gateways/paypal' },
            { text: 'Mollie', link: '/licensedock/gateways/mollie' },
            { text: 'Webhooks', link: '/licensedock/gateways/webhooks' }
          ]
        },
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/licensedock/api/' },
            { text: 'Activate License', link: '/licensedock/api/activate' },
            { text: 'Deactivate License', link: '/licensedock/api/deactivate' },
            { text: 'Validate License', link: '/licensedock/api/validate' },
            { text: 'Check Updates', link: '/licensedock/api/updates' },
            { text: 'Downloads', link: '/licensedock/api/downloads' }
          ]
        },
        {
          text: 'Customer Portal',
          items: [
            { text: 'Overview', link: '/licensedock/portal/' }
          ]
        },
        {
          text: 'Emails',
          items: [
            { text: 'Email Templates', link: '/licensedock/emails/' }
          ]
        },
        {
          text: 'Invoices',
          items: [
            { text: 'Invoice Settings', link: '/licensedock/invoices/' }
          ]
        }
      ],

      '/anything-slider/': [
        {
          text: 'Introduction',
          link: '/anything-slider/'
        },
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/anything-slider/getting-started/installation' },
            { text: 'Configuration', link: '/anything-slider/getting-started/configuration' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/contona' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Joomla Extensions by Contona',
      copyright: 'Copyright 2026 Contona'
    }
  }
})
