/**
 * Unit tests for draw2d.geo.Rectangle
 */

describe('draw2d.geo.Rectangle', () => {
  let draw2d;

  beforeAll(() => {
    // Load the built library
    draw2d = require('../../../dist/draw2d.js');
  });

  describe('constructor', () => {
    it('should create rectangle with x, y, w, h', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);

      expect(rect.x).toBe(10);
      expect(rect.y).toBe(20);
      expect(rect.w).toBe(100);
      expect(rect.h).toBe(50);
    });

    it('should create rectangle from another rectangle', () => {
      const rect1 = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const rect2 = new draw2d.geo.Rectangle(rect1);

      expect(rect2.x).toBe(10);
      expect(rect2.y).toBe(20);
      expect(rect2.w).toBe(100);
      expect(rect2.h).toBe(50);
      expect(rect2).not.toBe(rect1);
    });

    it('should create rectangle from object with {x, y, w, h}', () => {
      const rect = new draw2d.geo.Rectangle({x: 5, y: 10, w: 50, h: 25});

      expect(rect.x).toBe(5);
      expect(rect.y).toBe(10);
      expect(rect.w).toBe(50);
      expect(rect.h).toBe(25);
    });

    it('should create rectangle from object with {x, y, width, height}', () => {
      const rect = new draw2d.geo.Rectangle({x: 5, y: 10, width: 50, height: 25});

      expect(rect.x).toBe(5);
      expect(rect.y).toBe(10);
      expect(rect.w).toBe(50);
      expect(rect.h).toBe(25);
    });
  });

  describe('getWidth and getHeight', () => {
    it('should return dimensions', () => {
      const rect = new draw2d.geo.Rectangle(0, 0, 100, 50);

      expect(rect.getWidth()).toBe(100);
      expect(rect.getHeight()).toBe(50);
    });
  });

  describe('setWidth and setHeight', () => {
    it('should set width', () => {
      const rect = new draw2d.geo.Rectangle(0, 0, 100, 50);
      rect.setWidth(200);

      expect(rect.w).toBe(200);
      expect(rect.h).toBe(50);
    });

    it('should set height', () => {
      const rect = new draw2d.geo.Rectangle(0, 0, 100, 50);
      rect.setHeight(75);

      expect(rect.w).toBe(100);
      expect(rect.h).toBe(75);
    });

    it('should return self for chaining', () => {
      const rect = new draw2d.geo.Rectangle(0, 0, 100, 50);
      const result = rect.setWidth(200);

      expect(result).toBe(rect);
    });
  });

  describe('boundary getters', () => {
    let rect;

    beforeEach(() => {
      rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
    });

    it('should return left coordinate', () => {
      expect(rect.getLeft()).toBe(10);
    });

    it('should return right coordinate', () => {
      expect(rect.getRight()).toBe(110); // x + w = 10 + 100
    });

    it('should return top coordinate', () => {
      expect(rect.getTop()).toBe(20);
    });

    it('should return bottom coordinate', () => {
      expect(rect.getBottom()).toBe(70); // y + h = 20 + 50
    });
  });

  describe('corner and edge points', () => {
    let rect;

    beforeEach(() => {
      rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
    });

    it('should return top left corner', () => {
      const point = rect.getTopLeft();
      expect(point.x).toBe(10);
      expect(point.y).toBe(20);
    });

    it('should return top right corner', () => {
      const point = rect.getTopRight();
      expect(point.x).toBe(110);
      expect(point.y).toBe(20);
    });

    it('should return bottom left corner', () => {
      const point = rect.getBottomLeft();
      expect(point.x).toBe(10);
      expect(point.y).toBe(70);
    });

    it('should return bottom right corner', () => {
      const point = rect.getBottomRight();
      expect(point.x).toBe(110);
      expect(point.y).toBe(70);
    });

    it('should return top center', () => {
      const point = rect.getTopCenter();
      expect(point.x).toBe(60);
      expect(point.y).toBe(20);
    });

    it('should return bottom center', () => {
      const point = rect.getBottomCenter();
      expect(point.x).toBe(60);
      expect(point.y).toBe(70);
    });

    it('should return center left', () => {
      const point = rect.getCenterLeft();
      expect(point.x).toBe(10);
      expect(point.y).toBe(45);
    });

    it('should return center right', () => {
      const point = rect.getCenterRight();
      expect(point.x).toBe(110);
      expect(point.y).toBe(45);
    });

    it('should return center', () => {
      const point = rect.getCenter();
      expect(point.x).toBe(60);
      expect(point.y).toBe(45);
    });
  });

  describe('resize', () => {
    it('should increase width and height', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
      rect.resize(20, 10);

      expect(rect.w).toBe(120);
      expect(rect.h).toBe(60);
      expect(rect.x).toBe(10); // Position unchanged
      expect(rect.y).toBe(20);
    });

    it('should decrease width and height with negative values', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
      rect.resize(-20, -10);

      expect(rect.w).toBe(80);
      expect(rect.h).toBe(40);
    });

    it('should return self for chaining', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const result = rect.resize(10, 10);

      expect(result).toBe(rect);
    });
  });

  describe('scale', () => {
    it('should scale rectangle from center', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
      rect.scale(20, 10);

      expect(rect.w).toBe(120);
      expect(rect.h).toBe(60);
      expect(rect.x).toBe(0); // x - dw/2 = 10 - 10
      expect(rect.y).toBe(15); // y - dh/2 = 20 - 5
    });

    it('should return self for chaining', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const result = rect.scale(10, 10);

      expect(result).toBe(rect);
    });
  });

  describe('translate', () => {
    it('should move rectangle by dx, dy', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
      rect.translate(5, 3);

      expect(rect.x).toBe(15);
      expect(rect.y).toBe(23);
      expect(rect.w).toBe(100); // Size unchanged
      expect(rect.h).toBe(50);
    });

    it('should move rectangle by Point', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const offset = new draw2d.geo.Point(5, 3);
      rect.translate(offset);

      expect(rect.x).toBe(15);
      expect(rect.y).toBe(23);
    });

    it('should return self for chaining', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const result = rect.translate(5, 5);

      expect(result).toBe(rect);
    });
  });

  describe('translated', () => {
    it('should return new translated rectangle', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const result = rect.translated(5, 3);

      expect(result.x).toBe(15);
      expect(result.y).toBe(23);
      expect(result.w).toBe(100);
      expect(result.h).toBe(50);
      expect(result).not.toBe(rect);
      expect(rect.x).toBe(10); // Original unchanged
    });

    it('should return new translated rectangle from Point', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const offset = new draw2d.geo.Point(5, 3);
      const result = rect.translated(offset);

      expect(result.x).toBe(15);
      expect(result.y).toBe(23);
    });
  });

  describe('setBounds', () => {
    it('should set position and dimensions from another rectangle', () => {
      const rect1 = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const rect2 = new draw2d.geo.Rectangle(50, 60, 200, 75);
      rect1.setBounds(rect2);

      expect(rect1.x).toBe(50);
      expect(rect1.y).toBe(60);
      expect(rect1.w).toBe(200);
      expect(rect1.h).toBe(75);
    });

    it('should return self for chaining', () => {
      const rect1 = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const rect2 = new draw2d.geo.Rectangle(50, 60, 200, 75);
      const result = rect1.setBounds(rect2);

      expect(result).toBe(rect1);
    });
  });

  describe('isEmpty', () => {
    it('should return false for normal rectangle', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);

      expect(rect.isEmpty()).toBe(false);
    });

    it('should return true for zero width', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 0, 50);

      expect(rect.isEmpty()).toBe(true);
    });

    it('should return true for zero height', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 0);

      expect(rect.isEmpty()).toBe(true);
    });

    it('should return true for negative width', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, -10, 50);

      expect(rect.isEmpty()).toBe(true);
    });

    it('should return true for negative height', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, -10);

      expect(rect.isEmpty()).toBe(true);
    });
  });

  describe('equals', () => {
    it('should return true for equal rectangles', () => {
      const rect1 = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const rect2 = new draw2d.geo.Rectangle(10, 20, 100, 50);

      expect(rect1.equals(rect2)).toBe(true);
    });

    it('should return false for different x', () => {
      const rect1 = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const rect2 = new draw2d.geo.Rectangle(11, 20, 100, 50);

      expect(rect1.equals(rect2)).toBe(false);
    });

    it('should return false for different dimensions', () => {
      const rect1 = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const rect2 = new draw2d.geo.Rectangle(10, 20, 101, 50);

      expect(rect1.equals(rect2)).toBe(false);
    });
  });

  describe('hitTest', () => {
    let rect;

    beforeEach(() => {
      rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
    });

    it('should return true for point inside', () => {
      expect(rect.hitTest(50, 40)).toBe(true);
    });

    it('should return true for point on edge', () => {
      expect(rect.hitTest(10, 20)).toBe(true); // Top-left corner
      expect(rect.hitTest(110, 70)).toBe(true); // Bottom-right corner
    });

    it('should return false for point outside', () => {
      expect(rect.hitTest(5, 5)).toBe(false);
      expect(rect.hitTest(200, 200)).toBe(false);
    });

    it('should accept Point object', () => {
      const point = new draw2d.geo.Point(50, 40);
      expect(rect.hitTest(point)).toBe(true);
    });
  });

  describe('contains', () => {
    it('should return true when containing smaller rectangle', () => {
      const outer = new draw2d.geo.Rectangle(0, 0, 100, 100);
      const inner = new draw2d.geo.Rectangle(25, 25, 50, 50);

      expect(outer.contains(inner)).toBe(true);
    });

    it('should return false when rectangles partially overlap', () => {
      const rect1 = new draw2d.geo.Rectangle(0, 0, 50, 50);
      const rect2 = new draw2d.geo.Rectangle(25, 25, 50, 50);

      expect(rect1.contains(rect2)).toBe(false);
    });

    it('should return false when rectangles do not overlap', () => {
      const rect1 = new draw2d.geo.Rectangle(0, 0, 50, 50);
      const rect2 = new draw2d.geo.Rectangle(100, 100, 50, 50);

      expect(rect1.contains(rect2)).toBe(false);
    });
  });

  describe('isInside', () => {
    it('should return true when inside larger rectangle', () => {
      const inner = new draw2d.geo.Rectangle(25, 25, 50, 50);
      const outer = new draw2d.geo.Rectangle(0, 0, 100, 100);

      expect(inner.isInside(outer)).toBe(true);
    });

    it('should return false when partially outside', () => {
      const rect1 = new draw2d.geo.Rectangle(25, 25, 50, 50);
      const rect2 = new draw2d.geo.Rectangle(0, 0, 50, 50);

      expect(rect1.isInside(rect2)).toBe(false);
    });
  });

  describe('intersects', () => {
    it('should return true for overlapping rectangles', () => {
      const rect1 = new draw2d.geo.Rectangle(0, 0, 50, 50);
      const rect2 = new draw2d.geo.Rectangle(25, 25, 50, 50);

      expect(rect1.intersects(rect2)).toBe(true);
      expect(rect2.intersects(rect1)).toBe(true);
    });

    it('should return false for non-overlapping rectangles', () => {
      const rect1 = new draw2d.geo.Rectangle(0, 0, 50, 50);
      const rect2 = new draw2d.geo.Rectangle(100, 100, 50, 50);

      expect(rect1.intersects(rect2)).toBe(false);
    });

    it('should return false for edge-touching rectangles', () => {
      const rect1 = new draw2d.geo.Rectangle(0, 0, 50, 50);
      const rect2 = new draw2d.geo.Rectangle(50, 0, 50, 50);

      expect(rect1.intersects(rect2)).toBe(false);
    });
  });

  describe('merge', () => {
    it('should expand to contain both rectangles', () => {
      const rect1 = new draw2d.geo.Rectangle(0, 0, 50, 50);
      const rect2 = new draw2d.geo.Rectangle(25, 25, 75, 75);
      rect1.merge(rect2);

      expect(rect1.x).toBe(0);
      expect(rect1.y).toBe(0);
      expect(rect1.w).toBe(100); // Should extend to right of rect2
      expect(rect1.h).toBe(100); // Should extend to bottom of rect2
    });

    it('should return self for chaining', () => {
      const rect1 = new draw2d.geo.Rectangle(0, 0, 50, 50);
      const rect2 = new draw2d.geo.Rectangle(25, 25, 75, 75);
      const result = rect1.merge(rect2);

      expect(result).toBe(rect1);
    });
  });

  describe('clone', () => {
    it('should create independent copy', () => {
      const rect1 = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const rect2 = rect1.clone();

      expect(rect2.x).toBe(10);
      expect(rect2.y).toBe(20);
      expect(rect2.w).toBe(100);
      expect(rect2.h).toBe(50);
      expect(rect2).not.toBe(rect1);

      rect2.x = 50;
      expect(rect1.x).toBe(10); // Original unchanged
    });
  });

  describe('toJSON', () => {
    it('should return serializable object', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const json = rect.toJSON();

      expect(json).toEqual({
        x: 10,
        y: 20,
        width: 100,
        height: 50
      });
    });
  });

  describe('getVertices', () => {
    it('should return corners in clockwise order starting from top-left', () => {
      const rect = new draw2d.geo.Rectangle(10, 20, 100, 50);
      const vertices = rect.getVertices();

      expect(vertices.getSize()).toBe(4);

      const tl = vertices.get(0);
      expect(tl.x).toBe(10);
      expect(tl.y).toBe(20);

      const tr = vertices.get(1);
      expect(tr.x).toBe(110);
      expect(tr.y).toBe(20);

      const br = vertices.get(2);
      expect(br.x).toBe(110);
      expect(br.y).toBe(70);

      const bl = vertices.get(3);
      expect(bl.x).toBe(10);
      expect(bl.y).toBe(70);
    });
  });

  describe('edge cases', () => {
    it('should handle negative coordinates', () => {
      const rect = new draw2d.geo.Rectangle(-10, -20, 100, 50);

      expect(rect.x).toBe(-10);
      expect(rect.y).toBe(-20);
    });

    it('should handle very large dimensions', () => {
      const rect = new draw2d.geo.Rectangle(0, 0, 1e6, 1e6);

      expect(rect.w).toBe(1000000);
      expect(rect.h).toBe(1000000);
    });

    it('should handle fractional coordinates', () => {
      const rect = new draw2d.geo.Rectangle(10.5, 20.7, 100.3, 50.8);

      expect(rect.x).toBe(10.5);
      expect(rect.y).toBe(20.7);
      expect(rect.w).toBe(100.3);
      expect(rect.h).toBe(50.8);
    });

    it('should handle negative translation', () => {
      const rect = new draw2d.geo.Rectangle(50, 50, 100, 50);
      rect.translate(-10, -20);

      expect(rect.x).toBe(40);
      expect(rect.y).toBe(30);
    });
  });
});
