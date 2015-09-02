var config = require('./')
var path = require('path')
var os = require('os')
var project = require('../../package.json')

module.exports = {
  url: project.homepage,
  src: config.publicDirectory + '/**/*',
  ghPages: {
    // https://github.com/shinnn/gulp-gh-pages/issues/63
    cacheDir: path.join(os.tmpdir(),project.name)
  }
}
