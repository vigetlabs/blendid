module.exports = {
  browserSync: {
    server: {
      baseDir: "public"
    }
  },

  javascripts: {
    entries: {
      app: ["./app.js"]
    },
    extensions: ["js", "json"],
    extractSharedJs: false
  },

  stylesheets: {
    autoprefixer: {
      browsers: ["last 3 version"]
    },
    sass: {
      indentedSyntax: true,
      includePaths: [
        "./node_modules/normalize.css"
      ]
    },
    extensions: ["sass", "scss", "css"]
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
