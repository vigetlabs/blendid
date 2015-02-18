var browserSync = require('browser-sync');
var config      = require('../config').html;
var gulp        = require('gulp');
var swig        = require('gulp-swig');

gulp.task('html', function() {
  gulp.src(config.src)
    .pipe(swig(config.swig))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
