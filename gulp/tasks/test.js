var gulp = require('gulp');
var mocha = require('gulp-mocha');
var fs = require('fs');
require('coffee-script/register');

gulp.task('test', function () {

  var mocha_opts = {};

  try {
    var opts = fs.readFileSync('test/mocha.opts', 'utf8')
      .trim()
      .split(/\s+/);

    opts.forEach(function(val, indx, arry) {
      if (/^-.+?/.test(val)) {
        val = val.replace(/^-+(.+?)/, "$1");
        mocha_opts[val] = arry[indx + 1];
      }
    });

  } catch (err) {
    // ignore
    console.log("error getting mocha options", err);
  }

  return gulp.src(['test/**/*.js', 'test/**/*.coffee'])
    .pipe(mocha(mocha_opts));
});
