const state = {
  getSnakeById: (s, id) => {
    return s.snakes.find(snake => snake.id === id)
  }
}

module.exports = state
