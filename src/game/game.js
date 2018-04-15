const gameEvents = require('./events')
const testState = require('./test-state')
const actions = require('./actions/actions')

const game = {
  loop: function(callback) {
    callback()
    setTimeout(() => game.loop(callback), 1000)
  },

  tick: function(state) {
    gameEvents.flushEvents()
    return game.performMovements(state)
  },

  startGame: function(state = testState, callback) {
    game.loop(() => {
      state = game.tick(state)
      callback(state)
    })
  },

  performMovements: function(state) {
    state.snakes.forEach(snake => {
      state = actions.moveSnake(state, snake.id)
    })
    return state
  }
}

module.exports = game
