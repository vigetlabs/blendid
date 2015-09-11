var config      = require('../../config')
if(!config.src.iconFont) return

var gulp             = require('gulp')
var iconfont         = require('gulp-iconfont')
var generateIconSass = require('./generateIconSass')
var handleErrors     = require('../../lib/handleErrors')
var package          = require('../../../package.json')
var path             = require('path')

var fontPath = path.join(config.dest.root, config.dest.fonts)
var cssPath = path.join(config.dest.root, config.dest.css)

var settings = {
  name: package.name + ' icons',
  src: path.join(config.src.root, config.src.iconFont, '/*.svg'),
  dest: path.join(config.dest.root, config.dest.iconFont),
  sassDest: path.join(config.src.root, config.src.css, config.dest.iconFontSass),
  template: path.normalize('./gulpfile.js/tasks/iconFont/template.sass'),
  sassOutputName: '_icons.sass',
  fontPath: path.relative(cssPath, fontPath),
  className: 'icon',
  options: {
    svg: true,
    timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
    fontName: 'icons',
    appendUnicode: true,
    normalize: false
  }
}

gulp.task('icon-font', function() {
  return gulp.src(settings.src)
    .pipe(iconfont(settings.options))
    .on('glyphs', generateIconSass(settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(settings.dest))
})

module.exports = settings
