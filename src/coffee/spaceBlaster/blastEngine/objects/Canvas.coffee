class Canvas
	constructor: ({ @height, @width, @id }) ->
		@create()
		@append()

	append: ->
		element = document.getElementById(@id) or document.body
		element.appendChild(@el)

	clear: (dimensions) ->
		x = 0
		y = 0
		width = @width
		height = @height

		if dimensions
			x = dimensions.x - 1
			y = dimensions.y - 1
			width = dimensions.width + 2
			height = dimensions.height + 2

		@ctx.clearRect x, y, width, height

	create: ->
		@el = document.createElement("canvas")
		@ctx = @el.getContext("2d")
		@ctx.width = @el.width = @width
		@ctx.height = @el.height = @height

module.exports = Canvas