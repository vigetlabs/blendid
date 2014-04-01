_          = require 'underscore'
Backbone   = require 'backbone'
Backbone.$ = require 'jquery'
plugin     = require 'plugin'

module.exports = Backbone.View.extend

	template: require './template'

	initialize: ->
		underscoreTest = _.last([0,1,2, 'hi mom!'])
		@render()

	render: ->
		@$el.html @template
			title: 'Gulp All The Things!'
			tools: [
				'Browserify'
				'Image optimization'
				'Browserify-shim'
				'CoffeeScript'
				'Compass'
				'Handlebars'
				'Non common-js jquery plugin'
				'Npm backbone'
				'Npm jquery'
				'SASS'
				'Underscore (included with Backbone)'
			]

		plugin()
