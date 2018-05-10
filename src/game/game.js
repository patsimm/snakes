const { startEventing } = require('./eventing')
const { eventCreators } = require('./events')
const { controlGame } = require('./controller')
const state = require('./state')
const actions = require('./actions/actions')
const Rx = require('rxjs')

const createGame = (stateCallback, initalState = state.initialState) => {
  const eventing = startEventing()

  const game = {
    fire: event => {
      eventing.queueEvent(event)
    },

    listen: (eventType, callback) => {
      eventing.onEvent(eventType, callback)
    }
  }

  controlGame(game)

  const state$ = new Rx.BehaviorSubject(initalState)

  const ticker$ = Rx.Observable.interval(500).do(_ => {
    eventing.queueEvent(eventCreators.tick())
    eventing.flushEvents(state$)
  })

  state$.subscribe(state => {
    stateCallback(state)
  })

  ticker$.publish().connect()

  return game
}

module.exports = createGame
