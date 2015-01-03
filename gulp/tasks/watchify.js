var gulp           = require('gulp');
var browserifyTask = require('./browserify')

gulp.task('watchify', function(callback) {
  // Start browserify task with devMode === true
  browserifyTask(callback, true);
});
