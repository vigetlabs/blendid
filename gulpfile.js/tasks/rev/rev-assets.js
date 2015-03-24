var config = require('../../config');
var gulp   = require('gulp');
var rev    = require('gulp-rev');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', ['build:production'], function(){
  // See comment below about eot,woff, and ttf
  config.publicAssets + '/**/*'
  return gulp.src([config.publicDirectory + '/**/*', '!' + config.publicDirectory + '/**/*+(css|js|json|eot|woff|ttf|html)'])
    .pipe(rev())
    .pipe(gulp.dest(config.publicDirectory))
    .pipe(rev.manifest('public/rev-manifest.json', {merge: true}))
    .pipe(gulp.dest(''));
});
