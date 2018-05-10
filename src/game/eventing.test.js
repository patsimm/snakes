const { startEventing } = require('./eventing')
const Rx = require('rxjs')
const testState = require('./test-state')

describe('events', () => {
  describe('eventing()', () => {
    let eventing
    beforeEach(() => {
      eventing = startEventing()
    })

    it('should call registered callback with all queued events when flushed', done => {
      const eventType = 'test'
      const eventsToQueue = [
        { type: eventType, payload: 'test1' },
        { type: eventType, payload: 'test2' },
        { type: eventType, payload: 'test3' },
        { type: eventType, payload: 'test4' }
      ]
      const callback = jest.fn((event, state) => state)
      eventing.onEvent(eventType, callback)
      eventsToQueue.forEach(event => eventing.queueEvent(event))
      const state$ = new Rx.BehaviorSubject(testState)
      state$.take(2).subscribe({
        complete: () => {
          eventsToQueue.forEach(event => expect(callback).toHaveBeenCalledWith(event, testState))
          done()
        }
      })
      eventing.flushEvents(state$)
    })

    it('should not call callback when not flushed', () => {
      const eventType = 'test'
      const eventsToQueue = [
        { type: eventType, payload: 'test1' },
        { type: eventType, payload: 'test2' },
        { type: eventType, payload: 'test3' },
        { type: eventType, payload: 'test4' }
      ]
      const callback = jest.fn((event, state) => state)
      eventing.onEvent(eventType, callback)
      eventsToQueue.forEach(event => eventing.queueEvent(event))
      expect(callback).not.toHaveBeenCalled()
    })

    it('should call callback only with events of types registered with', done => {
      const eventType = 'test'
      const eventsToQueue = [
        { type: eventType, payload: 'test1' },
        { type: eventType, payload: 'test2' },
        { type: `${eventType}1`, payload: 'test3' },
        { type: `${eventType}1`, payload: 'test4' }
      ]
      const callback = jest.fn((event, state) => state)
      eventing.onEvent(eventType, callback)
      eventsToQueue.forEach(event => eventing.queueEvent(event))
      const state$ = new Rx.BehaviorSubject(testState)
      state$.take(2).subscribe({
        complete: () => {
          eventsToQueue
            .filter(event => event.type === eventType)
            .forEach(event => expect(callback).toHaveBeenCalledWith(event, testState))
          done()
        }
      })
      eventing.flushEvents(state$)
    })

    it('should call callback only with events of types registered with when flushed twice', done => {
      const eventType = 'test'
      const eventsToQueue1 = [
        { type: eventType, payload: 'test1' },
        { type: eventType, payload: 'test2' },
        { type: `${eventType}1`, payload: 'test3' },
        { type: `${eventType}1`, payload: 'test4' }
      ]
      const eventsToQueue2 = [
        { type: eventType, payload: 'test5' },
        { type: eventType, payload: 'test6' },
        { type: `${eventType}1`, payload: 'test7' },
        { type: `${eventType}1`, payload: 'test8' }
      ]
      const callback = jest.fn((event, state) => state)
      eventing.onEvent(eventType, callback)
      eventsToQueue1.forEach(event => eventing.queueEvent(event))
      eventsToQueue2.forEach(event => eventing.queueEvent(event))
      const state$ = new Rx.BehaviorSubject(testState)
      state$.take(3).subscribe({
        complete: () => {
          eventsToQueue1
            .filter(event => event.type === eventType)
            .forEach(event => expect(callback).toHaveBeenCalledWith(event, testState))
          eventsToQueue2
            .filter(event => event.type === eventType)
            .forEach(event => expect(callback).toHaveBeenCalledWith(event, testState))
          done()
        }
      })
      const flush1 = eventing.flushEvents(state$)
      const flush2 = eventing.flushEvents(state$)
    })

    it('should call callback with all events when registered * and flushed twice', done => {
      const eventType = '*'
      const eventsToQueue1 = [
        { type: eventType, payload: 'test1' },
        { type: eventType, payload: 'test2' },
        { type: `${eventType}1`, payload: 'test3' },
        { type: `${eventType}1`, payload: 'test4' }
      ]
      const eventsToQueue2 = [
        { type: eventType, payload: 'test5' },
        { type: eventType, payload: 'test6' },
        { type: `${eventType}1`, payload: 'test7' },
        { type: `${eventType}1`, payload: 'test8' }
      ]
      const callback = jest.fn((event, state) => state)
      eventing.onEvent(eventType, callback)
      eventsToQueue1.forEach(event => eventing.queueEvent(event))
      eventsToQueue2.forEach(event => eventing.queueEvent(event))
      const state$ = new Rx.BehaviorSubject(testState)
      state$.take(3).subscribe({
        complete: () => {
          eventsToQueue1.forEach(event => expect(callback).toHaveBeenCalledWith(event, testState))
          eventsToQueue2.forEach(event => expect(callback).toHaveBeenCalledWith(event, testState))
          done()
        }
      })
      const flush1 = eventing.flushEvents(state$)
      const flush2 = eventing.flushEvents(state$)
    })
  })
})
