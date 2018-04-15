const events = require('./events')
const queue = require('./queue')

describe('events', () => {
  let onSpy
  describe('onEvent()', () => {
    beforeEach(() => {
      onSpy = spyOn(events._emitter, 'on')
    })

    it('should call _emitter.on()', () => {
      events.onEvent('snakeDirectionChange', () => {})
      expect(onSpy).toHaveBeenCalled()
    })

    it('should call _emitter.on() with type as first parameter', () => {
      events.onEvent('snakeDirectionChange', () => {})
      expect(onSpy.calls.mostRecent().args[0]).toEqual('snakeDirectionChange')
    })

    describe('emitter.on callback', () => {
      let onCallback
      let callback
      beforeEach(() => {
        callback = jest.fn()
        events.onEvent('snakeDirectionChange', callback)
        onCallback = onSpy.calls.mostRecent().args[1]
      })

      it('should call given callback', () => {
        onCallback()
        expect(callback).toHaveBeenCalled()
      })

      it('should call given callback with passed args', () => {
        const args = { args: 'inHere' }
        onCallback(args)
        expect(callback).toHaveBeenCalledWith(args)
      })
    })
  })

  describe('queueEvent()', () => {
    it('should call queue.queueEvent()', () => {
      const queueEventSpy = spyOn(queue, 'queueEvent')
      events.queueEvent()
      expect(queueEventSpy).toHaveBeenCalled()
    })

    it('should pass parameter queue.queueEvent()', () => {
      const queueEventSpy = spyOn(queue, 'queueEvent')
      events.queueEvent('param')
      expect(queueEventSpy).toHaveBeenCalledWith('param')
    })
  })

  describe('flushEvents()', () => {
    it('should call queue.flushEvents()', () => {
      const flushEventsSpy = spyOn(queue, 'flushEvents')
      events.flushEvents()
      expect(flushEventsSpy).toHaveBeenCalled()
    })

    it('should pass _emitter.emit into queue.flushEvents()', () => {
      const flushEventsSpy = spyOn(queue, 'flushEvents')
      events.flushEvents()
      expect(flushEventsSpy).toHaveBeenCalledWith(events._emitter.emit)
    })
  })
})
