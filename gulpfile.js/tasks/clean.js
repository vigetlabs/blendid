var gulp   = require('gulp');
var del    = require('del');
var config = require('../config');
var path   = require('path');

var cleanTask = function (cb) {
  del([
  	config.root.dest, path.join(config.root.src, 
  	config.tasks.rasterSprites.sassSrcOutput, "/*.sass") /* delete generated sprite sass files */
  ]).then(function (paths) {
    cb();
  });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
