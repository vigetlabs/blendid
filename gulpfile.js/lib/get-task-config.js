var path = require('path')

function getTaskConfig() {
  var config

  // Use if already defined
  if (global.TASK_CONFIG) {
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

  try {
    // Default Path
    config = require(path.resolve(process.env.PWD, 'config/task-config'))

  } catch(e) {
    // Default
    if (/Cannot find module .*\config\/task-config/.test(e.message)) {
      config = require('../task-config')
    } else {
      throw e
    }
  }

  return config
}

module.exports = getTaskConfig()
