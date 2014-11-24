gulp = require("gulp")
config = require("../config").markup
gulp.task "templates", ->
  gulp.src(config.src).pipe gulp.dest(config.dest)
