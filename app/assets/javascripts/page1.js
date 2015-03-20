let exclamify = require('./exclamify')

console.log(exclamify('page1.js loaded'))

let button = document.getElementById('button');

let alertAsyncMessage = function() {
  // CommonJS async syntax webpack magic
  require.ensure([], function() {
    const message = require("./asyncMessage")
    alert(exclamify(message))
  })
}

button.addEventListener('click', alertAsyncMessage)
