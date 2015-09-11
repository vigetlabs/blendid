var config      = require('../config')
if(!config.src.svgSprite) return

var browserSync = require('browser-sync')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var svgstore    = require('gulp-svgstore')
var path        = require('path')

gulp.task('svg-sprite', function() {

  var settings = {
    src: path.join(config.src.root, config.src.svgSprite, '/*.svg'),
    dest: path.join(config.dest.root, config.dest.svgSprite)
  }

  return gulp.src(settings.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.reload({stream: true}))
})
