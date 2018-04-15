const helpers = require('./actions.helper')

describe('actions.helper', () => {
  describe('getNextCoordinate()', () => {
    const testCoordinates = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 100, y: 23 }]

    it('should return undefined if false direction is given', () => {
      const result = helpers.getNextCoordinate({ x: 1, y: 1 }, 'bla')
      expect(result).toBeUndefined()
    })

    describe('north', () => {
      const expectedCoordinates = [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 100, y: 22 }]
      testCoordinates.forEach((coord, index) => {
        it(`should return coordinate to the north of ${coord}`, () => {
          const result = helpers.getNextCoordinate(coord, 'north')
          expect(result).toEqual(expectedCoordinates[index])
        })
      })
    })

    describe('east', () => {
      const expectedCoordinates = [{ x: 2, y: 1 }, { x: 3, y: 2 }, { x: 101, y: 23 }]
      testCoordinates.forEach((coord, index) => {
        it(`should return coordinate to the east of ${coord}`, () => {
          const result = helpers.getNextCoordinate(coord, 'east')
          expect(result).toEqual(expectedCoordinates[index])
        })
      })
    })

    describe('south', () => {
      const expectedCoordinates = [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 100, y: 24 }]
      testCoordinates.forEach((coord, index) => {
        it(`should return coordinate to the south of ${coord}`, () => {
          const result = helpers.getNextCoordinate(coord, 'south')
          expect(result).toEqual(expectedCoordinates[index])
        })
      })
    })

    describe('west', () => {
      const expectedCoordinates = [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 99, y: 23 }]
      testCoordinates.forEach((coord, index) => {
        it(`should return coordinate to the west of ${coord}`, () => {
          const result = helpers.getNextCoordinate(coord, 'west')
          expect(result).toEqual(expectedCoordinates[index])
        })
      })
    })
  })
})
