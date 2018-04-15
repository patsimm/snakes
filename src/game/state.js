const state = {
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
  }
}

module.exports = state
