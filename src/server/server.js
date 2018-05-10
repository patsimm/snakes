const path = require('path')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const randomcolor = require('randomcolor')
const { createGame, eventCreators } = require('../game')

let totalConns = 0

const game = createGame(state => {
  io.sockets.emit('tick', state.toJS())
})

io.sockets.on('connection', socket => {
  totalConns = totalConns + 1
  const snakeId = totalConns
  game.fire(eventCreators.spawnSnake(snakeId, randomcolor()))

  socket.on('changeDirection', direction => {
    game.fire(eventCreators.changeDirection(snakeId, direction))
  })

  socket.on('disconnect', () => {
    game.fire(eventCreators.removeSnake(snakeId))
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
