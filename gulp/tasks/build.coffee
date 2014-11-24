gulp = require("gulp")
runSequence = require 'run-sequence'

gulp.task "build", (cb) ->
  runSequence 'clean', [
    "browserify"
    "styles"
    "images"
    "templates"
    "staticFiles"
  ], cb
