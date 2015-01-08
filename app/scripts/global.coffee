# Browserify entry point for the global.js bundle (yay CoffeeScript!)
Welcome =  require './views/welcome'
new Welcome(el: '#content')
console.log 'global.js loaded!'
