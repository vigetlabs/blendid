var gulp    = require('gulp');
var ghPages = require('gulp-gh-pages');
var open    = require('open');
var config  = require('../config/deploy');

gulp.task('deploy', ['build:production'], function() {
  return gulp.src(config.src)
    .pipe(ghPages(config.ghPages))
    .on('end', function(){
      open(config.url);
    })
});
