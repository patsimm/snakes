const snakeData = require('./snake.data');
const Immutable = require('immutable');

describe('snake.data', () => {
  describe('createSnake()', () => {
    it('should return immutable Map', () => {
      const result = snakeData.createSnake();
      expect(result).toBeInstanceOf(Immutable.Map);
    });

    it('should set id', () => {
      const result = snakeData.createSnake(1);
      expect(result.get('id')).toEqual(1);
    });

    it('should set color', () => {
      const result = snakeData.createSnake(1, 'red');
      expect(result.get('color')).toEqual('red');
    });

    it('should set direction', () => {
      const result = snakeData.createSnake(1, 'red', 'north');
      expect(result.get('direction')).toEqual('north');
    });

    it('should set parts if given as array', () => {
      const result = snakeData.createSnake(1, 'red', 'north', [
        { x: 5, y: 5 },
        { x: 6, y: 5 },
        { x: 7, y: 5 }
      ]);
      expect(result.get('parts').toJS()).toEqual([{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }]);
    });

    it('should set parts if given as arry with Immutables', () => {
      const result = snakeData.createSnake(1, 'red', 'north', [
        Immutable.Map({ x: 5, y: 5 }),
        Immutable.Map({ x: 6, y: 5 }),
        Immutable.Map({ x: 7, y: 5 })
      ]);
      expect(result.get('parts').toJS()).toEqual([{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }]);
		});
		
		it('should set parts if given as Immutable', () => {
      const result = snakeData.createSnake(1, 'red', 'north', Immutable.fromJS([{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }]));
      expect(result.get('parts').toJS()).toEqual([{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }]);
    });
  });
});
