const state = require('./state')
const testState = require('./test-state')

describe('state', () => {
  describe('getSnakeById()', () => {
    it('should return undfined if id doesnt exit', () => {
      const snake = state.getSnakeById(testState, 100)
      expect(snake).toBeUndefined()
    })

    it('should return snake #1', () => {
      const snake = state.getSnakeById(testState, 1)
      expect(snake).toBe(testState.snakes[0])
    })

    it('should return snake #4', () => {
      const snake = state.getSnakeById(testState, 4)
      expect(snake).toBe(testState.snakes[1])
    })
  })

  describe('getCellInformation()', () => {
    it('should return isSnake: true if snake is in given coordinate', () => {
      const result = state.getCellInformation(testState, { x: 6, y: 5 })
      expect(result.isSnake).toEqual(true)
    })

    it('should return isSnake: false if no snake is in given coordinate', () => {
      const result = state.getCellInformation(testState, { x: 0, y: 0 })
      expect(result.isSnake).toEqual(false)
    })

    it('should return snake: object if snake is in given coordinate', () => {
      const snake = state.getSnakeById(testState, 1)
      const result = state.getCellInformation(testState, snake.parts[0])
      expect(result.snake).toEqual(snake)
    })

    it('should return differennt snake: object if other snake is in given coordinate', () => {
      const snake = state.getSnakeById(testState, 4)
      const result = state.getCellInformation(testState, snake.parts[0])
      expect(result.snake).toEqual(snake)
    })

    it('should return snake: undefined if no snake is in given coordinate', () => {
      const result = state.getCellInformation(testState, { x: 0, y: 0 })
      expect(result.snake).toBeUndefined()
    })
  })
})
