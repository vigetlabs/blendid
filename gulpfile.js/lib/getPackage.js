var path = require('path')
var fs = require('fs')

module.exports = function () {
  var asSubmodule = fs.existsSync(path.resolve('../../../../node_modules/gulp-starter'));
  return require(asSubmodule?"../../../../package":"../../package")
}
