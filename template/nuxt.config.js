const nodeExternals = require('webpack-node-externals')


module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'icex-landing-factory',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
      { rel: 'icon', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
      { rel: 'manifest', href: '/favicons/manifest.json' },
      { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700&amp;subset=cyrillic' },
      { rel: 'stylesheet', href: 'https://s3.amazonaws.com/icomoon.io/114779/Socicon/style.css?u8vidh' },
    ],
  },

  /*
  ** Customize the progress bar color
  */
  css: [
    { src: 'node_modules/bootstrap/scss/bootstrap.scss', lang: 'sass' },
  ],
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'vue-i18n',
      'v-click-outside',
      'vue-flickity',
    ],

    extend (config, { isServer }) {
      if (isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/\.(?!(?:js|json)$).{1,5}$/i, /^icex-landing-uikit/]
          })
        ]
      }
    },
  },
  plugins: [
    { src: '~/plugins/i18n.js', ssr: true },
    { src: '~/plugins/vueFlickity.js', ssr: false },
    { src: '~/plugins/clickOutside.js', ssr: false },
    { src: '~/plugins/uiKit.js', ssr: true },
  ],
}
