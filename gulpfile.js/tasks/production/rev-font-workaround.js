// 2) Font rev workaround
var _            = require('lodash');
var config       = require('../../config');
var fs           = require('fs');
var gulp         = require('gulp');
var merge        = require('merge-stream');
var rename       = require("gulp-rename");
var rev          = require('gulp-rev');

// .ttf fonts have an embedded timestamp, which cause the contents
// of the file to change ever-so-slightly. This was a problem for
// file reving, which generates a hash based on the contents of the file.
// This meant that even if source files had not changed, the hash would
// change with every recompile, as well as .eot, and .woff files, which
// are derived from a source svg font

// The solution is to only hash svg font files, then append the
// generated hash to the ttf, eot, and woff files (instead of
// leting each file generate its own hash)

gulp.task('rev-font-workaround', ['rev-assets'], function() {
  var manifest = require('../../.' + config.publicAssets + '/rev-manifest.json');
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
