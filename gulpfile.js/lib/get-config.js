module.exports = function getConfig() {
  // Use provided object
  if (process.env.GULP_CONFIG) {
    return process.env.GULP_CONFIG
  }

  // Load from path
  if (process.env.GULP_CONFIG_PATH) {
    return require(process.env.GULP_CONFIG_PATH)
  }

  // Default
  return require('../config')
}
