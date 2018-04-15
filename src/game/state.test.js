const state = require('./state')

const testState = {
  area: {
    width: 20,
    height: 20
  },
  snakes: [
    {
      id: 1,
      color: 'red',
      parts: [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }],
      direction: 'north'
    },
    {
      id: 4,
      color: 'red',
      parts: [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }],
      direction: 'west'
    }
  ]
}

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
})
