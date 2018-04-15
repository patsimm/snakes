const helpers = {
  getNextCoordinate: function(coordinate, direction) {
    const { x, y } = coordinate

    switch (direction) {
      case 'north':
        return { x, y: y - 1 }
      case 'east':
        return { x: x + 1, y }
      case 'south':
        return { x, y: y + 1 }
      case 'west':
        return { x: x - 1, y }
      default:
        return undefined
    }
  }
}

module.exports = helpers
