Controller = require('./blastEngine/objects/Controller')

module.exports = new Controller
	stage:
		height: 675
		width: 1200
		id: 'canvas-wrapper'

	inputs:
		32: { name: 'spacebar' }
		37: { name: 'left' }
		39: { name: 'right' }
