const EventEmitter = require('events').EventEmitter
const Rx = require('rxjs')

const eventing = stateSubject => {
  const eventSubject = new Rx.Subject()
  const eventListenerSubject = new Rx.Subject()
  const accumulatedListeners = eventListenerSubject
    .scan((all, current) => {
      all.push(current)
      return all
    }, [])
    .publish()

  const tickSubject = new Rx.Subject()
  const tickedEvents = eventSubject
    .buffer(tickSubject)
    .withLatestFrom(accumulatedListeners, (events, listeners) => ({ events, listeners }))
    .publish()

  tickedEvents.connect()
  accumulatedListeners.connect()

  return {
    onEvent: (eventType, callback) => {
      eventListenerSubject.next({ type: eventType, callback })
    },

    queueEvent: event => {
      eventSubject.next(event)
    },

    flushEvents: state$ => {
      tickedEvents
        .take(1)
        .withLatestFrom(state$, (data, state) => ({ ...data, state }))
        .map(data =>
          data.events.reduce(
            (eventstate, event) =>
              data.listeners
                .filter(listener => listener.type === '*' || listener.type === event.type)
                .reduce(
                  (listenerstate, listener) => listener.callback(event, listenerstate),
                  eventstate
                ),
            data.state
          )
        )
        .subscribe(data => {
          state$.next(data)
        })

      tickSubject.next()
    }
  }
}

module.exports = { eventing }
