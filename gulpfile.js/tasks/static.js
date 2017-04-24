if(!TASK_CONFIG.static) return

const changed = require('gulp-changed')
const gulp    = require('gulp')
const path    = require('path')

const staticTask = function() {
  const srcPath = path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.static.src)
  const defaultSrcOptions = { dot: true }
  const options = Object.assign(defaultSrcOptions, (TASK_CONFIG.static.srcOptions || {}))

  const paths = {
    src: [
      path.join(srcPath, '**/*'),
      path.resolve(process.env.PWD, '!' + PATH_CONFIG.src, PATH_CONFIG.static.src, 'README.md')
    ],
    dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.static.dest)
  }

  return gulp.src(paths.src, options)
    .pipe(gulp.dest(paths.dest))
}

gulp.task('static', staticTask)
module.exports = staticTask
