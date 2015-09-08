var gulp   = require('gulp')
var config = require('../config')
var watch  = require('gulp-watch')

var settings = {
  fonts: config.src.root + '/' + config.src.fonts + '/**/*',
  html: config.src.root + '/' + config.src.html + '/**/*.html',
  iconFont: config.src.root + '/' + config.src.iconFont + '/**/*',
  images: config.src.root + '/' + config.src.images + '/**/*',
  sass: config.src.root + '/' + config.src.sass + '/**/*',
  svgSprite: config.src.root + '/' + config.src.svgSprite + '/**/*'
}

gulp.task('watch', ['browserSync'], function() {
  watch(settings.fonts, function() { gulp.start('fonts') })
  watch(settings.html, function() { gulp.start('html') })
  watch(settings.iconFont, function() { gulp.start('iconFont') })
  watch(settings.images, function() { gulp.start('images') })
  watch(settings.sass, function() { gulp.start('sass') })
  watch(settings.svgSprite, function() { gulp.start('svg-sprite') })
})
