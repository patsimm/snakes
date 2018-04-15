const client = require('./client')
const area = require('./draw/area')
const testState = require('../game/test-state')

describe('client', () => {
  const fakeDiv = document.createElement('div')
  const fakeCanvas = document.createElement('canvas')
  let drawAreaSpy
  let getContextSpy
  let getElementByIdSpy
  let createElementSpy

  let io
  beforeAll(() => {
    io = require('socket.io').listen(4000)
  })

  afterAll(() => {
    io.close()
  })

  beforeEach(() => {
    drawAreaSpy = spyOn(area, 'drawArea').and.stub()
    getElementByIdSpy = spyOn(document, 'getElementById').and.returnValue(fakeDiv)
    createElementSpy = spyOn(document, 'createElement').and.returnValue(fakeCanvas)
  })

  it('should get element #app', () => {
    client()
    expect(getElementByIdSpy).toHaveBeenCalledWith('app')
  })

  it('should create new canvas', () => {
    client()
    expect(createElementSpy).toHaveBeenCalledTimes(1)
    expect(createElementSpy).toHaveBeenCalledWith('canvas')
  })

  it('canvas should have id "gamearea"', () => {
    client()
    expect(fakeCanvas.id).toEqual('gamearea')
  })

  it('should add new canvas', () => {
    const appendChildSpy = spyOn(fakeDiv, 'appendChild')
    client()
    expect(appendChildSpy).toHaveBeenCalledWith(fakeCanvas)
  })

  it('should draw area on canvas', () => {
    client()
    expect(drawAreaSpy).toHaveBeenCalledWith(fakeCanvas, testState)
  })
})
