var config       = require('../config');
var gulp         = require('gulp');
var rev          = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var minify       = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var filter       = require('gulp-filter');
var sizereport   = require('gulp-sizereport');

// 1) Add md5 hashes to assets referenced in CSS and JS files
gulp.task('rev-assets', ['build'], function(){
  return gulp.src(config.publicAssets + '/**/**.!(css|js)')
    .pipe(rev())
    .pipe(gulp.dest(config.publicAssets))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.publicAssets));
});

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', ['rev-assets'], function(){
  return gulp.src([config.publicDirectory + '/assets/rev-manifest.json', config.publicDirectory + '/**/*.{css,js}'])
    .pipe(revCollector())
    .pipe(gulp.dest(config.publicDirectory));
});

// 3) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css-js', ['rev-update-references'], function(){
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

// 4) Update asset references in HTML
gulp.task('update-html', ['rev-css-js'], function(){
  return gulp.src([config.publicDirectory + '/assets/rev-manifest.json', config.publicDirectory + '/**/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest(config.publicDirectory));
});

// 5) Report sizes
gulp.task('production', ['update-html'], function() {
  return gulp.src(config.publicAssets + '/**/**.{css,js}')
    .pipe(sizereport({
        gzip: true
    }));
});
