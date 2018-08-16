module.exports = {
  title: 'Handsfree.js',
  description: 'Add client side, multi-user, head-tracked-from-afar mouse cursors and handsfree user interfaces to your projects just...like...✨...that!',
  evergreen: true,
  head: [
    ['link', {rel: 'icon', type: 'image/png', href: '/assets/img/logo-ooh-ooh.png'}]
  ],
  ga: 'UA-123557290-3',

  themeConfig: {
    search: true,
    nav: [
      {text: 'Guide', link: '/guide/'},
      {text: 'Twitter', link: 'https://twitter.com/labofoz'}
    ],

    repo: 'labofoz/seeclarke.js',
    docsDir: 'docs',
    editLinks: true,

    serviceWorker: {
      updatePopup: {
        message: 'Hi, I just updated this page!',
        buttonText: 'Refresh page'
      }
    },

    displayAllHeaders: true,
    sidebar: {
      '/guide/': [
        '',
        'getting-started'
      ]
    }
  }
}
