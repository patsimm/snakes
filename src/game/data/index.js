const { createSnake } = require('./snake.data')
const { createCoordinate } = require('./coordinate.data')
const { createArea } = require('./area.data')
const directions = require('./directions')

module.exports = {
  createArea,
  createCoordinate,
  createSnake,
  directions
}
