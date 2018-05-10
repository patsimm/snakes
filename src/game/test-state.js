const Immutable = require('immutable')
const { createCoordinate, createSnake, createArea, directions } = require('./data')

const testState = Immutable.Map({
  area: createArea(20, 20),
  snakes: Immutable.List([
    createSnake(1, '#f36890', directions.NORTH, [
      createCoordinate(5, 5),
      createCoordinate(6, 5),
      createCoordinate(7, 5)
    ]),
    createSnake(4, '#45e124', directions.EAST, [
      createCoordinate(4, 4),
      createCoordinate(4, 5),
      createCoordinate(4, 6)
    ])
  ])
})

module.exports = testState
