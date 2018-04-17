if (process.browser) {
  const files = require.context('~/assets/img/icons/', true, /\.svg$/);
  files.keys().forEach(files);
}
