var config = require('../../config');
var gulp   = require('gulp');
var rev    = require('gulp-rev');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function(){
  // See comment below about eot,woff, and ttf
  var notThese = '!' + config.publicDirectory + '/**/*+(css|js|json|eot|woff|woff2|ttf|html)'

  return gulp.src([config.publicDirectory + '/**/*', notThese])
    .pipe(rev())
    .pipe(gulp.dest(config.publicDirectory))
    .pipe(rev.manifest('public/rev-manifest.json', {merge: true}))
    .pipe(gulp.dest(''));
});
