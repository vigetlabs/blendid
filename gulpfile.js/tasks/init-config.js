const gulp = require('gulp')
const gutil = require('gulp-util')
const path = require('path')
const merge = require('merge-stream')

gulp.task('init-config', function() {
  const configStream = gulp.src(['gulpfile.js/path-config.json', 'gulpfile.js/task-config.js'])
    .pipe(gulp.dest(path.join(process.env.PWD, 'config')))

  gutil.log(gutil.colors.green('Adding default path-config.json and task-config.js files to ./config/'))

  return configStream
})
