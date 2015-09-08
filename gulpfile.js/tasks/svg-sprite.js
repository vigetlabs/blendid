var browserSync = require('browser-sync')
var config      = require('../config')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var svgstore    = require('gulp-svgstore')

gulp.task('svg-sprite', function() {

  var settings = {
    src: config.src.root + '/' + config.src.svgSprite + '/*.svg',
    dest: config.dest.root + '/' + config.dest.svgSprite
  }

  return gulp.src(settings.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.reload({stream: true}))
})
