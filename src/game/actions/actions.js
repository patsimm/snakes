const Immutable = require('immutable')
const { getNextCoordinate, getSnakeById } = require('../state')

const actions = {
  changeSnakeDirection: function(state, snakeId, direction) {
    const snakeIndex = state.get('snakes').findIndex(snake => snake.get('id') === snakeId)
    if (snakeIndex === -1) return state
    state = state.setIn(['snakes', snakeIndex, 'direction'], direction)
    return state
  },

  moveSnake: function(state, snakeId) {
    const snakeIndex = state.get('snakes').findIndex(snake => snake.get('id') === snakeId)
    if (snakeIndex === -1) return state
    let parts = state.getIn(['snakes', snakeIndex, 'parts'])
    parts = parts.pop()
    parts = parts.unshift(
      Immutable.fromJS(
        getNextCoordinate(state, parts.get(0), state.getIn(['snakes', snakeIndex, 'direction']))
      )
    )
    state = state.setIn(['snakes', snakeIndex, 'parts'], parts)
    return state
  }
}

module.exports = actions
