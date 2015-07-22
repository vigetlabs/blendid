var config = require('../../config');
var iconFontConfig = require('../../config/iconFont');
var gulp   = require('gulp');
var rev    = require('gulp-rev');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function() {
  // Ignore what we dont want to hash in this step
  var notThese = '!' + config.publicDirectory + '/**/*+(css|js|json|html)'

  return gulp.src([config.publicDirectory + '/**/*', notThese])
    .pipe(rev())
    .pipe(gulp.dest(config.publicDirectory))
    .pipe(rev.manifest('public/rev-manifest.json', {merge: true}))
    .pipe(gulp.dest(''));
});
