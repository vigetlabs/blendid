var config = require('./')

module.exports = {
  src: config.sourceDirectory + '/fonts/**/*',
  dest: config.publicDirectory + '/fonts'
}
