if(!TASK_CONFIG.javascripts) return

var gulp          = require('gulp')
var logger        = require('../lib/compileLogger')
var webpack       = require('webpack')

var webpackDevelopmentTask = function(callback) {

  var webpackConfig = require('../lib/webpack-multi-config')(global.environment)

  // skip saving files to filesystem if it's not wanted
  if(
      (
          typeof TASK_CONFIG.javascripts.hotModuleReplacement === "undefined"
          ||
          TASK_CONFIG.javascripts.hotModuleReplacement === true
      )
      &&
      typeof TASK_CONFIG.browserSync !== "undefined"
  ) {
    if(callback) {
      callback()
    }

    return
  }

  webpack(webpackConfig, function(err, stats) {
    if( stats.compilation.errors.length ) {
      logger(err, stats)
    }
    if(callback) {
      callback()
    }
  })
}

gulp.task('webpack:development', webpackDevelopmentTask)
module.exports = webpackDevelopmentTask
