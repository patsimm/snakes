const game = require('./game')

describe('game', () => {
	const fakeDiv = document.createElement('div')
	let getElementByIdSpy

	beforeEach(() => {
		getElementByIdSpy = spyOn(document, 'getElementById').and.returnValue(fakeDiv)
	})

	it('should get element #app', () => {
		game()
		expect(getElementByIdSpy).toHaveBeenCalledWith('app')
	})

	it('should set elements innerHTML', () => {
		game()
		expect(fakeDiv.innerHTML).toBe('Hello World')
	})
})