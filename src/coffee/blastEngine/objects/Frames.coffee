class Frames
	constructor: ->
		@delta = 0
		window.addEventListener "blur", @pause, false
		window.addEventListener "focus", @play, false

	update: -> # Overwrite with game file

	loop: =>
		@setDelta()
		@update()
		@animationFrame = window.requestAnimationFrame @loop

	pause: =>
		window.cancelAnimationFrame @animationFrame
		@isPlaying = false

	play: =>
		unless @isPlaying
			@isPlaying = true
			@then = Date.now()
			@loop()

	setDelta: ->
		@now = Date.now()
		@delta = (@now - @then) / 1000 # seconds since last frame
		@then = @now

module.exports = Frames