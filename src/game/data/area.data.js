const Immutable = require('immutable')

const createArea = (width, height) => {
	return Immutable.fromJS({ width, height })
}

module.exports = {
	createArea
}