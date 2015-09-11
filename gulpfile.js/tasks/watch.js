var config = require('../config')
var gulp   = require('gulp')
var path   = require('path')
var watch  = require('gulp-watch')

var settings = {
  fonts     : config.src.fonts     ? path.join(config.src.root, config.src.fonts, '/**/*') : false,
  html      : config.src.html      ? path.join(config.src.root, config.src.html, '/**/*.html') : false,
  iconFont  : config.src.iconFont  ? path.join(config.src.root, config.src.iconFont, '/**/*') : false,
  images    : config.src.images    ? path.join(config.src.root, config.src.images, '/**/*') : false,
  css       : config.src.css       ? path.join(config.src.root, config.src.css, '/**/*') : false,
  svgSprite : config.src.svgSprite ? path.join(config.src.root, config.src.svgSprite, '/**/*'): false
}

gulp.task('watch', ['browserSync'], function() {
  settings.fonts     && watch(settings.fonts,     function () { gulp.start('fonts') })
  settings.html      && watch(settings.html,      function () { gulp.start('html') })
  settings.iconFont  && watch(settings.iconFont,  function () { gulp.start('iconFont') })
  settings.images    && watch(settings.images,    function () { gulp.start('images') })
  settings.css       && watch(settings.css,       function () { gulp.start('sass') })
  settings.svgSprite && watch(settings.svgSprite, function () { gulp.start('svg-sprite') })
})
