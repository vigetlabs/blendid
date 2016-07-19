var gulp      = require('gulp')
var path      = require('path')
var rev       = require('gulp-rev')
var revNapkin = require('gulp-rev-napkin');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function() {
  // Ignore files that may reference assets. We'll rev them next.
  var ignoreThese = '!' + path.join(GULP_CONFIG.root.dest,'/**/*+(css|js|json|html)')

  return gulp.src([path.join(GULP_CONFIG.root.dest,'/**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(GULP_CONFIG.root.dest))
    .pipe(revNapkin({verbose: false}))
    .pipe(rev.manifest(path.join(GULP_CONFIG.root.dest, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
})
