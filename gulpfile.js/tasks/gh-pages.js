const ghPages = require('gulp-gh-pages')
const gulp    = require('gulp')
const os      = require('os')
const path    = require('path')

const ghPagesTask = function() {
  const pkg = require(path.resolve(process.env.PWD, 'package.json'))

  const settings = {
    src: path.resolve(process.env.PWD, PATH_CONFIG.finalDest, '**/*')
  }

  return gulp.src(settings.src)
    .pipe(ghPages(TASK_CONFIG.ghPages))
}

gulp.task('gh-pages', ['build'], ghPagesTask)
module.exports = ghPagesTask
