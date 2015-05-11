var config = require('./')

module.exports = {
  src: config.sourceAssets + '/vendor/**/*',
  dest: config.publicAssets + '/vendor'
}
