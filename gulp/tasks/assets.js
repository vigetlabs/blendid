var gulp = require('gulp');

gulp.task('assets', function() {
  return gulp.src(['src/assets/**', '!src/assets/{images,images/**}'])
    .pipe(gulp.dest('build/assets'));
});
