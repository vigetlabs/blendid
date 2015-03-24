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

button.addEventListener('click', alertAsyncMessage)
