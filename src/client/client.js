// @ts-ignore
require('./client.scss')
const Immutable = require('immutable')
const Rx = require('rxjs')
const io = require('socket.io-client')
const area = require('./draw/area')

const game = () => {
  const appDiv = document.getElementById('app')
  const canvas = document.createElement('canvas')
  canvas.id = 'gamearea'

  canvas.width = 500
  canvas.height = 500

  appDiv.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  const socket = io.connect(`:${process.env.PORT}`)
  socket.on('connect', args => {
    console.log('connected')
  })
  socket.on('tick', state => {
    area.drawArea(ctx, Immutable.fromJS(state))
  })

  var keyDowns = Rx.Observable.fromEvent(document, 'keydown').subscribe(e => {
    switch (e.key) {
      case 'ArrowUp':
        socket.emit('changeDirection', 'north')
        break
      case 'ArrowDown':
        socket.emit('changeDirection', 'south')
        break
      case 'ArrowRight':
        socket.emit('changeDirection', 'east')
        break
      case 'ArrowLeft':
        socket.emit('changeDirection', 'west')
    }
  })
}

module.exports = game
