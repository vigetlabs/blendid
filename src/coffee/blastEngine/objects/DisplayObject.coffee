class DisplayObject
	color: "blue"
	height: 100
	rotation: 0
	scale: 1
	width: 100
	x: 0
	y: 0
	vx: 0
	vy: 0

	constructor: (@ctx, properties) ->
		@set properties if properties

	extendWith: (properties) ->
		for property of properties
			this[property] = properties[property]

	draw: ->
		@ctx.save()

		# Round to whole pixel
		x = (@x += @vx) + 0.5 | 0
		y = (@y += @vy) + 0.5 | 0

		# Apply Transformations (scale and rotate from center)
		@ctx.translate x + @width / 2, y + @height / 2
		@ctx.rotate @rotation
		@ctx.scale @scale, @scale
		@ctx.translate -@width / 2, -@height / 2

		# Call extended Object Type's draw method
		@drawType and @drawType()
		@ctx.restore()

module.exports = DisplayObject