var config = require('./')
var os = require('os')
var project = require('../../package.json')

module.exports = {
  url: 'http://greypants.github.io/gulp-starter/',
  src: config.publicDirectory + '/**/*',
  ghPages: {
    // https://github.com/shinnn/gulp-gh-pages/issues/63
    cacheDir: os.tmpdir() + project.name
  }
}
