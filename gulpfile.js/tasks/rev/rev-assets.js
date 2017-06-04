var gulp      = require('gulp')
var path      = require('path')
var rev       = require('gulp-rev')
var revNapkin = require('gulp-rev-napkin');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function() {
  var srcPath = path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.rootPath || '')

  // Ignore files that may reference assets. We'll rev them next.
  var ignoreThese = '!' + path.resolve(srcPath, '**/*+(css|js|map|json|html|hbs|twig)')

  return gulp.src([path.resolve(srcPath, '**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(srcPath))
    .pipe(revNapkin({ verbose: false, force: true }))
    .pipe(rev.manifest(path.resolve(process.env.PWD, PATH_CONFIG.dest, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
})
