/**
 * Unit tests for Line intersection calculations
 *
 * Tests the draw2d.shape.basic.Line.intersection() static method
 * which calculates intersection points between two line segments.
 */

describe('draw2d.shape.basic.Line Intersection', () => {
  let draw2d;

  beforeAll(() => {
    draw2d = require('../../../dist/draw2d.js');
  });

  describe('Static intersection method', () => {
    it('should find intersection of crossing lines', () => {
      const a1 = new draw2d.geo.Point(0, 0);
      const a2 = new draw2d.geo.Point(100, 100);
      const b1 = new draw2d.geo.Point(0, 100);
      const b2 = new draw2d.geo.Point(100, 0);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).not.toBeNull();
      expect(intersection.x).toBeCloseTo(50, 0);
      expect(intersection.y).toBeCloseTo(50, 0);
    });

    it('should return null for parallel lines', () => {
      const a1 = new draw2d.geo.Point(0, 0);
      const a2 = new draw2d.geo.Point(100, 0);
      const b1 = new draw2d.geo.Point(0, 10);
      const b2 = new draw2d.geo.Point(100, 10);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).toBeNull();
    });

    it('should return null for non-intersecting segments', () => {
      const a1 = new draw2d.geo.Point(0, 0);
      const a2 = new draw2d.geo.Point(10, 10);
      const b1 = new draw2d.geo.Point(20, 0);
      const b2 = new draw2d.geo.Point(30, 10);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).toBeNull();
    });

    it('should find intersection at endpoint', () => {
      const a1 = new draw2d.geo.Point(0, 0);
      const a2 = new draw2d.geo.Point(100, 0);
      const b1 = new draw2d.geo.Point(100, 0);
      const b2 = new draw2d.geo.Point(100, 100);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).not.toBeNull();
      expect(intersection.x).toBe(100);
      expect(intersection.y).toBe(0);
    });

    it('should mark endpoint intersection as justTouching', () => {
      const a1 = new draw2d.geo.Point(0, 0);
      const a2 = new draw2d.geo.Point(100, 0);
      const b1 = new draw2d.geo.Point(100, 0);
      const b2 = new draw2d.geo.Point(100, 100);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).not.toBeNull();
      expect(intersection.justTouching).toBe(true);
    });

    it('should mark crossing intersection as not justTouching', () => {
      const a1 = new draw2d.geo.Point(0, 0);
      const a2 = new draw2d.geo.Point(100, 100);
      const b1 = new draw2d.geo.Point(0, 100);
      const b2 = new draw2d.geo.Point(100, 0);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).not.toBeNull();
      expect(intersection.justTouching).toBe(false);
    });

    it('should find intersection of perpendicular lines', () => {
      const a1 = new draw2d.geo.Point(50, 0);
      const a2 = new draw2d.geo.Point(50, 100);
      const b1 = new draw2d.geo.Point(0, 50);
      const b2 = new draw2d.geo.Point(100, 50);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).not.toBeNull();
      expect(intersection.x).toBe(50);
      expect(intersection.y).toBe(50);
    });
  });

  describe('Line instance intersection method', () => {
    it('should find intersections between two lines', () => {
      const line1 = new draw2d.shape.basic.Line();
      const line2 = new draw2d.shape.basic.Line();

      line1.setStartPoint(0, 0);
      line1.setEndPoint(100, 100);
      line2.setStartPoint(0, 100);
      line2.setEndPoint(100, 0);

      const intersections = line1.intersection(line2);

      expect(intersections).toBeDefined();
      expect(intersections.getSize()).toBeGreaterThan(0);
    });

    it('should return empty list for same line', () => {
      const line1 = new draw2d.shape.basic.Line();

      line1.setStartPoint(0, 0);
      line1.setEndPoint(100, 100);

      const intersections = line1.intersection(line1);

      expect(intersections).toBeDefined();
      expect(intersections.getSize()).toBe(0);
    });

    it('should return empty list for non-intersecting lines', () => {
      const line1 = new draw2d.shape.basic.Line();
      const line2 = new draw2d.shape.basic.Line();

      line1.setStartPoint(0, 0);
      line1.setEndPoint(10, 10);
      line2.setStartPoint(20, 20);
      line2.setEndPoint(30, 30);

      const intersections = line1.intersection(line2);

      expect(intersections).toBeDefined();
      expect(intersections.getSize()).toBe(0);
    });

    it('should return empty list for parallel lines', () => {
      const line1 = new draw2d.shape.basic.Line();
      const line2 = new draw2d.shape.basic.Line();

      line1.setStartPoint(0, 0);
      line1.setEndPoint(100, 0);
      line2.setStartPoint(0, 10);
      line2.setEndPoint(100, 10);

      const intersections = line1.intersection(line2);

      expect(intersections).toBeDefined();
      expect(intersections.getSize()).toBe(0);
    });
  });

  describe('Complex intersection scenarios', () => {
    it('should handle T-intersection', () => {
      const a1 = new draw2d.geo.Point(0, 50);
      const a2 = new draw2d.geo.Point(100, 50);
      const b1 = new draw2d.geo.Point(50, 0);
      const b2 = new draw2d.geo.Point(50, 50);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).not.toBeNull();
      expect(intersection.x).toBe(50);
      expect(intersection.y).toBe(50);
      expect(intersection.justTouching).toBe(true);
    });

    it('should handle diagonal crossing', () => {
      const a1 = new draw2d.geo.Point(0, 0);
      const a2 = new draw2d.geo.Point(100, 50);
      const b1 = new draw2d.geo.Point(0, 50);
      const b2 = new draw2d.geo.Point(100, 0);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).not.toBeNull();
      expect(intersection).toBeDefined();
    });

    it('should handle near-parallel lines', () => {
      const a1 = new draw2d.geo.Point(0, 0);
      const a2 = new draw2d.geo.Point(100, 0);
      const b1 = new draw2d.geo.Point(0, 1);
      const b2 = new draw2d.geo.Point(100, 2);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).toBeNull();
    });

    it('should handle vertical line intersection', () => {
      const a1 = new draw2d.geo.Point(50, 0);
      const a2 = new draw2d.geo.Point(50, 100);
      const b1 = new draw2d.geo.Point(0, 50);
      const b2 = new draw2d.geo.Point(100, 50);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).not.toBeNull();
      expect(intersection.x).toBe(50);
      expect(intersection.y).toBe(50);
    });

    it('should handle horizontal line intersection', () => {
      const a1 = new draw2d.geo.Point(0, 50);
      const a2 = new draw2d.geo.Point(100, 50);
      const b1 = new draw2d.geo.Point(50, 0);
      const b2 = new draw2d.geo.Point(50, 100);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).not.toBeNull();
      expect(intersection.x).toBe(50);
      expect(intersection.y).toBe(50);
    });
  });

  describe('Edge cases', () => {
    it('should handle zero-length segments', () => {
      const a1 = new draw2d.geo.Point(50, 50);
      const a2 = new draw2d.geo.Point(50, 50);
      const b1 = new draw2d.geo.Point(0, 0);
      const b2 = new draw2d.geo.Point(100, 100);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      // Zero-length segment should be handled
      expect(intersection).toBeDefined();
    });

    it('should handle negative coordinates', () => {
      const a1 = new draw2d.geo.Point(-100, -100);
      const a2 = new draw2d.geo.Point(100, 100);
      const b1 = new draw2d.geo.Point(-100, 100);
      const b2 = new draw2d.geo.Point(100, -100);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).not.toBeNull();
      expect(intersection.x).toBe(0);
      expect(intersection.y).toBe(0);
    });

    it('should handle large coordinates', () => {
      const a1 = new draw2d.geo.Point(0, 0);
      const a2 = new draw2d.geo.Point(10000, 10000);
      const b1 = new draw2d.geo.Point(0, 10000);
      const b2 = new draw2d.geo.Point(10000, 0);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).not.toBeNull();
      expect(intersection.x).toBeCloseTo(5000, 0);
      expect(intersection.y).toBeCloseTo(5000, 0);
    });

    it('should handle very close endpoints', () => {
      const a1 = new draw2d.geo.Point(0, 0);
      const a2 = new draw2d.geo.Point(100, 100);
      const b1 = new draw2d.geo.Point(100, 100);
      const b2 = new draw2d.geo.Point(200, 100);

      const intersection = draw2d.shape.basic.Line.intersection(a1, a2, b1, b2);

      expect(intersection).not.toBeNull();
      expect(intersection.justTouching).toBe(true);
    });
  });
});
