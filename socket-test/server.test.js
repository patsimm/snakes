const io = require('socket.io-client')

describe('socket.io server', () => {
  it('should be able to connect', () => {
    const socketIo = io.connect(`http://localhost:3000`)
    socketIo.disconnect()
  })
})
