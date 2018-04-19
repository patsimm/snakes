const Immutable = require('immutable')
const testState = require('./test-state')

const state = {
  initialState: testState,

  getSnakeById: (s, id) => {
    const snakeIndex = s.get('snakes').findIndex(snake => snake.get('id') === id)
    return snakeIndex !== -1 ? s.getIn(['snakes', snakeIndex]) : undefined
  },
  getCellInformation: (s, coordinates) => {
    const snakeIndex = s
      .get('snakes')
      .findIndex(snake =>
        snake.get('parts').some(part => part.equals(Immutable.fromJS(coordinates)))
      )
    const snake = snakeIndex !== -1 ? s.getIn(['snakes', snakeIndex]).toJS() : null

    return {
      isSnake: snake ? true : false,
      snake: snake
    }
  },
  getNextCoordinate: function(s, coordinate, direction) {
    const immutableCoordinate = Immutable.fromJS(coordinate)
    const x = immutableCoordinate.get('x')
    const y = immutableCoordinate.get('y')
    const width = s.getIn(['area', 'width'])
    const height = s.getIn(['area', 'height'])

    if (x >= width || y >= height || x < 0 || y < 0) {
      return undefined
    }

    const realMod = (u, v) => (u % v + v) % v

    switch (direction) {
      case 'north':
        return { x, y: realMod(y - 1, height) }
      case 'east':
        return { x: realMod(x + 1, width), y }
      case 'south':
        return { x, y: realMod(y + 1, height) }
      case 'west':
        return { x: realMod(x - 1, width), y }
      default:
        return undefined
    }
  }
}

module.exports = state
