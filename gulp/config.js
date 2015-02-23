var publicDirectory = "./public";
var publicAssets    = publicDirectory + "/assets";
var sourceDirectory = "./gulp";
var sourceAssets    = sourceDirectory + "/assets";

module.exports = {
  publicDirectory: publicDirectory,
  sourceAssets: sourceAssets,
  publicAssets: publicAssets,

  browserify: {
    bundleConfigs: [{
      entries: sourceAssets + '/javascripts/global.js',
      dest: publicAssets + '/javascripts',
      outputName: 'global.js',
      transform: [ 'babelify' ]
    }]
  },

  browserSync: {
    server: {
      baseDir: publicDirectory
    },
    files: ['pubilc/**/*.html']
  },

  iconFont: {
    name: 'Gulp Starter Icons',
    src: sourceAssets + '/icons/*.svg',
    dest: publicAssets + '/fonts',
    sassDest: sourceAssets + '/stylesheets/generated',
    template: './gulp/tasks/iconFont/template.sass',
    sassOutputName: '_icons.sass',
    fontPath: '/assets/fonts',
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
    frameworks: ['mocha', 'sinon-chai', 'browserify'],
    files: [
      'gulp/assets/javascripts/**/__tests__/*'
    ],
    preprocessors: {
      'gulp/assets/javascripts/**/__tests__/*': ['browserify']
    },
    browserify: {
      debug: true,
      transform: ['babelify']
    },
    reporters: ['nyan'],
    browsers: ['Chrome']
  },

  production: {
    cssSrc: publicAssets + '/**.css',
    jsSrc: publicAssets + '/**.js',
    dest: publicAssets
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
