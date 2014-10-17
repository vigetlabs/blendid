var build = "./build";
var dist = "./dist";
var src = './src';
var node_modules = './node_modules';

module.exports = {
  browserSync: {
    // Enable HTTPS for static file server
    https: true,
    server: {
      // We're serving the src folder as well
      // for sass sourcemap linking
      baseDir: [build, src]
    },
    files: [
      build + "/**",
      // Exclude Map files
      "!" + build + "/**.map"
    ]
  },
  sass: {
    src: src + "/sass/*.{sass, scss}",
    build: build,
    dist: dist
  },
  vendor: {
    src: src + "/vendor/**/*",
    build: build + "/vendor",
    dist: dist + "/vendor",
    base: './src/vendor'
  },
  images: {
    src: src + "/images/**",
    build: build + "/images",
    dist: dist + "/images"
  },
  markup: {
    src: src + "/htdocs/**",
    build: build,
    dist: dist
  },
  video: {
    src: node_modules + '/video.js/dist/video-js/video-js.swf',
    dest: build,
    dist: dist
  },
  uglify: {
    build: build + "/*.js",
    dist: dist,
    options: {}
  },
  clean: {
    dest: build,
    dist: dist
  },
  deploy: {
    dist: dist,
    aws: require('../aws.json')
  },
  browserify: {
    // Enable source maps
    debug: true,
    // Additional file extentions to make optional
    extensions: ['.coffee', '.hbs', '.jsx'],
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: './src/javascript/app.jsx',
      dest: build,
      outputName: 'app.js'
    }, {
      entries: './src/javascript/patch.js',
      dest: build,
      outputName: 'patch.js'
    }]
  }
};
