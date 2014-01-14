DisplayObject = require '../../blastEngine/objects/DisplayObject'
Graphic       = require '../../blastEngine/objects/Graphic'
Sound         = require '../../blastEngine/objects/Sound'

class Ship extends DisplayObject
	constructor: (properties) ->
		@extendWith properties
		@setDefaults()
		# @loadMissiles()

	setDefaults: ->
		@fireButtonReleased = true
		@image = new Graphic(@ctx, "build/images/ship.png")
		@missiles = []
		@now = 0
		@then = 0
		@rotation = 0 # radians
		@scale = 1
		@vx = 0
		@height = 160
		@width = 160
		@x = @ctx.width / 2 - @width / 2
		@y = @ctx.height - @height - 25
		@laserSound = new Sound("build/audio/laser")
		@explodeSound = new Sound("build/audio/explode")
		@thrust =
			left: 0
			right: 0
		# User defineable settings
		@speed = @speed or 300
		@maxMissiles = @maxMissiles or 3
		@repeatRate = @repeatRate or 30

	moveLeft: (state) =>
		if state is 'down'
			@thrust.left = @speed * @frames.delta
			@vx -= @thrust.left
		else if state is 'up'
			@vx += @thrust.left

	moveRight: (state) =>
		if state is 'down'
			@thrust.right = @speed * @frames.delta
			@vx += @thrust.right
		else if state is 'up'
			@vx -= @thrust.right

	loadMissiles: ->
		# i = 0
		# while i < @maxMissiles
		# 	@missiles.push new SpaceBlaster.Missile(this)
		# 	i++

	fire: (state) =>
		console.log state
		if state is 'down'
			console.log 'fire!'
			@laserSound.play()

		# @fireButtonReleased = true
		# @now = @frames.now
		# fireDelta = (@now - @then) / 1000
		# missilesLoaded = @missiles.length > 0
		# gunIsCool = fireDelta > 1 / @repeatRate
		# readyToFire = gunIsCool and missilesLoaded and @fireButtonReleased
		# if readyToFire
		# 	@laserSound.play()
		# 	@fireButtonReleased = false
		# 	@missiles[0].fire()
		# 	@then = @now

	drawType: ->
		@image.draw()

	die: ->
		@explodeSound.play()

module.exports = Ship