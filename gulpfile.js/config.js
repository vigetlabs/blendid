module.exports = {
  root: {
    src: './src',
    dest: './public'
  },

  tasks: {
    js: {
      src: 'javascripts',
      dest: 'javascripts',
      extractSharedJs: true,
      entries: {
        app: ['./app.js'],
        page: ['./page.js']
      },
      extensions: ['js']
    },

    css: {
      src: 'stylesheets',
      dest: 'stylesheets',
      autoprefixer: {
        browsers: ['last 3 version']
      },
      sass: {
        indentedSyntax: true // Enable .sass syntax (.scss still works too)
      },
      extensions: ['sass', 'scss', 'css']
    },

    html: {
      src: 'html',
      dest: './',
      dataFile: 'data/global.json',
      htmlmin: {
        collapseWhitespace: true
      },
      extensions: ['html', 'json'],
      excludeFolders: ['layouts', 'shared', 'macros', 'data']
      // watchOther: './app/views/*/**.html'
    },

    images: {
      src: 'images',
      dest: 'images',
      extensions: ['jpg', 'png', 'svg', 'gif']
    },

    fonts: {
      src: 'fonts',
      dest: 'fonts',
      extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
    },

    iconFont: {
      src: 'icons',
      dest: 'fonts',
      sassDest: 'generated',
      extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
    },

    svgSprite: {
      src: 'sprites',
      dest: 'images',
      extensions: ['svg']
    }
  }
}
