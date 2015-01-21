var gulp = require('gulp');
var config = require('../config');
var markup = config.markup;
var htmlreplace = require('gulp-html-replace');
var browserSync  = require('browser-sync');

gulp.task('markup', function() {
  return gulp.src(markup.src)
    .pipe(htmlreplace(config.htmlreplace))
    .pipe(gulp.dest(markup.dest))
    .pipe(browserSync.reload({stream:true}));
});
