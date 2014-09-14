_          = require 'underscore'
Backbone   = require 'backbone'
Backbone.$ = require 'jquery'
plugin     = require 'plugin'

module.exports = Backbone.View.extend

  template: require './template'

  initialize: (options) ->
    underscoreTest = _.last([0,1,2, 'hi mom!'])
    @options = options
    @render()

  render: ->
    @$el.html @template @options.data
    plugin()
