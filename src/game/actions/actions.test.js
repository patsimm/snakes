const actions = require('./actions')
const helpers = require('./actions.helper')
const { getSnakeById } = require('../state')

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
describe('actions', () => {
  describe('changeSnakeDirection', () => {
    it('should not return same state', () => {
      const result = actions.changeSnakeDirection(testState, 4, 'west')
      expect(result).not.toBe(testState)
    })

    it('should return same state if snake does not exist', () => {
      const result = actions.changeSnakeDirection(testState, 100, 'west')
      expect(result).toBe(testState)
    })

    it('should set snakes direction to east', () => {
      const result = actions.changeSnakeDirection(testState, 4, 'east')
      const resultSnake = getSnakeById(result, 4)
      expect(resultSnake.direction).toEqual('east')
    })

    it('should set snakes direction to north', () => {
      const result = actions.changeSnakeDirection(testState, 4, 'north')
      const resultSnake = getSnakeById(result, 4)
      expect(resultSnake.direction).toEqual('north')
    })

    it('should not return the same snakes array', () => {
      const result = actions.changeSnakeDirection(testState, 4, 'north')
      expect(result.snakes).not.toBe(testState.snakes)
    })

    it('should not return the same snake object', () => {
      const snakeBefore = getSnakeById(testState, 4)
      const result = actions.changeSnakeDirection(testState, 4, 'north')
      const resultSnake = getSnakeById(result, 4)
      expect(resultSnake).not.toBe(snakeBefore)
    })

    it('should set other snakes direction to west', () => {
      const result = actions.changeSnakeDirection(testState, 1, 'west')
      const resultSnake = getSnakeById(result, 1)
      expect(resultSnake.direction).toEqual('west')
    })
  })

  describe('moveSnake()', () => {
    it('should not return same state', () => {
      const result = actions.moveSnake(testState, 1)
      expect(result).not.toBe(testState)
    })

    it('should return same state if snake does not exist', () => {
      const result = actions.moveSnake(testState, 100)
      expect(result).toBe(testState)
    })

    it('should not return the same snakes array', () => {
      const result = actions.changeSnakeDirection(testState, 4, 'north')
      expect(result.snakes).not.toBe(testState.snakes)
    })

    it('should not return the same snake object', () => {
      const snakeBefore = getSnakeById(testState, 1)
      const result = actions.moveSnake(testState, 1)
      const resultSnake = getSnakeById(result, 1)
      expect(resultSnake).not.toBe(snakeBefore)
    })

    it('should shift all the indices from the second to the last part', () => {
      const partsBefore = getSnakeById(testState, 1).parts
      const result = actions.moveSnake(testState, 1)
      const resultParts = getSnakeById(result, 1).parts
      partsBefore
        .slice(1)
        .forEach((val, index) => expect(partsBefore[index]).toBe(resultParts[index + 1]))
    })

    it('should insert new head part which is next to old head part', () => {
      const headBefore = getSnakeById(testState, 1).parts[0]
      const result = actions.moveSnake(testState, 1)
      const resultSnake = getSnakeById(result, 1)
      const resultHead = resultSnake.parts[0]
      expect(resultHead).toEqual(helpers.getNextCoordinate(headBefore, resultSnake.direction))
    })
  })
})
