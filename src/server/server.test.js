require('dotenv').config()
const request = require('supertest')
const server = require('./server')

describe('server', () => {
  describe('api', () => {
    describe('GET /', () => {
      it('should respond with html', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /html/)
      })

      it('should contain a div#app', () => {
        return request(server)
          .get('/')
          .then(res => {
            expect(res.text).toMatch(/<div id="app">/)
          })
      })
    })

    describe('GET /game.js', () => {
      it('should return javascript', () => {
        return request(server)
          .get('/game.js')
          .expect('Content-Type', /javascript/)
      })
    })

    describe('GET /assets/css/main.css', () => {
      it('should return css', () => {
        return request(server)
          .get('/assets/css/main.css')
          .expect('Content-Type', /css/)
      })
    })
  })
})
