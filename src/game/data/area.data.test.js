const areaData = require('./area.data')
const Immutable = require('immutable')

describe('area.data', () => {
	describe('createArea', () => {
		it('should set width and height', () => {
			const result = areaData.createArea(101, 100)
			expect(result.toJS()).toEqual({ width: 101, height: 100 })
		})
	})
})