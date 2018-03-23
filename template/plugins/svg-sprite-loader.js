if (process.browser) {
  const files = require.context('~/static/img/icons/', true, /\.svg$/);
  files.keys().forEach(files);
}
