module.exports = {
  html        : false,
  images      : true,
  fonts       : true,
  svgSprite   : true,
  stylesheets : true,

  browserSync: {
    proxy: 'localhost:3000',
    files: ['app/**/*'],
  },

  javascripts: {
    publicPath: '/assets/javascripts',
    entry: {
      app: ['./app.js']
    }
  }
}
