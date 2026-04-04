import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LicenseDock',
  description: 'Documentation for LicenseDock – Joomla extension for selling digital products and software licenses',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/getting-started/installation' },
      { text: 'API Reference', link: '/api/' },
      { text: 'LicenseDock.com', link: 'https://licensedock.com' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Configuration', link: '/getting-started/configuration' },
          { text: 'Quick Start', link: '/getting-started/quick-start' }
        ]
      },
      {
        text: 'Products',
        items: [
          { text: 'Overview', link: '/products/' },
          { text: 'Plans & Pricing', link: '/products/plans' },
          { text: 'Downloads', link: '/products/downloads' },
          { text: 'Tags', link: '/products/tags' }
        ]
      },
      {
        text: 'Checkout',
        items: [
          { text: 'Checkout Flow', link: '/checkout/' },
          { text: 'Coupons', link: '/checkout/coupons' },
          { text: 'Guest Checkout', link: '/checkout/guest-checkout' }
        ]
      },
      {
        text: 'Licenses',
        items: [
          { text: 'Managing Licenses', link: '/licenses/' },
          { text: 'Activations', link: '/licenses/activations' }
        ]
      },
      {
        text: 'Payment Gateways',
        items: [
          { text: 'Stripe', link: '/gateways/stripe' },
          { text: 'PayPal', link: '/gateways/paypal' },
          { text: 'Mollie', link: '/gateways/mollie' },
          { text: 'Webhooks', link: '/gateways/webhooks' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Overview', link: '/api/' },
          { text: 'Activate License', link: '/api/activate' },
          { text: 'Deactivate License', link: '/api/deactivate' },
          { text: 'Validate License', link: '/api/validate' },
          { text: 'Check Updates', link: '/api/updates' },
          { text: 'Downloads', link: '/api/downloads' }
        ]
      },
      {
        text: 'Customer Portal',
        items: [
          { text: 'Overview', link: '/portal/' }
        ]
      },
      {
        text: 'Emails',
        items: [
          { text: 'Email Templates', link: '/emails/' }
        ]
      },
      {
        text: 'Invoices',
        items: [
          { text: 'Invoice Settings', link: '/invoices/' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/contona/licensedock' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'LicenseDock by Contona',
      copyright: 'Copyright 2026 Contona'
    }
  }
})
