var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var config           = require('../../config/iconFont');
var generateIconSass = require('./generateIconSass');
var handleErrors     = require('../../lib/handleErrors');

var settings = {
  name: 'Gulp Starter Icons',
  src: config.src.root + '/' + config.src.iconFont + '/*.svg',
  dest: config.dest.root + '/' + config.dest.iconFont,
  sassDest: config.src.root + '/' + config.src.css + '/generated',
  template: './gulpfile.js/tasks/iconFont/template.sass',
  sassOutputName: '_icons.sass',
  fontPath: '../' + config.dest.font,
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
    .on('glyphs', generateIconSass)
    .on('error', handleErrors)
    .pipe(gulp.dest(settings.dest));
});
