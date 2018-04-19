const Immutable = require('immutable')
const state = require('./state')
const testState = require('./test-state')

describe('state', () => {
  describe('getSnakeById()', () => {
    it('should return undfined if id doesnt exist', () => {
      const snake = state.getSnakeById(testState, 100)
      expect(snake).toBeUndefined()
    })

    it('should return snake #1', () => {
      const snake = state.getSnakeById(testState, 1)
      expect(snake).toBe(testState.getIn(['snakes', 0]))
    })

    it('should return snake #4', () => {
      const snake = state.getSnakeById(testState, 4)
      expect(snake).toBe(testState.getIn(['snakes', 1]))
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
      const snake = state.getSnakeById(testState, 1).toJS()
      const result = state.getCellInformation(testState, snake.parts[0])
      expect(result.snake).toEqual(snake)
    })

    it('should return different snake: object if other snake is in given coordinate', () => {
      const snake = state.getSnakeById(testState, 4).toJS()
      const result = state.getCellInformation(testState, snake.parts[0])
      expect(result.snake).toEqual(snake)
    })

    it('should return snake: undefined if no snake is in given coordinate', () => {
      const result = state.getCellInformation(testState, { x: 0, y: 0 })
      expect(result.snake).toBeNull()
    })
  })

  describe('getNextCoordinate()', () => {
    it('should return undefined if false direction is given', () => {
      const result = state.getNextCoordinate(testState, { x: 1, y: 1 }, 'bla')
      expect(result).toBeUndefined()
    })

    const testCoordinates = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 18, y: 12 }]
    const expectedCoordinates = {
      north: [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 18, y: 11 }],
      east: [{ x: 2, y: 1 }, { x: 3, y: 2 }, { x: 19, y: 12 }],
      south: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 18, y: 13 }],
      west: [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 17, y: 12 }]
    }

    Object.keys(expectedCoordinates).forEach(key => {
      describe(`${key}`, () => {
        const expected = expectedCoordinates[key]
        testCoordinates.forEach((coord, index) => {
          it(`should return coordinate to the ${key} of ${JSON.stringify(coord)}`, () => {
            const result = state.getNextCoordinate(testState, coord, key)
            expect(result).toEqual(expected[index])
          })
        })
      })
    })

    describe('over the edge', () => {
      const testCoordinates = [{ x: 0, y: 1 }, { x: 19, y: 2 }, { x: 5, y: 19 }, { x: 3, y: 0 }]
      const expectedCoordinates = {
        north: [{ x: 0, y: 0 }, { x: 19, y: 1 }, { x: 5, y: 18 }, { x: 3, y: 19 }],
        east: [{ x: 1, y: 1 }, { x: 0, y: 2 }, { x: 6, y: 19 }, { x: 4, y: 0 }],
        south: [{ x: 0, y: 2 }, { x: 19, y: 3 }, { x: 5, y: 0 }, { x: 3, y: 1 }],
        west: [{ x: 19, y: 1 }, { x: 18, y: 2 }, { x: 4, y: 19 }, { x: 2, y: 0 }]
      }

      Object.keys(expectedCoordinates).forEach(key => {
        describe(`${key}`, () => {
          const expected = expectedCoordinates[key]
          testCoordinates.forEach((coord, index) => {
            it(`should return coordinate to the ${key} of ${JSON.stringify(coord)}`, () => {
              const result = state.getNextCoordinate(testState, coord, key)
              expect(result).toEqual(expected[index])
            })
          })
        })
      })
    })

    describe('coordinates not in range', () => {
      const testCoordinates = [{ x: -1, y: 1 }, { x: 23, y: 2 }, { x: 5, y: -2 }, { x: 3, y: 20 }]
      testCoordinates.forEach(coordinate => {
        it(`should return undefined when given ${JSON.stringify(coordinate)}`, () => {
          const result = state.getNextCoordinate(testState, coordinate, 'north')
          expect(result).toBeUndefined()
        })
      })
    })
  })
})
