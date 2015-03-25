let exclaimify = require('./exclaimify')

console.log(exclaimify('page1.js loaded'))

let button = document.getElementById('button');

let alertAsyncMessage = function() {
  // CommonJS async syntax webpack magic
  require.ensure([], function() {
    const message = require("./asyncMessage")
    alert(exclaimify(message))
  })
}

console.log(`
  asset references like this one:
    assets/images/gulp.png
  get updated in js too!`)

button.addEventListener('click', alertAsyncMessage)
