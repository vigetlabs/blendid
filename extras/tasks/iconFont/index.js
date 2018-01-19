var config      = require('../../config')
if(!config.tasks.iconFont) return

var gulp             = require('gulp')
var iconfont         = require('gulp-iconfont')
var generateIconSass = require('./generateIconSass')
var handleErrors     = require('../../lib/handleErrors')
var package          = require('../../../package.json')
var path             = require('path')
var projectPath      = require('../../lib/projectPath')
var url              = require('url')

var fontPath = projectPath(config.root.dest, config.tasks.iconFont.dest)
var cssPath = projectPath(config.root.dest, config.tasks.css.dest)

var settings = {
  name: package.name + ' icons',
  src: projectPath(config.root.src, config.tasks.iconFont.src, '*.svg'),
  dest: projectPath(config.root.dest, config.tasks.iconFont.dest),
  sassDest: projectPath(config.root.src, config.tasks.css.src, config.tasks.iconFont.sassDest),
  template: path.normalize('./gulpfile.js/tasks/iconFont/template.sass'),
  sassOutputName: '_icons.sass',
  fontPath: url.resolve('.',path.relative(cssPath, fontPath)),
  className: 'icon',
  options: {
    timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
    fontName: 'icons',
    normalize: false,
    formats: config.tasks.iconFont.extensions
  }
}

var iconFontTask = function() {
  return gulp.src(settings.src)
    .pipe(iconfont(settings.options))
    .on('glyphs', generateIconSass(settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(settings.dest))
}

gulp.task('iconFont', iconFontTask)
module.exports = iconFontTask
