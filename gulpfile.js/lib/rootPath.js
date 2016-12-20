var pathJs = require("path")

module.exports = function(path) {
  path = path || '';
  return pathJs.resolve(process.env.PWD, path)
}
