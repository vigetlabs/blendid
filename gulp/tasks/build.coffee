gulp = require("gulp")

gulp.task "build", [
  "browserify"
  "styles"
  "images"
  "markup"
]
