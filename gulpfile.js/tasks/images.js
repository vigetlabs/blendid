var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var config      = require('../config')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')

var settings = {
  src: config.src.root + "/" + config.src.images + "/**",
  dest: config.dest.root + "/" + config.dest.images
}

gulp.task('images', function() {
  return gulp.src(settings.src)
    .pipe(changed(settings.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.reload({stream:true}))
})
