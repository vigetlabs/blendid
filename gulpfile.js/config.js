var publicDirectory = "./public";
var publicAssets    = publicDirectory + "/assets";
var sourceDirectory = "./app";
var sourceAssets    = sourceDirectory + "/assets";
var webpack         = require('webpack');

module.exports = {
  publicDirectory: publicDirectory,
  sourceAssets: sourceAssets,
  publicAssets: publicAssets,

  webpack: {
    entry: {
        global: sourceAssets + '/javascripts/global.js',
        page: sourceAssets + '/javascripts/page.js'
    },
    output: {
        path: publicAssets + '/javascripts',
        filename: "[name].js",
        publicPath: "assets/javascripts/"
    },
    minChunks: 2,
    async: true,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: "shared",
          filename: "shared.js",
          minChunks: 2,
          chunks: ["global", "page"]
        })
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader?experimental',
          exclude: /node_modules/
        }
      ]
    }
  },

  browserSync: {
    server: {
      baseDir: publicDirectory
    },
    files: ['pubilc/**/*.html']
  },

  deploy: {
    url: 'http://greypants.github.io/gulp-starter/',
    src: publicDirectory + '/**/*'
  },

  iconFont: {
    name: 'Gulp Starter Icons',
    src: sourceAssets + '/icons/*.svg',
    dest: publicAssets + '/fonts',
    sassDest: sourceAssets + '/stylesheets/generated',
    template: './gulpfile.js/tasks/iconFont/template.sass',
    sassOutputName: '_icons.sass',
    fontPath: '../fonts',
    className: 'icon',
    options: {
      fontName: 'icons',
      appendCodepoints: true,
      normalize: false
    }
  },

  html: {
    watch: sourceDirectory + '/views/**/*.html',
    src: [sourceDirectory + '/views/**/*.html', '!**/{layouts,shared}/**'],
    dest: publicDirectory,
    swig: {
      defaults: { cache: false }
    }
  },

  images: {
    src: sourceAssets + "/images/**",
    dest: publicAssets + "/images"
  },

  karma: {
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      'app/assets/javascripts/**/__tests__/*'
    ],
    preprocessors: {
      'app/assets/javascripts/**/__tests__/*': ['webpack']
    },
    singleRun: process.env.TRAVIS_CI === 'true',
    reporters: ['nyan'],
    browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')],
    plugins: [
      require("karma-webpack")
    ]
  },

  server: {
    root: process.cwd() + publicDirectory.substr(1),
    port: process.env.PORT || 5000,
    logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
    staticOptions: {
      extensions: ['html'],
      maxAge: '31556926'
    }
  },

  sass: {
    autoprefixer: { browsers: ['last 2 version'] },
    src: sourceAssets + "/stylesheets/**/*.{sass,scss}",
    dest: publicAssets + '/stylesheets',
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      imagePath: 'assets/images' // Used by the image-url helper
    }
  }
};
