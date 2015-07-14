var config = require('./')

module.exports = {
  watch: config.sourceDirectory + '/html/**/*.html',
  src: [config.sourceDirectory + '/html/**/*.html', '!**/{layouts,shared,macros}/**'],
  dest: config.publicDirectory,
  nunjucks: [config.sourceDirectory + '/html/'],
  htmlmin: {
    collapseWhitespace: true
  }
}
