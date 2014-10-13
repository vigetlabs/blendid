/**
 * Module dependencies
 */
var React = require('react')
  , ViewReact = require('./view.jsx');



var data = {
  title: 'Gulp All The Things! YEA!',
  description: 'Starter Gulp + Browserify project equipped to handle the following:',
  tools: ['Browserify-shim', 'Browserify / Watchify', 'CoffeeScript', 'Compass', 'SASS', 'Handlebars', 'Image optimization', 'LiveReload', 'Non common-js jquery plugin', 'Npm backbone', 'Npm jquery', 'Underscore (included with Backbone)']
};

React.renderComponent(ViewReact(data), document.getElementById('content'));
