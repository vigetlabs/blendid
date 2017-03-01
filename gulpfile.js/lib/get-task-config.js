var path = require('path')
var fs = require('fs')

function getTaskConfig() {
  // Use if already defined
  if(global.TASK_CONFIG) {
    return global.TASK_CONFIG
  }

  // Use provided object
  if (process.env.TASK_CONFIG) {
    return process.env.TASK_CONFIG
  }

  // Load from path
  if (process.env.TASK_CONFIG_PATH) {
    return require(path.resolve(process.env.PWD, process.env.TASK_CONFIG_PATH))
  }

  var configPath = path.resolve(process.env.PWD, 'config/task-config')

  if (fs.existsSync(configPath)) {
    return require(configPath)
  }

  return require('../task-config')
}

module.exports = getTaskConfig()
