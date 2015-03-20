var browserSync  = require('browser-sync');
var config       = require('../config/html');
var gulp         = require('gulp');
var swig         = require('gulp-swig');
var handleErrors = require('../lib/handleErrors');

gulp.task('html', function() {
  return gulp.src(config.src)
    .pipe(swig(config.swig))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
