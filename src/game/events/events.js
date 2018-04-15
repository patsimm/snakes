const EventEmitter = require('events').EventEmitter
const queue = require('./queue')

const events = {
  _emitter: new EventEmitter(),

  onEvent: function(type, callback) {
    events._emitter.on(type, args => {
      callback(args)
    })
  },

  queueEvent: function(event) {
    queue.queueEvent(event)
  },

  flushEvents: function() {
    queue.flushEvents(events._emitter.emit)
  }
}

module.exports = events
