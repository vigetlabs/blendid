React       = require 'react'
ViewCoffee  = require './view.coffee'
ViewReact   = require './view.jsx'

data =
  title: 'Gulp All The Things!'
  description: 'Starter Gulp + Browserify project equipped to handle the following:'
  tools: [
    'Browserify-shim'
    'Browserify / Watchify'
    'CoffeeScript'
    'Compass'
    'SASS'
    'Handlebars'
    'Image optimization'
    'LiveReload'
    'Non common-js jquery plugin'
    'Npm backbone'
    'Npm jquery'
    'Underscore (included with Backbone)'
  ]

# Render with react view
React.renderComponent( ViewReact(data), document.getElementById(content) );

# or backbone view
new ViewCoffee(el : '#content', data: data)

# whatever suits you best