var gulp    = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', ['production-build'], function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages({force: true}));
});
