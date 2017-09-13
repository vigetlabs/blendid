const gulp = require('gulp')
const gutil = require('gulp-util')
const mergeStream = require('merge-stream')
const path = require('path')
const del  = require('del')

gulp.task('init-http2', function() {
  del(
    [path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.stylesheets.src)],
    { force: true }
  )

  gutil.log(gutil.colors.green('Cleaned stylesheets directory'))

  const configStream = gulp.src(['extras/http2/**/*'])
    .pipe(gulp.dest(process.env.PWD))

  const srcStream = gulp.src(
    [
      'src/stylesheets'
    ]
  ).pipe(gulp.dest(path.join(process.env.PWD, PATH_CONFIG.src)))

  gutil.log(gutil.colors.green('Created HTTP/2 ready stylesheets directory'))
  gutil.log(gutil.colors.green('Created config/path-config.json'))

  return mergeStream(configStream, srcStream)
})
