var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var config           = require('../../config');
var generateIconSass = require('./generateIconSass');
var handleErrors     = require('../../lib/handleErrors');
var package          = require('../../../package.json')

var settings = {
  name: package.name + ' icons',
  src: config.src.root + '/' + config.src.iconFont + '/*.svg',
  dest: config.dest.root + '/' + config.dest.iconFont,
  sassDest: config.src.root + '/' + config.src.css + '/' + config.dest.iconFontSass,
  template: './gulpfile.js/tasks/iconFont/template.sass',
  sassOutputName: '_icons.sass',
  fontPath: '../' + config.dest.fonts,
  className: 'icon',
  options: {
    svg: true,
    timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
    fontName: 'icons',
    appendUnicode: true,
    normalize: false
  }
}

gulp.task('iconFont', function() {
  return gulp.src(settings.src)
    .pipe(iconfont(settings.options))
    .on('glyphs', generateIconSass(settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(settings.dest));
});

module.exports = settings
