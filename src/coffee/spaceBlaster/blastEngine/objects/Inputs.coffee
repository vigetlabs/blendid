class Inputs
	constructor: (@keys) ->
		@pressed = {}
		@events = {}
		window.addEventListener "keyup", @keyup
		window.addEventListener "keydown", @keydown

	on: (events, callback) ->
		if typeof @events is 'object'
			for event of events
				@events[event] = events[event]

		else if typeof @events is 'string'
			@events[event] = callback

	trigger: (fullEvent) ->
		segments = fullEvent.split(':');
		baseEvent = segments[0]
		childEvent = segments[1]

		@events[fullEvent]?()

		if childEvent
			@events[baseEvent]?(childEvent)

	keydown: (event) =>
		code = event.keyCode
		input = @keys[code]
		if input and input.state isnt 'down'
			event.preventDefault()
			input.state = 'down'
			@trigger("#{input.name}:down")

	keyup: (event) =>
		code = event.keyCode
		input = @keys[code]
		if input
			input.state = 'up'
			@trigger("#{input.name}:up")

module.exports = Inputs