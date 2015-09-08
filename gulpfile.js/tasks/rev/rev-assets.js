var revNapkin      = require('gulp-rev-napkin');
var config = require('../../config');
var gulp   = require('gulp');
var rev    = require('gulp-rev');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function() {
  // Ignore what we dont want to hash in this step
  var notThese = '!' + config.dest.root + '/**/*+(css|js|json|html)'

  return gulp.src([config.dest.root + '/**/*', notThese])
    .pipe(rev())
    .pipe(gulp.dest(config.dest.root))
    .pipe(revNapkin({verbose: false}))
    .pipe(rev.manifest(config.dest.root.substr(2) + '/rev-manifest.json', {merge: true}))
    .pipe(gulp.dest(''));
});
