const actions = require('./actions/actions')
const { eventCreators, eventTypes } = require('./events')

const onTick = (event, state, game) => {
  game.fire(eventCreators.move())
  return state
}

const onMove = (event, state) => {
  return actions.moveAllSnakes(state)
}

const onChangeDirection = (event, state) => {
  return actions.changeSnakeDirection(state, event.payload.snakeId, event.payload.direction)
}

const onSpawnSnake = (event, state) => {
  return actions.spawnSnake(state, event.payload.snakeId, event.payload.color)
}

const onRemoveSnake = (event, state) => {
  return actions.removeSnake(state, event.payload.snakeId)
}

module.exports = {
  controlGame: game => {
    const addListener = (eventType, listener) => {
      game.listen(eventType, (event, state) => listener(event, state, game))
    }
    addListener(eventTypes.TICK, onTick)
    addListener(eventTypes.MOVE, onMove)
    addListener(eventTypes.CHANGE_DIRECTION, onChangeDirection)
    addListener(eventTypes.SPAWN_SNAKE, onSpawnSnake)
    addListener(eventTypes.REMOVE_SNAKE, onRemoveSnake)
  }
}
