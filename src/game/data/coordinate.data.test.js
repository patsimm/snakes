const coordinateData = require('./coordinate.data')
const Immutable = require('immutable')

describe('coordinate.data', () => {
	describe('createCoordinate()', () => {
		it('should set x and y', () => {
			const result = coordinateData.createCoordinate(5, 5)
			expect(result.toJS()).toEqual({ x: 5, y: 5})
		})
	})
})