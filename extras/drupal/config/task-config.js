module.exports = {
  html        : false,
  images      : true,
  fonts       : true,
  static      : true,
  svgSprite   : true,
  ghPages     : false,
  stylesheets : true,

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ["./app.js"]
    },
    publicPath: './themes/custom/THEMENAME/public/javascripts'
  },

  browserSync: {
    proxy: 'drupal.dev',
    files: ['./src/**/*', './templates/**/*']
  },

  production: {
    rev: false
  }
}
