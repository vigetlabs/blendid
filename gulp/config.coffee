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
      dest + "/**"
      # Exclude Map files
      "!" + dest + "/**.map"
    ]

  styles:
    src: "#{src}/assets/styles/*.styl"
    dest: dest

  images:
    src: "#{src}/assets/images/**"
    dest: dest + "/images"

  markup:
    src: "#{src}/templates/**"
    dest: dest

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
        dest: dest
        outputName: "app.js"
      }
      {
        entries: src + "#{src}/assets/scripts/head.coffee"
        dest: dest
        outputName: "head.js"
      }
    ]
