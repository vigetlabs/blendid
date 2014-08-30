/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
  gulp.watch('src/sass/**', ['sass']);
  gulp.watch('src/images/**', ['images']);
  gulp.watch('src/htdocs/**', ['markup']);
});
