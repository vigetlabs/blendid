var gulp        = require('gulp')
var rev         = require('gulp-rev')
var revNapkin   = require('gulp-rev-napkin');
var projectPath = require('../../lib/projectPath')

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function() {
  // Ignore files that may reference assets. We'll rev them next.
  var ignoreThese = '!' + projectPath(PATH_CONFIG.dest,'**/*+(css|js|map|json|html)')

  return gulp.src([projectPath(PATH_CONFIG.dest,'**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(PATH_CONFIG.dest))
    .pipe(revNapkin({ verbose: false, force: true }))
    .pipe(rev.manifest(projectPath(PATH_CONFIG.dest, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
})
