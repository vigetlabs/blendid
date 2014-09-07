dest = "./build"
src  = './src'

module.exports =
  serverport: 3000
  browserSync:
    server:
      # src is included for use with sass source maps
      baseDir: [dest, src]
    files: [
      # Watch everything in build
      "#{dest}/**",
      # Exclude sourcemap files
      "!#{dest}/**.map"
    ]

  sass:
    src : "#{src}/sass/*.{sass, scss}"
    dest: dest

  scripts:
    src : "#{src}/javascript/**/*.js"
    dest: dest

  images:
    src : "#{src}/images/**"
    dest: "#{dest}/images"

  dist:
    root: dest

  htdocs:
    src: "#{src}/htdocs/**"
    dest: dest

  markup:
    src: "#{src}/htdocs/**"
    dest:"#{dest}"

  browserify:
    entries: ["#{src}/javascript/app.coffee"]
    extensions: ['.coffee', '.hbs']
    bundleName: "app.js"
    dest: dest
