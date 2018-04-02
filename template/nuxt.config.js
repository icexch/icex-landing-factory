const nodeExternals = require('webpack-node-externals')


module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'ICEX wallet',
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
  router: {
    middleware: ['i18n'],
  },
  build: {

    extend(config, { isServer }) {
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg)$/');
      config.module.rules.splice(config.module.rules.indexOf(rule), 1);

      // add it again, but now without 'assets\/svg'
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        exclude: /(static\/img\/icons)/,
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash:7].[ext]',
        },
      });

      config.module.rules.push({
        test: /\.svg$/,
        include: /static\/img\/icons/,
        use: 'svg-sprite-loader',
      });

      if (isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/\.(?!(?:js|json)$).{1,5}$/i, /^icex-landing-uikit/]
          })
        ]
      }

    },

    vendor: [
      'vue-i18n',
      'v-click-outside',
      'vue-flickity',
      'vue-scrollto',
    ],
  },
  plugins: [
    { src: '~/plugins/i18n.js', ssr: true },
    { src: '~/plugins/ui-kit.js', ssr: true },
    { src: '~/plugins/vue-flickity.js', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/vue-scrollto.js', ssr: false },
    { src: '~/plugins/click-outside.js', ssr: false },
    { src: '~/plugins/svg-sprite-loader.js', ssr: false },
  ],
}
