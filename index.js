var path = require('path')
var os = require('os')
var project = require('../../package.json')

// Main Directory Config (no trailing slashes)
var config = {
  src: {
    root: "./src",
    css: "stylesheets",
    fonts: "fonts"
    html: "html",
    iconFont: "icons",
    js: "javascripts",
    svgSprite: "sprites"
  },

  dest: {
    root: "./public",
    css: "stylesheets",
    fonts: "fonts"
    html: "",
    iconFont: "fonts",
    images: "images",
    js: "javascripts",
    svgSprite: "images/spritesheets"
  }
}

// Task Specific Configs
config.ghPages = {
  url: 'http://greypants.github.io/gulp-starter/',
  src: config.publicDirectory + '/**/*',
  ghPages: {
    // https://github.com/shinnn/gulp-gh-pages/issues/63
    cacheDir: path.join(os.tmpdir(),project.name)
  }
}

config.browserSync = {
  server: {
    baseDir: config.publicDirectory
  },
  files: ['public/**/*.html']
}

config.fonts = {
  src: config.sourceDirectory + '/fonts/**/*',
  dest: config.publicDirectory + '/fonts'
}

config.html = {
  watch: config.sourceDirectory + '/html/**/*.html',
  src: [config.sourceDirectory + '/html/**/*.html', '!**/{layouts,shared,macros}/**'],
  dest: config.publicDirectory,
  nunjucks: [config.sourceDirectory + '/html/'],
  htmlmin: {
    collapseWhitespace: true
  }
}

config.iconFont = {
  name: 'Gulp Starter Icons',
  src: config.sourceDirectory + '/icons/*.svg',
  dest: fontConfig.dest,
  sassDest: config.sourceDirectory + '/stylesheets/generated',
  template: './gulpfile.js/tasks/iconFont/template.sass',
  sassOutputName: '_icons.sass',
  fontPath: '../fonts',
  className: 'icon',
  options: {
    svg: true,
    timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
    fontName: 'icons',
    appendUnicode: true,
    normalize: false
  }
}

config.images = {
  src: config.sourceDirectory + "/images/**",
  dest: config.publicDirectory + "/images"
}

config.testing = {
  src: config.sourceDirectory + '/' + config.jsDir + '/**/__tests__/*'
}

config.sass = {
  autoprefixer: { browsers: ['last 2 version'] },
  src: config.sourceDirectory + "/stylesheets/**/*.{sass,scss}",
  dest: config.publicDirectory + '/stylesheets',
  settings: {
    indentedSyntax: true // Enable .sass syntax!
  }
}

config.server = {
  root: process.cwd() + config.publicDirectory.substr(1),
  port: process.env.PORT || 5000,
  logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
  staticOptions: {
    extensions: ['html'],
    maxAge: '31556926'
  }
}

config.svgSprite = {
  src: config.sourceDirectory + '/sprites/*.svg',
  dest: config.publicDirectory + '/images/spritesheets',
  transform: {
    before: {
      parserOptions: { xmlMode: true }
    }
  }
}

module.exports = config
