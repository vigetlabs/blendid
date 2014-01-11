/**
 * @name Base Object
 * @desc Can be used as a base object for anything that gets rendered
         to screen.
 */

define(function() {
	return klass({
		color: 'blue',
		height: 100,
		rotation: 0,
		scale: 1,
		width: 100,
		x: 0,
		y: 0,

		initialize: function(ctx, properties) {
			this.ctx = ctx;
			if(properties) {
				this.set(properties);
			}
		},

		set: function(properties){
			for(var property in properties) {
				this[property] = properties[property];
			}
		},

		draw: function() {
			this.ctx.save();

			// Round to whole pixel
			var x = (this.x + 0.5) | 0;
			var y = (this.y + 0.5) | 0;

			// Apply Transformations (scale and rotate from center)
			this.ctx.translate(x + this.width / 2, y + this.height / 2);
			this.ctx.rotate(this.rotation);
			this.ctx.scale(this.scale, this.scale);
			this.ctx.translate(-this.width/2, -this.height/2);

			// Call extended Object Type's draw method
			this.drawType && this.drawType();

			this.ctx.restore();
		}
	});
});
