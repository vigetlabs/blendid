var path = require('path')

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

  try {
    // Default Path
    return require(path.resolve(process.env.PWD, 'config/path-config.json'))

  } catch(e) {
    // Default
    return require('../path-config.json')
  }
}

module.exports = getPathConfig()
