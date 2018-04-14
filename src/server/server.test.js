const request = require('supertest')
const app = require('./server')

describe('server', () => {
	describe('GET /', () => {
		it('should respond with html', () => {
			return request(app)
				.get('/')
				.expect('Content-Type', /html/)
				
		})

		it('should contain a div#app', () => {
			return request(app)
				.get('/')
				.then((res => {
					expect(res.text).toMatch(/<div id="app">/)
				}))
		})
	});

	describe('GET /game.js', () => {
		it('should return javascript', () => {
			return request(app)
			.get('/game.js')
			.expect('Content-Type', /javascript/)
		});
	})
});