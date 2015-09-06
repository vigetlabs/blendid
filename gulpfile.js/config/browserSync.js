var config = require('./')

module.exports = {
  server: {
    baseDir: config.publicDirectory
  },
  files: [config.publicDirectory + '/**/*.html']
}
