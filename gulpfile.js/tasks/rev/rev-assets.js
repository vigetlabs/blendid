var config = require('../../config');
var gulp   = require('gulp');
var rev    = require('gulp-rev');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function(){
  // See comment below about eot,woff, and ttf
  config.publicAssets + '/**/*'
  return gulp.src([config.publicAssets + '/**/*', '!' + config.publicAssets + '/**/*+(css|js|eot|woff|ttf)'])
    .pipe(rev())
    .pipe(gulp.dest(config.publicAssets))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.publicAssets));
});
