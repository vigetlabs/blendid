if(!GULP_CONFIG.tasks.iconFont) return

var gulp             = require('gulp')
var iconfont         = require('gulp-iconfont')
var generateIconSass = require('./generateIconSass')
var handleErrors     = require('../../lib/handleErrors')
var package          = require('../../../package.json')
var path             = require('path')
var url              = require('url')

var fontPath = path.join(GULP_CONFIG.root.dest, GULP_CONFIG.tasks.iconFont.dest)
var cssPath = path.join(GULP_CONFIG.root.dest, GULP_CONFIG.tasks.css.dest)

var settings = {
  name: package.name + ' icons',
  src: path.join(GULP_CONFIG.root.src, GULP_CONFIG.tasks.iconFont.src, '/*.svg'),
  dest: path.join(GULP_CONFIG.root.dest, GULP_CONFIG.tasks.iconFont.dest),
  sassDest: path.join(GULP_CONFIG.root.src, GULP_CONFIG.tasks.css.src, GULP_CONFIG.tasks.iconFont.sassDest),
  template: path.normalize('./gulpfile.js/tasks/iconFont/template.sass'),
  sassOutputName: '_icons.sass',
  fontPath: url.resolve('.',path.relative(cssPath, fontPath)),
  className: 'icon',
  options: {
    timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
    fontName: 'icons',
    normalize: false,
    formats: GULP_CONFIG.tasks.iconFont.extensions
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
