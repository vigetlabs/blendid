const path        = require('path')
const projectPath = require('./projectPath')
const fs          = require('fs')

module.exports = function(jsDest, dest, filename) {
  filename = filename || 'rev-manifest.json'

  return function() {
    this.plugin("done", function(statsObject) {
      const stats    = statsObject.toJson()
      const chunks   = stats.assetsByChunkName
      const manifest = {}

      for (let key in chunks) {
        const originalFilename = key + '.js'
        // https://github.com/vigetlabs/blendid/issues/232#issuecomment-171963233
        const chunkName = typeof chunks[key] === 'string' ? chunks[key] : chunks[key][0]
        manifest[path.join(jsDest, originalFilename)] = path.join(jsDest, chunkName)
      }

      fs.writeFileSync(
        projectPath(dest, filename),
        JSON.stringify(manifest)
      )
    })
  }
}
