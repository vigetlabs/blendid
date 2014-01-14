DisplayObject = require('./DisplayObject')

class Rectangle extends DisplayObject
  constructor: (ctx, properties) ->
    super ctx, properties

  drawType: ->
    @ctx.fillStyle = @color
    @ctx.fillRect 0, 0, @width, @height
    @ctx.fill()

module.exports = Rectangle