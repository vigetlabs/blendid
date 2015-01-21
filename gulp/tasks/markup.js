var gulp        = require('gulp')
var config      = require('../config').markup
var browserSync = require('browser-sync')

var markupTask = function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}))
}

gulp.task('markup', markupTask)
module.exports = markupTask
