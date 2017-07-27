const gulp = require('gulp')
const gutil = require('gulp-util')
const mergeStream = require('merge-stream')
const path = require('path')

gulp.task('init-http2', function() {
  const configStream = gulp.src(['extras/http2/**/*', '*!ASSET-README.md'])
    .pipe(gulp.dest(process.env.PWD))

  const srcStream = gulp.src(['src/**/*', '*.gitkeep', '!src/html{,/**}', '!src/static{,/**}'])
    .pipe(gulp.dest(path.join(process.env.PWD, PATH_CONFIG.src)))

  return mergeStream(configStream, srcStream)
})
