const path = require('path')
const fs = require('fs')

function getPathConfig() {

  const defaultConfigPath = path.resolve(process.env.PWD, 'config/path-config.json')

  if (fs.existsSync(defaultConfigPath)) {
    return require(defaultConfigPath)
  }

  return require('../path-config.json')
}

module.exports = getPathConfig()
