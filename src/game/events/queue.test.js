const q = require('./queue')
const events = require('./events')

describe('eventQueue', () => {
  describe('queueEvent()', () => {
    it('should push a new item onto the stack', () => {
      q._stack = [{}]
      q.queueEvent({ type: 'directionChange', args: { args: 'in here' } })
      expect(q._stack).toEqual([{}, { type: 'directionChange', args: { args: 'in here' } }])
    })

    it('should replace old stack', () => {
      const startStack = [{}]
      q._stack = startStack
      q.queueEvent({ type: 'directionChange', args: { args: 'in here' } })
      expect(q._stack).not.toBe(startStack)
    })
  })

  describe('flushEvents()', () => {
    it('should empty stack', () => {
      q._stack = [{}, { type: 'directionChange', args: { args: 'in here' } }]
      q.flushEvents(() => {})
      expect(q._stack).toEqual([])
    })

    it('should emit all elements in the previous stack', () => {
      const emitSpy = jasmine.createSpy()
      const startStack = [{}, { type: 'directionChange', args: { args: 'in here' } }]
      q._stack = startStack
      const result = q.flushEvents(emitSpy)
      startStack.forEach(event => {
        expect(emitSpy).toBeCalledWith(event.type, event.args)
      })
    })
  })
})
