# Browserify entry point for the global.js bundle
View =  require './view'
view = new View(el: '#content')
console.log 'app.js loaded!'
