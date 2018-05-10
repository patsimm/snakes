const actions = require('./actions')
const testState = require('../test-state')
const { getSnakeById, getNextCoordinate } = require('../state')
const { directions } = require('../data')

describe('actions', () => {
  describe('changeSnakeDirection', () => {
    it('should not return same state', () => {
      const result = actions.changeSnakeDirection(testState, 4, directions.NORTH)
      expect(result).not.toBe(testState)
    })

    it('should return same state if snake does not exist', () => {
      const result = actions.changeSnakeDirection(testState, 100, directions.WEST)
      expect(result).toBe(testState)
    })

    it('should set snakes direction to north', () => {
      const result = actions.changeSnakeDirection(testState, 4, directions.NORTH)
      const resultSnake = getSnakeById(result, 4)
      expect(resultSnake.get('direction')).toEqual(directions.NORTH)
    })

    it('should set snakes direction to north', () => {
      const result = actions.changeSnakeDirection(testState, 4, directions.NORTH)
      const resultSnake = getSnakeById(result, 4)
      expect(resultSnake.get('direction')).toEqual(directions.NORTH)
    })

    it('should not return the same snakes array', () => {
      const result = actions.changeSnakeDirection(testState, 4, directions.NORTH)
      expect(result.get('snakes')).not.toBe(testState.get('snakes'))
    })

    it('should not return the same snake object', () => {
      const snakeBefore = getSnakeById(testState, 4).toJS()
      const result = actions.changeSnakeDirection(testState, 4, directions.NORTH)
      const resultSnake = getSnakeById(result, 4).toJS()
      expect(resultSnake).not.toBe(snakeBefore)
    })

    it('should set other snakes direction to west', () => {
      const result = actions.changeSnakeDirection(testState, 1, directions.WEST)
      const resultSnake = getSnakeById(result, 1).toJS()
      expect(resultSnake.direction).toEqual(directions.WEST)
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
      const result = actions.changeSnakeDirection(testState, 4, directions.NORTH)
      expect(result.get('snakes')).not.toEqual(testState.get('snakes'))
    })

    it('should not return the same snake object', () => {
      const snakeBefore = getSnakeById(testState, 1)
      const result = actions.moveSnake(testState, 1)
      const resultSnake = getSnakeById(result, 1)
      expect(resultSnake).not.toBe(snakeBefore)
    })

    it('should shift all the indices from the second to the last part', () => {
      const partsBefore = getSnakeById(testState, 1).toJS().parts
      const result = actions.moveSnake(testState, 1)
      const resultParts = getSnakeById(result, 1).toJS().parts
      partsBefore
        .slice(1)
        .forEach((val, index) => expect(partsBefore[index]).toEqual(resultParts[index + 1]))
    })

    it('should insert new head part which is next to old head part', () => {
      const headBefore = getSnakeById(testState, 1).toJS().parts[0]
      const result = actions.moveSnake(testState, 1)
      const resultSnake = getSnakeById(result, 1).toJS()
      const resultHead = resultSnake.parts[0]
      expect(resultHead).toEqual(getNextCoordinate(testState, headBefore, resultSnake.direction))
    })
  })
})
