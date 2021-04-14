module.exports = {
  outputDir: '../docs/vue',
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/naming-rule/vue/'
    : '/',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
}
