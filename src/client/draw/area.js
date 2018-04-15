const gameState = require('../../game/state')

const area = {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {*} state
   */
  drawArea: (ctx, state) => {
    const cellDimensions = {
      width: ctx.canvas.width / state.area.width,
      height: ctx.canvas.height / state.area.width
    }

    ctx.strokeStyle = '#303030'
    ctx.fillStyle = '#e3e3e3'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    area.walkGrid(state, coordinates => {
      area.drawCell(ctx, cellDimensions, state, coordinates)
    })
  },

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {*} cellDimensions
   * @param {*} state
   * @param {*} coordinates
   */
  drawCell: function(ctx, cellDimensions, state, coordinates) {
    const x = cellDimensions.width * coordinates.x
    const y = cellDimensions.height * coordinates.y

    const cellInfo = gameState.getCellInformation(state, coordinates)
    if (cellInfo.isSnake) {
      ctx.save()
      ctx.fillStyle = cellInfo.snake.color
      ctx.fillRect(x, y, cellDimensions.width, cellDimensions.height)
      ctx.restore()
    }
    ctx.strokeRect(x, y, cellDimensions.width, cellDimensions.height)
  },

  walkGrid: function(state, callback) {
    const { width, height } = state.area
    for (let x = 0; x < width; x = x + 1) {
      for (let y = 0; y < height; y = y + 1) {
        callback({ x, y })
      }
    }
  }
}

module.exports = area
