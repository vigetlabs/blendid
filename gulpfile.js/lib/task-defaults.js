const PATH_CONFIG = require('./get-path-config')
const os          = require('os')
const path        = require('path')
const pkg         = require(path.resolve(process.env.PWD, 'package.json'))

module.exports = {
  javascripts: {
    extensions: ["js", "json", "jsx"]
  },

  stylesheets: {
    sass: {
      includePaths: [
        "./node_modules"
      ]
    },
    extensions: ["sass", "scss", "css"]
  },

  html: {
    dataFile: "data/global.json",
    nunjucksRender: {
      path: [ path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src) ],
      envOptions: {
        watch: false
      }
    },
    htmlmin: {
      collapseWhitespace: true
    },
    excludeFolders: ["layouts", "shared", "macros", "data"],
    extensions: ["html", "njk", "json"]
  },

  images: {
    extensions: ["jpg", "png", "svg", "gif"]
  },

  fonts: {
    extensions: ["woff2", "woff", "eot", "ttf", "svg"]
  },

  ghPages: {
    branch: "gh-pages",
    cacheDir: path.join(os.tmpdir(), pkg.name)
  },

  svgSprite: {
    svgstore: {}
  },

  production: {
    rev: true
  }
}

