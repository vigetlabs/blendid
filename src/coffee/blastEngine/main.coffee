Canvas = require './objects/Canvas'
Sound = require './objects/Sound'
Rectangle = require './objects/Rectangle'
Graphic = require './objects/Graphic'
Input = require './objects/Input'
Frames = require './objects/Frames'

class BlastEngine
	demo: ->
		frames = new Frames()
		input = new Input
			32: "spacebar"
			37: "left"
			39: "right"
		canvas =  new Canvas 1200, 675, 'canvas-wrapper'
		sound = new Sound('build/audio/enemy-hit')
		rectangle = new Rectangle canvas.ctx
		graphic = new Graphic canvas.ctx, 'build/images/enemy.png',
			x: 300
			speed: 500
			y: 100
			height: 81
			width: 97

		canvas.el.addEventListener 'click', ->
			sound.play()

		frames.update = =>
			canvas.clear()

			graphic.vx = 0

			if input.pressed.left
				graphic.vx = graphic.speed * frames.delta * -1;

			if input.pressed.right
				graphic.vx = graphic.speed * frames.delta;

			rectangle.x = 500 + Math.cos(Date.now()/500) * 500
			rectangle.draw()
			graphic.draw()

		frames.play()


module.exports = BlastEngine