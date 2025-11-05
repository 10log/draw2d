/**
 * Unit tests for draw2d.geo.Point using BUILT library
 *
 * This demonstrates that Jest CAN test draw2d classes
 * by importing from the built dist/ directory.
 */

describe('draw2d.geo.Point (from built library)', () => {
  let draw2d;

  beforeAll(() => {
    // Load the built library by requiring it as a CommonJS module
    // Since we're in Node/Jest, the UMD wrapper will use module.exports
    draw2d = require('../../../dist/draw2d.js');
  });

  it('should have draw2d library loaded', () => {
    expect(draw2d).toBeDefined();
    expect(draw2d.geo).toBeDefined();
    expect(draw2d.geo.Point).toBeDefined();
  });

  describe('constructor', () => {
    it('should create point with x,y coordinates', () => {
      const point = new draw2d.geo.Point(10, 20);

      expect(point.x).toBe(10);
      expect(point.y).toBe(20);
    });

    it('should create point from another point', () => {
      const point1 = new draw2d.geo.Point(5, 15);
      const point2 = new draw2d.geo.Point(point1);

      expect(point2.x).toBe(5);
      expect(point2.y).toBe(15);
      expect(point2).not.toBe(point1);
    });

    it('should create point from object', () => {
      const point = new draw2d.geo.Point({x: 30, y: 40});

      expect(point.x).toBe(30);
      expect(point.y).toBe(40);
    });
  });

  describe('getX and getY', () => {
    it('should return coordinates', () => {
      const point = new draw2d.geo.Point(15, 25);

      expect(point.getX()).toBe(15);
      expect(point.getY()).toBe(25);
    });
  });

  describe('translate', () => {
    it('should move point by dx,dy', () => {
      const point = new draw2d.geo.Point(10, 20);
      point.translate(5, 3);

      expect(point.x).toBe(15);
      expect(point.y).toBe(23);
    });

    it('should return self for chaining', () => {
      const point = new draw2d.geo.Point(10, 20);
      const result = point.translate(5, 5);

      expect(result).toBe(point);
    });
  });

  describe('distance', () => {
    it('should calculate distance between points', () => {
      const point1 = new draw2d.geo.Point(0, 0);
      const point2 = new draw2d.geo.Point(3, 4);

      expect(point1.distance(point2)).toBe(5);
    });

    it('should return 0 for same point', () => {
      const point = new draw2d.geo.Point(10, 10);

      expect(point.distance(point)).toBe(0);
    });
  });

  describe('equals', () => {
    it('should return true for equal points', () => {
      const point1 = new draw2d.geo.Point(10, 20);
      const point2 = new draw2d.geo.Point(10, 20);

      expect(point1.equals(point2)).toBe(true);
    });

    it('should return false for different points', () => {
      const point1 = new draw2d.geo.Point(10, 20);
      const point2 = new draw2d.geo.Point(10, 21);

      expect(point1.equals(point2)).toBe(false);
    });
  });

  describe('clone', () => {
    it('should create independent copy', () => {
      const point1 = new draw2d.geo.Point(10, 20);
      const point2 = point1.clone();

      expect(point2.x).toBe(10);
      expect(point2.y).toBe(20);
      expect(point2).not.toBe(point1);

      point2.x = 30;
      expect(point1.x).toBe(10); // Original unchanged
    });
  });

  describe('scale', () => {
    it('should scale point by factor', () => {
      const point = new draw2d.geo.Point(10, 20);
      point.scale(2);

      expect(point.x).toBe(20);
      expect(point.y).toBe(40);
    });
  });

  describe('subtract', () => {
    it('should return difference between points', () => {
      const point1 = new draw2d.geo.Point(10, 20);
      const point2 = new draw2d.geo.Point(3, 5);
      const result = point1.subtract(point2);

      expect(result.x).toBe(7);
      expect(result.y).toBe(15);
    });
  });

  describe('dot product', () => {
    it('should calculate dot product', () => {
      const point1 = new draw2d.geo.Point(2, 3);
      const point2 = new draw2d.geo.Point(4, 5);

      expect(point1.dot(point2)).toBe(23);
    });
  });

  describe('cross product', () => {
    it('should calculate cross product', () => {
      const point1 = new draw2d.geo.Point(2, 3);
      const point2 = new draw2d.geo.Point(4, 5);

      expect(point1.cross(point2)).toBe(-2);
    });
  });

  describe('setX and setY', () => {
    it('should set X coordinate', () => {
      const point = new draw2d.geo.Point(10, 20);
      point.setX(50);

      expect(point.x).toBe(50);
      expect(point.y).toBe(20);
    });

    it('should set Y coordinate', () => {
      const point = new draw2d.geo.Point(10, 20);
      point.setY(60);

      expect(point.x).toBe(10);
      expect(point.y).toBe(60);
    });

    it('should return self for chaining', () => {
      const point = new draw2d.geo.Point(10, 20);
      const result = point.setX(30);

      expect(result).toBe(point);
    });
  });

  describe('setPosition', () => {
    it('should set position with x,y parameters', () => {
      const point = new draw2d.geo.Point(10, 20);
      point.setPosition(100, 200);

      expect(point.x).toBe(100);
      expect(point.y).toBe(200);
    });

    it('should set position from Point object', () => {
      const point1 = new draw2d.geo.Point(10, 20);
      const point2 = new draw2d.geo.Point(50, 60);
      point1.setPosition(point2);

      expect(point1.x).toBe(50);
      expect(point1.y).toBe(60);
    });

    it('should return self for chaining', () => {
      const point = new draw2d.geo.Point(10, 20);
      const result = point.setPosition(30, 40);

      expect(result).toBe(point);
    });
  });

  describe('length', () => {
    it('should calculate length of vector from origin', () => {
      const point = new draw2d.geo.Point(3, 4);

      expect(point.length()).toBe(5);
    });

    it('should return 0 for origin point', () => {
      const point = new draw2d.geo.Point(0, 0);

      expect(point.length()).toBe(0);
    });

    it('should calculate length for negative coordinates', () => {
      const point = new draw2d.geo.Point(-3, -4);

      expect(point.length()).toBe(5);
    });
  });

  describe('translated', () => {
    it('should return new translated point with x,y', () => {
      const point = new draw2d.geo.Point(10, 20);
      const result = point.translated(5, 3);

      expect(result.x).toBe(15);
      expect(result.y).toBe(23);
      expect(result).not.toBe(point);
      expect(point.x).toBe(10); // Original unchanged
    });

    it('should return new translated point from Point object', () => {
      const point = new draw2d.geo.Point(10, 20);
      const offset = new draw2d.geo.Point(5, 3);
      const result = point.translated(offset);

      expect(result.x).toBe(15);
      expect(result.y).toBe(23);
    });
  });

  describe('scaled', () => {
    it('should return new scaled point', () => {
      const point = new draw2d.geo.Point(10, 20);
      const result = point.scaled(2);

      expect(result.x).toBe(20);
      expect(result.y).toBe(40);
      expect(result).not.toBe(point);
      expect(point.x).toBe(10); // Original unchanged
    });

    it('should scale by fractional factor', () => {
      const point = new draw2d.geo.Point(10, 20);
      const result = point.scaled(0.5);

      expect(result.x).toBe(5);
      expect(result.y).toBe(10);
    });
  });

  describe('lerp', () => {
    it('should interpolate at t=0', () => {
      const point1 = new draw2d.geo.Point(0, 0);
      const point2 = new draw2d.geo.Point(10, 20);
      const result = point1.lerp(point2, 0);

      expect(result.x).toBe(0);
      expect(result.y).toBe(0);
    });

    it('should interpolate at t=1', () => {
      const point1 = new draw2d.geo.Point(0, 0);
      const point2 = new draw2d.geo.Point(10, 20);
      const result = point1.lerp(point2, 1);

      expect(result.x).toBe(10);
      expect(result.y).toBe(20);
    });

    it('should interpolate at t=0.5', () => {
      const point1 = new draw2d.geo.Point(0, 0);
      const point2 = new draw2d.geo.Point(10, 20);
      const result = point1.lerp(point2, 0.5);

      expect(result.x).toBe(5);
      expect(result.y).toBe(10);
    });

    it('should interpolate at t=0.25', () => {
      const point1 = new draw2d.geo.Point(10, 20);
      const point2 = new draw2d.geo.Point(20, 40);
      const result = point1.lerp(point2, 0.25);

      expect(result.x).toBe(12.5);
      expect(result.y).toBe(25);
    });
  });

  describe('getPosition', () => {
    it('should return EAST for point to the right', () => {
      const point1 = new draw2d.geo.Point(0, 0);
      const point2 = new draw2d.geo.Point(10, 0);

      expect(point1.getPosition(point2)).toBe(draw2d.geo.PositionConstants.EAST);
    });

    it('should return WEST for point to the left', () => {
      const point1 = new draw2d.geo.Point(10, 0);
      const point2 = new draw2d.geo.Point(0, 0);

      expect(point1.getPosition(point2)).toBe(draw2d.geo.PositionConstants.WEST);
    });

    it('should return SOUTH for point below', () => {
      const point1 = new draw2d.geo.Point(0, 0);
      const point2 = new draw2d.geo.Point(0, 10);

      expect(point1.getPosition(point2)).toBe(draw2d.geo.PositionConstants.SOUTH);
    });

    it('should return NORTH for point above', () => {
      const point1 = new draw2d.geo.Point(0, 10);
      const point2 = new draw2d.geo.Point(0, 0);

      expect(point1.getPosition(point2)).toBe(draw2d.geo.PositionConstants.NORTH);
    });
  });

  describe('setBoundary and boundary enforcement', () => {
    it('should constrain point to boundary with numbers', () => {
      const point = new draw2d.geo.Point(50, 50);
      point.setBoundary(0, 0, 100, 100);
      point.setPosition(150, 150);

      expect(point.x).toBe(100);
      expect(point.y).toBe(100);
    });

    it('should constrain point to boundary with Rectangle', () => {
      const point = new draw2d.geo.Point(50, 50);
      const boundary = new draw2d.geo.Rectangle(0, 0, 100, 100);
      point.setBoundary(boundary);
      point.setPosition(150, 150);

      expect(point.x).toBe(100);
      expect(point.y).toBe(100);
    });

    it('should enforce lower boundary', () => {
      const point = new draw2d.geo.Point(50, 50);
      point.setBoundary(10, 10, 100, 100);
      point.setPosition(0, 0);

      expect(point.x).toBe(10);
      expect(point.y).toBe(10);
    });

    it('should enforce boundary on translate', () => {
      const point = new draw2d.geo.Point(95, 95);
      point.setBoundary(0, 0, 100, 100);
      point.translate(10, 10);

      expect(point.x).toBe(100);
      expect(point.y).toBe(100);
    });

    it('should enforce boundary on scale', () => {
      const point = new draw2d.geo.Point(50, 50);
      point.setBoundary(0, 0, 80, 80);
      point.scale(2);

      expect(point.x).toBe(80);
      expect(point.y).toBe(80);
    });
  });

  describe('getPersistentAttributes', () => {
    it('should return serializable object', () => {
      const point = new draw2d.geo.Point(10, 20);
      const attrs = point.getPersistentAttributes();

      expect(attrs).toEqual({x: 10, y: 20});
    });
  });

  describe('setPersistentAttributes', () => {
    it('should restore from serialized data', () => {
      const point = new draw2d.geo.Point(0, 0);
      point.setPersistentAttributes({x: 100, y: 200});

      expect(point.x).toBe(100);
      expect(point.y).toBe(200);
    });

    it('should return self for chaining', () => {
      const point = new draw2d.geo.Point(0, 0);
      const result = point.setPersistentAttributes({x: 10, y: 20});

      expect(result).toBe(point);
    });
  });

  describe('edge cases', () => {
    it('should handle negative coordinates', () => {
      const point = new draw2d.geo.Point(-10, -20);

      expect(point.x).toBe(-10);
      expect(point.y).toBe(-20);
    });

    it('should handle zero coordinates', () => {
      const point = new draw2d.geo.Point(0, 0);

      expect(point.x).toBe(0);
      expect(point.y).toBe(0);
    });

    it('should handle large coordinates', () => {
      const point = new draw2d.geo.Point(1e6, 1e6);

      expect(point.x).toBe(1000000);
      expect(point.y).toBe(1000000);
    });

    it('should handle negative translation', () => {
      const point = new draw2d.geo.Point(10, 20);
      point.translate(-5, -3);

      expect(point.x).toBe(5);
      expect(point.y).toBe(17);
    });

    it('should handle negative scale', () => {
      const point = new draw2d.geo.Point(10, 20);
      point.scale(-1);

      expect(point.x).toBe(-10);
      expect(point.y).toBe(-20);
    });

    it('should handle zero scale', () => {
      const point = new draw2d.geo.Point(10, 20);
      point.scale(0);

      expect(point.x).toBe(0);
      expect(point.y).toBe(0);
    });

    it('should handle fractional coordinates', () => {
      const point = new draw2d.geo.Point(10.5, 20.7);

      expect(point.x).toBe(10.5);
      expect(point.y).toBe(20.7);
    });

    it('should calculate distance with negative coordinates', () => {
      const point1 = new draw2d.geo.Point(-3, -4);
      const point2 = new draw2d.geo.Point(0, 0);

      expect(point1.distance(point2)).toBe(5);
    });
  });
});
