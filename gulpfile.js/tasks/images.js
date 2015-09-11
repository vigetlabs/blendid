var config      = require('../config')
if(!config.src.images) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var path        = require('path')

var settings = {
  src: path.join(config.src.root, config.src.images, '/**'),
  dest: path.join(config.dest.root, config.dest.images)
}

gulp.task('images', function() {
  return gulp.src(settings.src)
    .pipe(changed(settings.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.reload({stream:true}))
})
