var gulp   = require('gulp')
var del    = require('del')
var config = require('../config')
var path   = require('path')

gulp.task('clean', function (cb) {
  var paths = []
  config.src.html && paths.push(path.resolve(config.dest.root, config.dest.html))
  config.src.js && paths.push(path.resolve(config.dest.root, config.dest.js))
  config.src.css && paths.push(path.resolve(config.dest.root, config.dest.css))
  config.src.fonts && paths.push(path.resolve(config.dest.root, config.dest.fonts))
  config.src.iconFontSass && paths.push(path.resolve(config.src.root, config.dest.iconFontSass))
  config.src.svgFont && paths.push(path.resolve(config.dest.root, config.dest.svgFont))
  config.src.iconFont && paths.push(path.resolve(config.dest.root, config.dest.iconFont))
  del(paths, cb)
})
