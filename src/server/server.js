const path = require('path')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.sockets.on('connection', socket => {
  socket.send('connect')
})

app.get('/game.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'game.js'))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'))
})

module.exports = http
