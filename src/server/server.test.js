const request = require('supertest')
const app = require('./server')

describe('server', () => {
	it('should serve /', () => {
		return request(app).get('/').then((res => {
			expect(res.status).toBe(200)
		}))
	});
});