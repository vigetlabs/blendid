var config = require('./')

module.exports = {
  src: config.sourceDirectory + '/sprites/*.svg',
  dest: config.publicDirectory + '/images/spritesheets',
  transform: {
    before: {
      parserOptions: { xmlMode: true }
    }
  }
}
