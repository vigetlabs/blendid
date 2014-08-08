/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js automatically reloads any files
     that change within the directory it's serving from
*/

var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
  gulp.watch('src/sass/**', ['sass']);
  gulp.watch('src/images/**', ['images']);
  gulp.watch('src/htdocs/**', ['markup']);
});
