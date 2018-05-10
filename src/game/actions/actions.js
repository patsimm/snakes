const Immutable = require('immutable')
const { getNextCoordinate, getSnakeById } = require('../state')
const data = require('../data')
const helpers = require('./actions.helpers')

const actions = {
  changeSnakeDirection: function(state, snakeId, direction) {
    const snakeIndex = state.get('snakes').findIndex(snake => snake.get('id') === snakeId)
    if (snakeIndex === -1) return state
    return state.setIn(['snakes', snakeIndex, 'direction'], direction)
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
    return state.setIn(['snakes', snakeIndex, 'parts'], parts)
  },

  moveAllSnakes: function(state) {
    return state.get('snakes')
      ? state.get('snakes').reduce((state, snake) => {
          return actions.moveSnake(state, snake.get('id'))
        }, state)
      : state
  },

  spawnSnake: function(state, snakeId, color) {
    const spawn = helpers.findSpawn(state)
    const snake = data.createSnake(snakeId, color, spawn.get('direction'), spawn.get('parts'))
    return state.set('snakes', state.get('snakes').push(snake))
  },

  removeSnake: function(state, snakeId) {
    const snakeIndex = state.get('snakes').findIndex(snake => snake.get('id') === snakeId)
    if (snakeIndex === -1) return state
    return state.set('snakes', state.get('snakes').delete(snakeIndex))
  }
}

module.exports = actions
