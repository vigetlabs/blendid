var pathJs = require("path")

module.exports = function(path) {
  var dest = PATH_CONFIG.dev;
  if (global.environment === 'production') {
    dest = PATH_CONFIG.dest;
  }
  if (global.environment === 'distribution') {
    dest = PATH_CONFIG.dist;
  }
  return (path ? pathJs.resolve(process.env.PWD, dest, path) : dest )
}
