var _            = require('lodash');
var config       = require('../config');
var filter       = require('gulp-filter');
var gulp         = require('gulp');
var merge        = require('merge-stream');
var minify       = require('gulp-minify-css');
var rename       = require("gulp-rename");
var rev          = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var sizereport   = require('gulp-sizereport');
var uglify       = require('gulp-uglify');
var repeatString = require('../lib/repeatString');
var fs           = require('fs');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', ['build'], function(){
  // See comment below about eot,woff, and ttf
  return gulp.src(config.publicAssets + '/**/**.!(css|js|eot|woff|ttf)')
    .pipe(rev())
    .pipe(gulp.dest(config.publicAssets))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.publicAssets));
});

// 2) Font rev workaround
gulp.task('rev-font-workaround', ['rev-assets'], function() {

  // .ttf fonts have an embedded timestamp, which cause the contents
  // of the file to change ever-so-slightly. This was a problem for
  // file reving, which generates a hash based on the contents of the file.
  // This meant that even if source files had not changed, the hash would
  // change with every recompile, as well as .eot, and .woff files, which
  // are derived from a source svg font

  // The solution is to only hash svg font files, then append the
  // generated hash to the ttf, eot, and woff files (instead of
  // leting each file generate its own hash)

  var manifest = require('../../' + config.publicAssets + '/rev-manifest.json');
  var fontList = [];

  _.each(manifest, function(reference, key) {
    var fontPath = config.iconFont.dest.split(config.publicAssets)[1].substr(1);

    if (key.match(fontPath + '/' + config.iconFont.options.fontName)) {
      var path = key.split('.svg')[0];
      var hash = reference.split(path)[1].split('.svg')[0];

      fontList.push({
        path: path,
        hash: hash
      });
    }
  });

  // Add hash to non-svg font files
  var streams = fontList.map(function(file) {
    // Add references in manifest
    ['.eot', '.woff', '.ttf'].forEach(function(ext){
      manifest[file.path + ext] = file.path + file.hash + ext;
    });

    return gulp.src(config.publicAssets + '/' + file.path + '*.!(svg)')
      .pipe(rename({suffix: file.hash}))
      .pipe(gulp.dest(config.iconFont.dest));
  });

  // Re-write rev-manifest.json to disk
  fs.writeFile(config.publicAssets + '/rev-manifest.json', JSON.stringify(manifest, null, 2));

  return merge.apply(this, streams);
});

// 3) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', ['rev-font-workaround'], function(){
  return gulp.src([config.publicDirectory + '/assets/rev-manifest.json', config.publicDirectory + '/**/*.{css,js}'])
    .pipe(revCollector())
    .pipe(gulp.dest(config.publicDirectory));
});

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

// 5) Update asset references in HTML
gulp.task('update-html', ['rev-css-js-compress'], function(){
  return gulp.src([config.publicDirectory + '/assets/rev-manifest.json', config.publicDirectory + '/**/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest(config.publicDirectory));
});

// 6) Report sizes
gulp.task('production', ['update-html'], function() {
  var hashedFiles = '/**/*-' + repeatString('[a-z,0-9]', 8)  + '.*';

  return gulp.src(config.publicAssets + hashedFiles)
    .pipe(sizereport({
        gzip: true
    }));
});
