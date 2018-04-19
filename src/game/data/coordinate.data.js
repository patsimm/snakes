const Immutable = require('immutable')

const createCoordinate = (x, y) => {
	return Immutable.fromJS({ x, y })
}

module.exports = { createCoordinate }