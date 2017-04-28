module.exports = {
  images      : true,
  fonts       : true,
  svgSprite   : true,
  stylesheets : true,

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ["./app.js"]
    }
  },

  browserSync: {
    // Update this to match your development URL
    proxy: 'craft.dev'
  },

  production: {
    rev: true
  },

  ghPages     : false,
  html        : false,
  static      : false
}

