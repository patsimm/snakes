const { getNextCoordinate, getSnakeById } = require('../state')

const actions = {
  changeSnakeDirection: function(state, snakeId, direction) {
    const snake = getSnakeById(state, snakeId)
    if (!snake) return state
    const newState = { ...state, snakes: [...state.snakes] }
    newState.snakes[state.snakes.indexOf(snake)] = { ...snake, direction }
    return newState
  },

  moveSnake: function(state, snakeId) {
    const snake = getSnakeById(state, snakeId)
    if (!snake) return state
    const snakeIndex = state.snakes.indexOf(snake)
    const newState = { ...state, snakes: [...state.snakes] }
    newState.snakes[snakeIndex] = { ...snake, parts: [...state.snakes[snakeIndex].parts] }
    const newParts = newState.snakes[snakeIndex].parts
    newParts.pop()
    newParts.unshift(getNextCoordinate(state, newParts[0], snake.direction))
    return newState
  }
}

module.exports = actions
