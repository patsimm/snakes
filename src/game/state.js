const testState = require('./test-state')

const state = {
  initialState: testState,

  getSnakeById: (s, id) => {
    return s.snakes.find(snake => snake.id === id)
  },
  getCellInformation: (s, coordinates) => {
    const snake = s.snakes.find(snake =>
      snake.parts.some(part => coordinates.x === part.x && coordinates.y === part.y)
    )

    return {
      isSnake: snake ? true : false,
      snake: snake
    }
  },
  getNextCoordinate: function(s, coordinate, direction) {
    const { x, y } = coordinate

    if (x >= s.area.width || y >= s.area.height || x < 0 || y < 0) {
      return undefined
    }

    const realMod = (u, v) => (u % v + v) % v

    switch (direction) {
      case 'north':
        return { x, y: realMod(y - 1, s.area.height) }
      case 'east':
        return { x: realMod(x + 1, s.area.width), y }
      case 'south':
        return { x, y: realMod(y + 1, s.area.height) }
      case 'west':
        return { x: realMod(x - 1, s.area.width), y }
      default:
        return undefined
    }
  }
}

module.exports = state
