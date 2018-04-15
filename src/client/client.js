const io = require('socket.io-client')

const game = () => {
  const appDiv = document.getElementById('app')
  appDiv.innerHTML = 'Hello World'
  const socket = io.connect(`http://localhost:${process.env.PORT}`)
  socket.on('connect', () => {
    console.log('connected')
  })
}

module.exports = game
