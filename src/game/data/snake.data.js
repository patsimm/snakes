const Immutable = require('immutable')

const createSnake = (id, color, direction, parts) => {
	const snake = Immutable.fromJS({id, color, direction, parts})
	return snake
}

module.exports = {
	createSnake
}