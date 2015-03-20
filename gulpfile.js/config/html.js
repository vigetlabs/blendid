var config = require('./')

module.exports = {
  watch: config.sourceDirectory + '/views/**/*.html',
  src: [config.sourceDirectory + '/views/**/*.html', '!**/{layouts,shared}/**'],
  dest: config.publicDirectory,
  swig: {
    defaults: { cache: false }
  }
}