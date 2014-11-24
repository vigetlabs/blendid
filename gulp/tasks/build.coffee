gulp = require("gulp")

gulp.task "build", [
  "browserify"
  "styles"
  "images"
  "templates"
  "staticFiles"
]
