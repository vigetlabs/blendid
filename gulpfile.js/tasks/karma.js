var gulp = require('gulp');
var karma = require('karma');

var karmaTask = function(done) {
  karma.server.start({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, function(exitStatus) {
    done(exitStatus ? "There are failing unit tests" : undefined);
  });
};

gulp.task('karma', karmaTask);

module.exports = karmaTask;
