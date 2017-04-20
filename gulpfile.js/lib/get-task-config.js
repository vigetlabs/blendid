const path         = require('path')
const fs           = require('fs')
const taskDefaults = require('./task-defaults')
const mergeWith    = require('lodash/mergeWith')

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
  Object.keys(taskDefaults).reduce((config, key) => {
    if(taskConfig[key] !== false) {
      // if true, use default, else merge objects
      config[key] = taskDefaults[key] === true ?
                    taskDefaults[key] :
                    mergeWith(taskDefaults[key], config[key] || {}, replaceArrays)
    }
    return config
  }, taskConfig)

  return taskConfig
}

function replaceArrays(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return srcValue
  }
}

const taskConfig = withDefaults(getTaskConfig())

console.log(taskConfig.production)
module.exports = taskConfig
