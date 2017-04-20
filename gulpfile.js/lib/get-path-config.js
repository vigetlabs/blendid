const path = require('path')
const fs = require('fs')

function getPathConfig() {

  if(process.env.BLENDID_CONFIG_PATH) {
    return require(path.resolve(process.env.PWD, process.env.BLENDID_CONFIG_PATH, 'path-config.json'))
  }

  const defaultConfigPath = path.resolve(process.env.PWD, 'config/path-config.json')

  if (fs.existsSync(defaultConfigPath)) {
    return require(defaultConfigPath)
  }

  return require('../path-config.json')
}

module.exports = getPathConfig()
