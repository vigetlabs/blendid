var config  = require('../config')
var compact = require('lodash/compact')

// Grouped by what can run in parallel
var assetTasks = ['fonts', 'iconFont', 'images', 'svgSprite']
var codeTasks = ['html', 'css', 'js']

module.exports = function(env) {

  function matchFilter(task) {
    if(config.tasks[task]) {
      if(task === 'js') {
        task = env === 'production' ? 'webpack:production' : false
      }
      return task
    }
  }

  function exists(value) {
    return !!value
  }

  return {
    assetTasks: compact(assetTasks.map(matchFilter).filter(exists)),
    codeTasks: compact(codeTasks.map(matchFilter).filter(exists))
  }
}
