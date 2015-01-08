var dest = "./build";
var src = './app';
var test = './test';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  js:{
    src: src + "/scripts/**/*.js",
    test: test + "/**/*.js",
    dest: dest + "/js"
  },
  sass: {
    src: src + "/sass/*.{sass,scss}",
    dest: dest + "/css",
    settings: {
      // Required if you want to use SASS syntax
      // See https://github.com/dlmanning/gulp-sass/issues/81
      sourceComments: 'map',
      imagePath: '/images' // Used by the image-url helper
    }
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  markup: {
    src: src + "/*.html",
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/scripts/global.coffee',
      dest: dest + '/js',
      outputName: 'global.js',
      // Additional file extentions to make optional
      extensions: ['.coffee', '.hbs'],
      // list of modules to make require-able externally
      require: ['jquery', 'underscore']
    }, {
      entries: src + '/scripts/page.js',
      dest: dest + '/js',
      outputName: 'page.js',
      // list of externally available modules to exclude from the bundle
      external: ['jquery', 'underscore']
    }]
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};
