var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var config     = require('../config').css;

gulp.task('minify-css', function() {
  return gulp.src(config.src)
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest(config.dist));
});
