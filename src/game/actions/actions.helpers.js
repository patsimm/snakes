const Immutable = require('immutable')
const { directions, createCoordinate } = require('../data')

module.exports = {
  findSpawn: state => {
    return Immutable.fromJS({
      parts: [createCoordinate(3, 2), createCoordinate(2, 2), createCoordinate(1, 2)],
      direction: directions.EAST
    })
  }
}
