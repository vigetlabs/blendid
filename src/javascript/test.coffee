_        = require 'underscore'
Backbone = require 'backbone'
plugin   = require 'plugin'

module.exports = ->
	plugin()
	_.last([0,1,2, 'hi mom!'])
