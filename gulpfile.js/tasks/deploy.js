var gulp    = require('gulp');
var ghPages = require('gulp-gh-pages');
var open    = require('open');
var config  = require('../config').deploy

gulp.task('deploy', ['production-build'], function() {
  return gulp.src(config.src)
    .pipe(ghPages())
    .on('end', function(){
      open(config.url);
    })
});
