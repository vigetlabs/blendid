const gulp = require('gulp')
const log = require('fancy-log')
const colors = require('ansi-colors')

gulp.task('init-craft', function() {
  log(colors.red(
    `The init-craft task is deprecated, please use init-craft2 or init-craft3
  `))
})
