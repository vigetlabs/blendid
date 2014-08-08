var gulp = require('gulp');

gulp.task('markup', function() {
  return gulp.src('src/htdocs/**')
    .pipe(gulp.dest('build'));
});
