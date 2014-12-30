/* bundleLogger
   ------------
   Provides gulp style logs to the bundle method in browserify.js
*/

var gutil        = require('gulp-util');
var fs           = require('fs');
var prettyHrtime = require('pretty-hrtime');
var startTime;

function getFilesize(filename, filedir) {
  var filestats = fs.statSync(filedir + '/' + filename);
  var filesize = filestats["size"];
  if (filesize > 1000000) { // Mb
    return (filesize / 1000000).toFixed(2) + 'Mb';
  }
  if (filesize > 1000) {    // Kb
    return (filesize / 1000).toFixed(2) + 'Kb';
  }
  return filesize + 'b';
}

module.exports = {
  start: function(filename) {
    startTime = process.hrtime();
    gutil.log('Bundling', gutil.colors.green(filename) + '...');
  },

  end: function(filename, filedir) {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    if (filedir) {
      var filesize = getFilesize(filename, filedir);
      gutil.log('Bundled', gutil.colors.green(filename), 'in', gutil.colors.magenta(prettyTime), 'filesize', gutil.colors.magenta(filesize));
    } else {
      gutil.log('Bundled', gutil.colors.green(filename), 'in', gutil.colors.magenta(prettyTime));
    }
  }
};
