const path = require('path')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const testState = require('../game/test-state')

const game = require('../game/game')(testState, state => {
  io.sockets.emit('tick', state.toJS())
})

io.sockets.on('connection', socket => {
  socket.emit('connect', testState.toJS())
  socket.on('changeDirection', direction => {
    game.fire({ type: 'CHANGE_DIRECTION', payload: { direction, snakeId: 1 } })
  })
})

app.get('/game.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'game.js'))
})

app.get('/assets/css/main.css', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'assets', 'css', 'client.css'))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'))
})

module.exports = http
