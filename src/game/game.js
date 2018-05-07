const e = require('./events')
const testState = require('./test-state')
const actions = require('./actions/actions')
const Rx = require('rxjs')

const game = (initalState, stateCallback) => {
  const eventing = e.eventing()

  const state$ = new Rx.BehaviorSubject(initalState)

  Rx.Observable.interval(500)
    .do(_ => {
      eventing.queueEvent({ type: 'TICK' })
      eventing.flushEvents(state$)
    })
    .publish()
    .connect()

  eventing.onEvent('MOVE', (event, state) => {
    state.get('snakes').forEach(snake => {
      state = actions.moveSnake(state, snake.get('id'))
    })
    return state
  })

  eventing.onEvent('CHANGE_DIRECTION', (event, state) => {
    const test = actions.changeSnakeDirection(state, event.payload.snakeId, event.payload.direction)
    return test
  })

  state$.subscribe(state => {
    stateCallback(state)
    eventing.queueEvent({ type: 'MOVE' })
  })

  return {
    fire: event => {
      eventing.queueEvent(event)
    }
  }
}

module.exports = game
