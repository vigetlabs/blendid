DisplayObject = require('./DisplayObject')

class Graphic extends DisplayObject
	constructor: (@ctx, @src, options) ->
		@extendWith(options);
		@createImage()
		@load()

	createImage: ->
		@image = new Image()
		@image.setAttribute('src', @src)

	drawType: ->
		if @ready
			@ctx.drawImage @image, 0, 0
		else
			@image.onload = =>
				@ready = true
				@draw

	load: ->
		@ready = false
		@image = new Image()
		@image.src = @src
		@image.onload = => @ready = true

module.exports = Graphic