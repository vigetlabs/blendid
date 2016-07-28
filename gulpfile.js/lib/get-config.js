var path = require('path')

module.exports = function getConfig() {
  // Use provided object
  if (process.env.GULP_CONFIG) {
    return process.env.GULP_CONFIG
  }

  // Load from path
  if (process.env.GULP_CONFIG_PATH) {
    return require(path.resolve(process.env.PWD, process.env.GULP_CONFIG_PATH))
  }

  try {
    // Default Path
    return require(path.resolve(process.env.PWD, 'build_tools/config.json'))

  } catch(e) {
    // Default
    return require('../config')
  }
}
