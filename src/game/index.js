const createGame = require('./game')
const { eventCreators, eventTypes } = require('./events')

module.exports = {
  createGame,
  eventTypes,
  eventCreators
}
