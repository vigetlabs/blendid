gulp = require("gulp")
config = require("../config").markup
gulp.task "markup", ->
  gulp.src(config.src).pipe gulp.dest(config.dest)
