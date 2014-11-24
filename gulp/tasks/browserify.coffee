# browserify task
#   ---------------
#   Bundle javascripty things with browserify!
#
#   This task is set up to generate multiple separate bundles, from
#   different sources, and to use Watchify when run from the default task.
#
#   See browserify.bundleConfigs in gulp/config.js
#
browserify = require("browserify")
watchify = require("watchify")
bundleLogger = require("../util/bundleLogger")
gulp = require("gulp")
handleErrors = require("../util/handleErrors")
source = require("vinyl-source-stream")
config = require("../config").browserify

gulp.task "browserify", (callback) ->
  bundleQueue = config.bundleConfigs.length
  browserifyThis = (bundleConfig) ->
    bundler = browserify(

      # Required watchify args
      cache: {}
      packageCache: {}
      fullPaths: false

      # Specify the entry point of your app
      entries: bundleConfig.entries

      # Add file extentions to make optional in your requires
      extensions: config.extensions

      # Enable source maps!
      debug: config.debug
    )
    bundle = ->

      # Log when bundling starts
      bundleLogger.start bundleConfig.outputName

      # Report compile errors

      # Use vinyl-source-stream to make the
      # stream gulp compatible. Specifiy the
      # desired output filename here.

      # Specify the output destination
      bundler.bundle()
      .on("error", handleErrors)
      .pipe(source(bundleConfig.outputName))
      .pipe(gulp.dest(bundleConfig.dest))
      .on "end", reportFinished

    if global.isWatching

      # Wrap with watchify and rebundle on changes
      bundler = watchify(bundler)

      # Rebundle on update
      bundler.on "update", bundle
    reportFinished = ->

      # Log when bundling completes
      bundleLogger.end bundleConfig.outputName
      if bundleQueue
        bundleQueue--

        # If queue is empty, tell gulp the task is complete.
        # https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
        callback()  if bundleQueue is 0
      return

    bundle()


  # Start bundling with Browserify for each bundleConfig specified
  config.bundleConfigs.forEach browserifyThis
  return
