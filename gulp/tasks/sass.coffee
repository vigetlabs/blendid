gulp = require("gulp")
sass = require("gulp-ruby-sass")
handleErrors = require("../util/handleErrors")
config = require("../config").sass
gulp.task "sass", ["images"], ->
  gulp.src(config.src).pipe(sass(
    compass: true
    bundleExec: true
    sourcemap: true
    sourcemapPath: "../sass"
  )).on("error", handleErrors).pipe gulp.dest(config.dest)
