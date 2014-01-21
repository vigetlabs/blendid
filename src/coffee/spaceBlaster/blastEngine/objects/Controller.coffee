###
Controller.coffee
-----------
Instantiates a game controller containing access to
inputs, frames, the stage, and scene methods
###

Canvas    = require './Canvas'
Inputs    = require './Inputs'
Frames    = require './Frames'

class Controller
	constructor: (options) ->
		@frames = new Frames()
		@stage =  new Canvas options.stage
		@inputs = new Inputs options.inputs


module.exports = Controller