dest = "./build"
src = "./src"
module.exports =
  browserSync:
    server:
      # We're serving the src folder as well
      # for sass sourcemap linking
      baseDir: [
        dest
        src
      ]
    files: [
      "#{dest}/**"
      # Exclude Map files
      "!#{dest}/**.map"
    ]
    browser: 'google chrome canary'

  styles:
    src: "#{src}/assets/styles/*.styl"
    dest: "#{dest}/assets/styles"

  images:
    src: "#{src}/assets/images/**"
    dest: "#{dest}/assets/images"

  templates:
    src: "#{src}/templates/**/*.jade"
    dest: dest

  staticFiles:
    src: "#{src}/static/**"
    dest: dest

  clean: dest

  browserify:
    # Enable source maps
    debug: true
    # Additional file extentions to make optional
    extensions: [
      ".coffee"
      ".hbs"
    ]
    # A separate bundle will be generated for each
    # bundle config in the list below
    bundleConfigs: [
      {
        entries: "#{src}/assets/scripts/app.coffee"
        dest: "#{dest}/assets/scripts"
        outputName: "app.js"
      }
      {
        entries: "#{src}/assets/scripts/vendor.coffee"
        dest: "#{dest}/assets/scripts"
        outputName: "vendor.js"
      }
      {
        entries: "#{src}/assets/scripts/head.coffee"
        dest: "#{dest}/assets/scripts"
        outputName: "head.js"
      }
    ]
