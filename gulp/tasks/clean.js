var gulp = require('gulp');
var del = require('del');
var config     = require('../config').clean;

gulp.task('clean:dist', function(cb) {
  del([config.dist], cb);
});
