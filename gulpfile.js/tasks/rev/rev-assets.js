var gulp      = require('gulp')
var dest      = require('../../lib/dest')
var path      = require('path')
var rev       = require('gulp-rev')
var revNapkin = require('gulp-rev-napkin');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function() {
  // Ignore files that may reference assets. We'll rev them next.
  var ignoreThese = '!' + dest('**/*+(css|js|json|html)')

  return gulp.src([dest('**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(dest()))
    .pipe(revNapkin({verbose: false, force: true}))
    .pipe(rev.manifest(dest('rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
})
