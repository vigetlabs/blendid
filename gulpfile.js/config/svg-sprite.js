var config = require('./')

module.exports = {
  src: config.sourceAssets + '/sprites/*.svg',
  dest: config.publicAssets + '/images/spritesheets',
  transform: {
    before: {
      parserOptions: { xmlMode: true }
    }
  }
}
