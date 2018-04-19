const Immutable = require('immutable')
const { createSnake, createArea } = require('./data')

const testState = Immutable.Map({
  area: createArea(20, 20),
  snakes: Immutable.List([
    createSnake(1, '#f36890', 'north', [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }]),
    createSnake(4, '#45e124', 'west', [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }])
  ])
})

module.exports = testState
