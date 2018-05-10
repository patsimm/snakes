// @ts-ignore
require('./client.scss')
const Immutable = require('immutable')
const Rx = require('rxjs')
const io = require('socket.io-client')
const area = require('./draw/area')
const { directions } = require('../game/data')

const game = () => {
  const appDiv = document.getElementById('app')
  const canvas = document.createElement('canvas')
  canvas.id = 'gamearea'

  canvas.width = 500
  canvas.height = 500

  appDiv.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  const socket = io.connect(`:${process.env.PORT}`)
  socket.on('tick', state => {
    area.drawArea(ctx, Immutable.fromJS(state))
  })

  var keyDowns = Rx.Observable.fromEvent(document, 'keydown').subscribe(e => {
    switch (e.key.toUpperCase()) {
      case 'W':
        socket.emit('changeDirection', directions.NORTH)
        break
      case 'S':
        socket.emit('changeDirection', directions.SOUTH)
        break
      case 'D':
        socket.emit('changeDirection', directions.EAST)
        break
      case 'A':
        socket.emit('changeDirection', directions.WEST)
    }
  })
}

module.exports = game
