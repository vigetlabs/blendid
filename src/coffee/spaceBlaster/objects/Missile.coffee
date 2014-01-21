DisplayObject = require '../blastEngine/objects/DisplayObject'
Graphic       = require '../blastEngine/objects/Graphic'

class Missile extends DisplayObject
	initialize: (@ctx, ship) ->
		properties =
			image: new Graphic(@ctx, "images/missile.png")
			width: 26
			height: 46
			speed: 900
			vy: 0
			y: ship.y
			x: ship.x + ship.width / 2 - 26 / 2

		@set properties
		@ship = ship
		Game.scene.missiles.push this

	drawType: ->
		if Game.debug

			# Show hit-area
			Game.ctx.fillStyle = "red"
			Game.ctx.fillRect 0, 0, @width, @height
			Game.ctx.fill()
		@image.draw()

	explode: ->


	# this.vy = 0;
	# this.reload();
	fire: ->
		@x = @ship.x + @ship.width / 2 - @width / 2
		@y = @ship.y
		@vy = @speed
		@isLive = true
		@ship.missiles.shift()

	move: (direction) ->
		@y -= @vy * Game.frames.delta
		@reload()  if @y < (0 - @height)

	reload: ->

		#fix this duplication
		@x = -@height
		@y = @ship.y - @height
		@isLive = false
		@ship.missiles.push this
)