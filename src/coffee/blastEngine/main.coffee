Canvas = require './objects/Canvas'
Sound = require './objects/Sound'
Rectangle = require './objects/Rectangle'
Graphic = require './objects/Graphic'
Inputs = require './objects/Inputs'
Frames = require './objects/Frames'
Ship = require '../spaceBlaster/objects/Ship'

class Engine
	audioPath: 'audio/',
	height: 675,
	imagePath: 'images/',
	width: 1200,

	constructor: (options) ->
		@reset()

	play: -> @frames.play()

	pause: -> @frames.pause()

	reset: -> # reset values

	reset: ->
		stage =  new Canvas 1200, 675, 'canvas-wrapper'
		frames = new Frames()
		input = new Inputs
			32: { name: 'spacebar' }
			37: { name: 'left' }
			39: { name: 'right' }

		ship = new Ship
			ctx: stage.ctx
			frames: frames

		frames.update = ->
			stage.clear()
			ship.draw()

		input.on
			spacebar: ship.fire
			left: ship.moveLeft
			right: ship.moveRight

		frames.play()


module.exports = Engine