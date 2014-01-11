Canvas = require './canvas'

class BlastEngine
	constructor: ->
		console.log 'blast engine loaded'
		@canvas = new Canvas 300, 300
		@canvas.ctx.fillText('I am blast engine', 0, 0)

	test: ->
		console.log 'test'

module.exports = BlastEngine