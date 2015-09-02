var config = require('./')

module.exports = {
  autoprefixer: { browsers: ['last 2 version'] },
  src: config.sourceDirectory + "/stylesheets/**/*.{sass,scss}",
  dest: config.publicDirectory + '/stylesheets',
  settings: {
    indentedSyntax: true, // Enable .sass syntax!
    imagePath: 'images' // Used by the image-url helper
  }
}
