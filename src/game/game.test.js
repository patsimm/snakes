const game = require('./game')
const gameEvents = require('./events')

jest.useFakeTimers()

describe('game', () => {
  describe('loop()', () => {
    it('should call setTimeout', () => {
      game.loop()
      expect(setTimeout).toHaveBeenCalled()
    })

    it('should call setTimeout with itself as callback and a time of 1000', () => {
      game.loop()
      expect(setTimeout).toHaveBeenCalledWith(game.loop, 1000)
    })

    it('should call tick', () => {
      const tickSpy = spyOn(game, 'tick').and.stub()
      game.loop()
      expect(tickSpy).toHaveBeenCalled()
    })
  })

  describe('tick()', () => {
    it('should flush queue', () => {
      const flushSpy = spyOn(gameEvents, 'flushEvents')
      game.tick()
      expect(flushSpy).toHaveBeenCalled()
    })
  })
})
