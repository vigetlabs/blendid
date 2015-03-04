var config = require('../../config');
var filter = require('gulp-filter');
var gulp   = require('gulp');
var minify = require('gulp-minify-css');
var rev    = require('gulp-rev');
var uglify = require('gulp-uglify');

// 4) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css-js-compress', ['rev-update-references'], function(){
  var jsFilter = filter('**/**.js');
  var cssFilter = filter('**/**.css');

  return gulp.src([config.publicAssets + '/**/*.{css,js}'])
    .pipe(rev())
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(minify())
    .pipe(cssFilter.restore())
    .pipe(gulp.dest(config.publicAssets))
    .pipe(rev.manifest('public/assets/rev-manifest.json', {merge: true}))
    .pipe(gulp.dest(''));
});
