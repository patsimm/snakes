const area = require('./area')
const state = require('../../game/state')
const testState = require('../../game/test-state')

describe('area', () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  let getContextSpy

  describe('drawArea', () => {
    it('should not fail', () => {
      area.drawArea(ctx, testState)
    })

    it('should call walkGrid', () => {
      const walkGridSpy = spyOn(area, 'walkGrid')
      area.drawArea(ctx, testState)
      expect(walkGridSpy).toHaveBeenCalled()
    })

    describe('walkGrid() callback', () => {
      let callback
      beforeEach(() => {
        const walkGridSpy = spyOn(area, 'walkGrid')
        area.drawArea(ctx, testState)
        callback = walkGridSpy.calls.mostRecent().args[1]
      })

      it('should call drawCell()', () => {
        const drawCellSpy = spyOn(area, 'drawCell')
        callback({ x: 0, y: 0 })
        expect(drawCellSpy).toHaveBeenCalled()
      })

      it('should call drawCell() with the right values', () => {
        const drawCellSpy = spyOn(area, 'drawCell')
        const cellDimensions = {
          width: canvas.width / testState.area.width,
          height: canvas.height / testState.area.width
        }
        const coordinates = { x: 0, y: 0 }
        callback(coordinates)
        expect(drawCellSpy).toHaveBeenCalledWith(ctx, cellDimensions, testState, coordinates)
      })
    })
  })

  describe('drawCell()', () => {
    it('should call rect()', () => {
      const strokeRectSpy = spyOn(ctx, 'strokeRect')
      area.drawCell(ctx, { width: 5, height: 5 }, testState, { x: 0, y: 0 })
      expect(strokeRectSpy).toHaveBeenCalledTimes(1)
    })

    let inputValues = [
      [{ width: 5, height: 5 }, testState, { x: 0, y: 0 }],
      [{ width: 20, height: 20 }, testState, { x: 10, y: 10 }]
    ]
    let expectedValues = [[0, 0, 5, 5], [200, 200, 20, 20]]
    inputValues.forEach((value, index) => {
      it(`should call rect() with correct values ${index}`, () => {
        const strokeRectSpy = spyOn(ctx, 'strokeRect')
        // @ts-ignore
        area.drawCell(ctx, ...value)
        expect(strokeRectSpy).toHaveBeenCalledWith(...expectedValues[index])
      })
    })

    it('should call getCellInformation() for given coordinates', () => {
      const getCellInformationSpy = spyOn(state, 'getCellInformation').and.callThrough()
      area.drawCell(ctx, { width: 5, height: 5 }, testState, { x: 0, y: 0 })
      expect(getCellInformationSpy).toHaveBeenCalledWith(testState, { x: 0, y: 0 })
    })

    it('should call fillRect if getCellInformation() returns isSnake: true', () => {
      spyOn(state, 'getCellInformation').and.returnValue({
        isSnake: true,
        snake: { color: '#f587e3' }
      })
      const fillRectSpy = spyOn(ctx, 'fillRect')
      area.drawCell(ctx, { width: 5, height: 5 }, testState, { x: 0, y: 0 })
      expect(fillRectSpy).toHaveBeenCalledWith(0, 0, 5, 5)
    })
  })

  describe('walkGrid()', () => {
    it('should call callback width*height times', () => {
      const callback = jest.fn()
      area.walkGrid(testState, callback)
      expect(callback).toHaveBeenCalledTimes(testState.area.width * testState.area.height)
    })

    it('should call callback with walked coordinates', () => {
      const callback = jest.fn()
      area.walkGrid(testState, callback)
      for (let x = 0; x < testState.area.width; x++) {
        for (let y = 0; y < testState.area.width; y++) {
          expect(callback).toHaveBeenCalledWith({ x, y })
        }
      }
    })
  })
})
