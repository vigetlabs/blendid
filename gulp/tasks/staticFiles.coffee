gulp = require("gulp")
config = require("../config").staticFiles

gulp.task "staticFiles", ->
  gulp.src(config.src)
  .pipe gulp.dest(config.dest)
