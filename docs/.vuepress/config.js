module.exports = {
  title: 'Handsfree.js',
  description: 'Add client side, multi-user, head-tracked-from-afar mouse cursors and handsfree user interfaces to your projects just...like...✨...that!',
  evergreen: true,
  head: [
    ['link', {rel: 'icon', type: 'image/png', href: '/assets/img/logo-ooh-ooh.png'}],
    ['script', {async: 'async', src: 'https://unpkg.com/handsfree@^1'}]
  ],
  ga: 'UA-123557290-4',

  themeConfig: {
    search: true,
    nav: [
      {text: 'Guide', link: '/guide/'},
      {text: 'Chat', link: 'https://discord.gg/amh4jNZ'},
      {text: 'Twitter', link: 'https://twitter.com/labofoz'}
    ],

    repo: 'handsfreejs/handsfree',
    docsRepo: 'handsfreejs/docs',
    docsDir: 'docs',
    editLinks: true,

    serviceWorker: {
      updatePopup: {
        message: 'Hi, I just updated this page!',
        buttonText: 'Refresh page'
      }
    },

    sidebar: {
      '/guide/': [
        '',
        'getting-started',
        'events',
        'settings',
        'methods',
        'properties'
      ]
    }
  }
}
