const path         = require('path')
const fs           = require('fs')
const taskDefaults = require('./task-defaults')

function getTaskConfig () {
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

  const configPath = path.resolve(process.env.PWD, 'config/task-config.js')

  if (fs.existsSync(configPath)) {
    return require(configPath)
  }

  return require('../task-config')
}

function withDefaults (taskConfig) {

  Object.keys(taskConfig).reduce((config, key) => {
    if(taskDefaults[key]) {
      config[key] = Object.assign(taskDefaults[key], config[key])
    }
    return config
  }, taskConfig)

  return taskConfig
}

const taskConfig = withDefaults(getTaskConfig())
console.log(taskConfig)
module.exports = taskConfig
