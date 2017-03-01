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
      browsers: ["last 3 versions"]
    },
    sass: {
      includePaths: [
        "./node_modules"
      ]
    },
    extensions: ["sass", "scss", "css"]
  },

  html: {
    dataFile: "data/global.json",
    htmlmin: {
      collapseWhitespace: true
    },
    extensions: ["html", "njk", "json"],
    excludeFolders: ["layouts", "shared", "macros", "data"]
  },

  images: {
    extensions: ["jpg", "png", "svg", "gif"]
  },

  fonts: {
    extensions: ["woff2", "woff", "eot", "ttf", "svg"]
  },

  static: true,

  svgSprite: true,

  production: {
    rev: true
  },

  watch: {
    gulpWatch: {
      usePolling: false
    }
  }
}

