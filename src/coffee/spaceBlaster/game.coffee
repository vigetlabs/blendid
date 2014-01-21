Ship = require('./objects/Ship')
controller = require('./controller')
frames = controller.frames
stage = controller.stage
inputs = controller.inputs

class Game
	constructor: ->
		ship = new Ship
			ctx: stage.ctx
			frames: frames

		frames.update = ->
			stage.clear()
			ship.draw()

		inputs.on
			spacebar: ship.fire
			left: ship.moveLeft
			right: ship.moveRight

		frames.play()

module.exports = Game