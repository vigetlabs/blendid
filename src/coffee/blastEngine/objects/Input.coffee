class Input
	constructor: (@keys) ->
		@pressed = {}
		window.addEventListener "keyup", @keyInteraction
		window.addEventListener "keydown", @keyInteraction

	keyInteraction: (event) =>
		code = event.keyCode
		if @keys[code]
			event.preventDefault()
			@pressed[@keys[code]] = event.type is "keydown"

module.exports = Input