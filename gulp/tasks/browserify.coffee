# browserify task
#   ---------------
#   Bundle javascripty things with browserify!
#
#   If the watch task is running, this uses watchify instead
#   of browserify for faster bundling using caching.
#
browserify = require('browserify')
watchify = require('watchify')
bundleLogger = require('../util/bundleLogger')
gulp = require('gulp')
handleErrors = require('../util/handleErrors')
source = require('vinyl-source-stream')

gulp.task 'browserify', ->

  bundleMethod = (if global.isWatching then watchify else browserify)
  bundler = bundleMethod
    # Specify the entry point of your app
    entries: ['./src/javascript/app.coffee']
  # Add file extentions to make optional in your requires
    extensions: [ '.coffee','.hbs']
  # Enable source maps!
    debug: true

  bundle = ->

    # Log when bundling starts
    bundleLogger.start()

    # Report compile errors

    # Use vinyl-source-stream to make the
    # stream gulp compatible. Specifiy the
    # desired output filename here.

    # Specify the output destination

    # Log when bundling completes!
    bundler.bundle().on('error', handleErrors).pipe(source('app.js')).pipe(gulp.dest('./build/')).on 'end', bundleLogger.end


  # Rebundle with watchify on changes.
  bundler.on 'update', bundle  if global.isWatching
  bundle()
