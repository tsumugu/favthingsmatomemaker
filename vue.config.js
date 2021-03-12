module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/style/colors.scss";`
      }
    }
  }
}