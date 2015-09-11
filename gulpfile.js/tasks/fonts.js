var config      = require('../config')
if(!config.src.fonts) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var path        = require('path')

var settings = {
  src: path.join(config.src.root, config.src.fonts, '/**/*'),
  dest: path.join(config.dest.root, config.dest.fonts)
}

gulp.task('fonts', function() {
  return gulp.src(settings.src)
    .pipe(changed(settings.dest)) // Ignore unchanged files
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.reload({stream:true}))
})
