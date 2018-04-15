// @ts-ignore
require('./client.scss')
const testState = require('../game/test-state')

const io = require('socket.io-client')
const area = require('./draw/area')

const game = () => {
  const appDiv = document.getElementById('app')
  const canvas = document.createElement('canvas')
  canvas.id = 'gamearea'

  canvas.width = 500
  canvas.height = 500

  appDiv.appendChild(canvas)
  area.drawArea(canvas, testState)
  const socket = io.connect(`:${process.env.PORT}`)
  socket.on('connect', () => {
    console.log('connected1')
  })
}

module.exports = game
