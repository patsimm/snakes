const types = require('./types')

module.exports = {
  tick: () => ({ type: types.TICK }),
  move: () => ({ type: types.MOVE }),
  changeDirection: (snakeId, direction) => ({
    type: types.CHANGE_DIRECTION,
    payload: { snakeId, direction }
  }),
  spawnSnake: (snakeId, color) => ({ type: types.SPAWN_SNAKE, payload: { snakeId, color } }),
  removeSnake: snakeId => ({ type: types.REMOVE_SNAKE, payload: { snakeId } })
}
