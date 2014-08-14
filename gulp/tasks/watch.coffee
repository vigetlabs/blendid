# Notes:
#   - gulp/tasks/browserify.js handles js recompiling with watchify
#   - gulp/tasks/browserSync.js automatically reloads any files
#     that change within the directory it's serving from
#
gulp = require 'gulp'

gulp.task 'watch', ['setWatch','browserSync'], ->
  gulp.watch 'src/sass/**', ['sass']
  gulp.watch 'src/images/**', ['images']
  gulp.watch 'src/htdocs/**', ['markup']