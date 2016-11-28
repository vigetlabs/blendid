module.exports = {
  browserSync: {
    proxy: 'localhost:3000',
    files: ['app/**/*'],
  },

  javascripts: {
    publicPath: '/assets/javascripts',
    entries: {
      app: ['./app.js']
    },
    extensions: ['js', 'json']
  },

  stylesheets: {
    autoprefixer: {
      browsers: ['last 3 version']
    },
    sass: {
      indentedSyntax: true,
      includePaths: [
        './node_modules/normalize.css'
      ]
    },
    extensions: ['sass', 'scss', 'css']
  },

  images: {
    extensions: ['jpg', 'png', 'svg', 'gif']
  },

  fonts: {
    extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
  },

  svgSprite: {
    extensions: ['svg']
  },

  production: {
    rev: true
  }
}
