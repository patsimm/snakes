const events = require('./events')
const queue = require('./queue')

module.exports = {
  queueEvent: queue.queueEvent,
  flushEvents: queue.flushEvents,
  onEvent: events.onEvent
}
