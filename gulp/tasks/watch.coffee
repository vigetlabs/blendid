# Notes:
#   - gulp/tasks/browserify.js handles js recompiling with watchify
#   - gulp/tasks/browserSync.js watches and reloads compiled files
#
gulp = require("gulp")
config = require("../config")

gulp.task "watch", [
  "setWatch"
  "browserSync"
], ->
  gulp.watch config.styles.src, ["styles"]
  gulp.watch config.images.src, ["images"]
  gulp.watch config.markup.src, ["templates"]
  return
