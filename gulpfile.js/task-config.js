module.exports = {
  browserSync: {
    server: {
      baseDir: "public"
    }
  },

  javascripts: {
    entries: {
      app: ["./app.js"]
    }
  },

  stylesheets: {
    autoprefixer: {
      browsers: ["last 3 versions"]
    },
    sass: {
      includePaths: [
        "./node_modules"
      ]
    }
  },

  html: {
    dataFile: "data/global.json",
    htmlmin: {
      collapseWhitespace: true
    },
    excludeFolders: ["layouts", "shared", "macros", "data"]
  },

  images: true,
  fonts: true,
  static: true,

  svgSprite: true,

  production: {
    rev: true
  },

  watch: {
    gulpWatch: {
      usePolling: false
    }
  },

  deploy: {
    ghPages: {
      branch: "gh-pages"
    }
  }
}

