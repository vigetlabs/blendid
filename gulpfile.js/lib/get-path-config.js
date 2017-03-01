var path = require('path')
var fs = require('fs')

function getPathConfig() {
  // Use if already defined
  if(global.PATH_CONFIG) {
    return global.PATH_CONFIG
  }

  // Use provided object
  if (process.env.PATH_CONFIG) {
    return process.env.PATH_CONFIG
  }

  // Load from path
  if (process.env.PATH_CONFIG_PATH) {
    return require(path.resolve(process.env.PWD, process.env.PATH_CONFIG_PATH))
  }

  var configPath = path.resolve(process.env.PWD, 'config/path-config.json')

  if (fs.existsSync(configPath)) {
    return require(configPath)
  }

  return require('../path-config.json')
}

module.exports = getPathConfig()
