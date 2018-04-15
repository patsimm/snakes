const testState = {
  area: {
    width: 20,
    height: 20
  },
  snakes: [
    {
      id: 1,
      color: '#f36890',
      parts: [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }],
      direction: 'north'
    },
    {
      id: 4,
      color: '#45e124',
      parts: [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }],
      direction: 'west'
    }
  ]
}

module.exports = testState
