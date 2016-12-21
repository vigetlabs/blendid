module.exports = {
  browserSync: {
    server: {
      baseDir: "tmp"
    }
  },

  javascripts: {
    entries: {
      app: ["./app.js"]
    },
    extensions: ["js", "json"],
    extractSharedJs: false,
    hotModuleReplacement: true,
    deployUncompressed: false
  },

  stylesheets: {
    autoprefixer: {
      browsers: ["last 3 version"]
    },
    type: "sass",
    sass: {
      indentedSyntax: true,
      includePaths: [
        "./node_modules/normalize.css"
      ]
    },
    extensions: ["sass", "scss", "css"],
    excludeFolders: ["base", "generated"],
    deployUncompressed: false
  },

  html: {
    dataFile: "data/global.json",
    htmlmin: {
      collapseWhitespace: true
    },
    extensions: ["html", "json"],
    excludeFolders: ["layouts", "shared", "macros", "data"]
  },

  images: {
    extensions: ["jpg", "png", "svg", "gif"]
  },

  fonts: {
    extensions: ["woff2", "woff", "eot", "ttf", "svg"]
  },

  svgSprite: {
    extensions: ["svg"]
  },

  production: {
    rev: true
  }
}
