const gameEvents = require('./events')

const game = {
  loop: function() {
    game.tick()
    setTimeout(game.loop, 1000)
  },

  tick: function() {
    gameEvents.flushEvents()
  }
}

module.exports = game
