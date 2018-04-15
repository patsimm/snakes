const queue = {
  _stack: [],

  queueEvent: function(event) {
    const newStack = [...queue._stack]
    newStack.push(event)
    queue._stack = newStack
  },

  flushEvents: function(emitFunction) {
    const newStack = [...queue._stack]
    queue._stack.forEach(() => {
      const event = newStack.shift()
      emitFunction(event.type, event.args)
    })
    queue._stack = newStack
  }
}

module.exports = queue
