var PluginError  = require('plugin-error')
var log          = require('fancy-log')
var colors       = require('ansi-colors')
var prettifyTime = require('./prettifyTime')
var handleErrors = require('./handleErrors')

module.exports = function(err, stats) {
  if(err) throw new PluginError("webpack", err)

  var statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow'

  if(stats.compilation.errors.length > 0) {
    stats.compilation.errors.forEach(function(error){
      handleErrors(error)
      statColor = 'red'
    })
  } else {
    var compileTime = prettifyTime(stats.endTime - stats.startTime)
    log(colors[statColor](stats))
    log('Compiled with', colors.cyan('webpack'), 'in', colors.magenta(compileTime))
  }
}
