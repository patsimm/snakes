const game = require('./game')
const gameEvents = require('./events')
const actions = require('./actions/actions')
const testState = require('./test-state')

jest.useFakeTimers()

describe('game', () => {
  describe('loop()', () => {
    it('should call setTimeout', () => {
      game.loop(() => {})
      expect(setTimeout).toHaveBeenCalled()
    })

    it('should call setTimeout with a function that calls itself', () => {
      const firstGivenCallback = () => {}
      game.loop(firstGivenCallback)
      const loopSpy = spyOn(game, 'loop')
      jest.advanceTimersByTime(1000)
      expect(loopSpy).toHaveBeenCalledWith(firstGivenCallback)
    })

    it('should call callback', () => {
      const callback = jest.fn()
      game.loop(callback)
      expect(callback).toHaveBeenCalled()
    })
  })

  describe('tick()', () => {
    it('should flush queue', () => {
      const flushSpy = spyOn(gameEvents, 'flushEvents')
      game.tick(testState)
      expect(flushSpy).toHaveBeenCalled()
    })

    it('should return defined value', () => {
      const result = game.tick(testState)
      expect(result).toBeDefined()
    })

    it('should call performMovements()', () => {
      const performMovementsSpy = spyOn(game, 'performMovements')
      game.tick(testState)
      expect(performMovementsSpy).toHaveBeenCalledWith(testState)
    })

    it('should return value returned from performMovements()', () => {
      const returnValue = { ret: 'VALUEEEUEUE' }
      const performMovementsSpy = spyOn(game, 'performMovements').and.returnValue(returnValue)
      const result = game.tick(testState)
      expect(result).toBe(returnValue)
    })
  })

  describe('startGame()', () => {
    it('should call loop()', () => {
      const loopSpy = spyOn(game, 'loop')
      game.startGame(testState)
      expect(loopSpy).toHaveBeenCalled()
    })

    describe('loop() callback', () => {
      let givenCallback
      let callback
      beforeEach(() => {
        givenCallback = jest.fn()
        const loopSpy = spyOn(game, 'loop')
        game.startGame(testState, givenCallback)
        callback = loopSpy.calls.mostRecent().args[0]
      })

      it('should call tick with state', () => {
        const tickSpy = spyOn(game, 'tick')
        callback()
        expect(tickSpy).toHaveBeenCalledWith(testState)
      })

      it('should call tick() the second time with return value of previous tick()', () => {
        const tickReturn1 = { tickReturn: 'YEEY' }
        const tickReturn2 = { tickReturn: 'YEEY1' }
        const tickSpy = spyOn(game, 'tick').and.returnValues(tickReturn1, tickReturn2)
        callback()
        callback()
        expect(tickSpy.calls.mostRecent().args[0]).toBe(tickReturn1)
        callback()
        expect(tickSpy.calls.mostRecent().args[0]).toBe(tickReturn2)
      })

      it('should call given callback', () => {
        callback()
        expect(givenCallback).toHaveBeenCalled()
      })

      it('should call given callback the second time with return value of previous tick()', () => {
        const tickReturn1 = { tickReturn: 'YEEY' }
        const tickReturn2 = { tickReturn: 'YEEY1' }
        const tickSpy = spyOn(game, 'tick').and.returnValues(tickReturn1, tickReturn2)
        callback()
        expect(givenCallback).toHaveBeenLastCalledWith(tickReturn1)
        callback()
        expect(givenCallback).toHaveBeenLastCalledWith(tickReturn2)
      })
    })
  })

  describe('performMovements()', () => {
    it('should call actions.moveSnake() for every snake in state', () => {
      const moveSnakeSpy = spyOn(actions, 'moveSnake').and.returnValue(testState)
      game.performMovements(testState)
      testState.snakes.forEach(snake => {
        expect(moveSnakeSpy).toHaveBeenCalledWith(testState, snake.id)
      })
    })

    it('should return state returned from last actions.moveSnake()-call', () => {
      const lastValue = { last: 'val' }
      const moveSnakeSpy = spyOn(actions, 'moveSnake').and.returnValues({}, lastValue)
      const result = game.performMovements(testState)
      expect(result).toBe(lastValue)
    })
  })
})
