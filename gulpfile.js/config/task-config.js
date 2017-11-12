module.exports = {

  // clean: {
  //   patterns: [
  //     path.resolve(process.env.PWD, 'dist/assets'),
  //     path.resolve(process.env.PWD, 'dist/templates')
  //   ]
  // },

  html: true,

  images: {
    extensions: ["jpg", "png", "svg", "gif"],

    // "imagemin": {
    //   "sourceImages": "source/img/*",
    //   "optimizedImages": "public/assets/img",
    //   "sassWatch": "source/img/**.*"
    // },
  },

  fonts: {
    extensions: ["woff2", "woff", "eot", "ttf", "svg"]
  },

  // static: true,
  // svgSprite: true,
  styles: {
    "browserSupport" :        ["last 2 versions"],
    "minifyCssOptions":       {"compatibility": "ie8"},
    "sourceFile":             "source/scss/app.scss",
    "librariesSource":  [
      "source/bower_components/foundation/scss"
    ],
    "destinationDirectory":   "public/assets/css/",
    "destinationFile":        "app.min.css",
    "watchFiles":             "source/scss/**/*.scss",
    "watchTasks":             ["css"],
    "sourcemapDest":          ".",
    "sourcemapSourceRoot":      "source/scss/",

    "csscomb": {
      "combSource": "source/scss/*",
      "combDestination": "source/scss/",
      "combConfigFile": "./gulpfile.js/config/csscomb.json"
    }
  },

  scripts: {
    "jsSourceFiles":          "source/js/*.js",
    "jsDest":                 "public/assets/js/",
    "concatJs":               "app.js",
    "productionJs":           "app.min.js",
    "jsLibraries":            "utilities.js",
    "jsLibrariesMinified":    "utilities.min.js",
    "jsLibrarySourceFiles":   [],
    "sourcemapDest":          ".",
    "sourcemapSourceRoot":      "source/js/",
    "watchFiles":             "",
    "watchTasks":             ["js"]
  },

  // "rev": {
  //   "manifest": {
  //     "destination":          "public",
  //     "filename":             "manifest.json"
  //   }
  // },

  production: {
    rev: true
  },

  additionalTasks: {
    initialize(gulp, PATH_CONFIG, TASK_CONFIG) {
      // gulp.task('myTask', function() { })
    },
    development: {
      prebuild: null,
      postbuild: null
    },
    production: {
      prebuild: null,
      postbuild: null
    }
  },

  environments: {
    all: {
      defaultTasks: ["css", "js"]
    },
    production: {
      productionTasks: ["imagemin", "csscomb"]
    }
  },
};