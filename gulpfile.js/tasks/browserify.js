/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.

   See browserify.bundleConfigs in gulp/config.js
*/

var browserify   = require('browserify');
var browserSync  = require('browser-sync');
var watchify     = require('watchify');
var bundleLogger = require('../lib/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../lib/handleErrors');
var source       = require('vinyl-source-stream');
var config       = require('../config').browserify;
var _            = require('lodash');

var browserifyTask = function(callback, watch) {

  var bundleQueue = config.bundleConfigs.length;

  var browserifyThis = function(bundleConfig) {

    // Passing these options directly to Browserify has been
    // unreliable, so we'll apply them manually through the API
    var optionList = ['transform', 'plugin', 'require', 'external'];
    var options = _.pick(bundleConfig, optionList);
    var bundleConfig = _.omit(bundleConfig, optionList);

    if(watch) {
      // Add watchify args and debug (sourcemaps) option
      _.extend(bundleConfig, watchify.args, { debug: true });
    }

    var b = browserify(bundleConfig);

    // Apply additional browserify options (require, external, plugin, etc.)
    for(var key in options) b[key](options[key]);

    var bundle = function() {
      // Log when bundling starts
      bundleLogger.start(bundleConfig.outputName);

      return b
        .bundle()
        // Report compile errors
        .on('error', handleErrors)
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specify the
        // desired output filename here.
        .pipe(source(bundleConfig.outputName))
        // Specify the output destination
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', reportFinished)
        .pipe(browserSync.reload({stream:true}));
    };

    if(watch) {
      // Wrap with watchify and rebundle on changes
      b = watchify(b);
      // Rebundle on update
      b.on('update', bundle);
      bundleLogger.watch(bundleConfig.outputName);
    }

    var reportFinished = function() {
      // Log when bundling completes
      bundleLogger.end(bundleConfig.outputName);

      if(bundleQueue) {
        bundleQueue--;
        if(bundleQueue === 0) {
          // If all bundleConfigs have been bundled, tell gulp the task is complete.
          // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
          callback();
        }
      }
    };

    return bundle();
  };

  // Start bundling with Browserify for each bundleConfig listed
  config.bundleConfigs.forEach(browserifyThis);
};

gulp.task('browserify', browserifyTask);

// Exporting the task so we can call it directly in our watch task, with the 'watch' option
module.exports = browserifyTask;
