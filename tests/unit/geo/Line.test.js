/**
 * Unit tests for draw2d.geo.Line utility
 *
 * Note: draw2d.geo.Line is a utility object with static methods,
 * not a class like Point or Rectangle.
 */

describe('draw2d.geo.Line', () => {
  let draw2d;

  beforeAll(() => {
    // Load the built library
    draw2d = require('../../../dist/draw2d.js');
  });

  it('should have Line utility object defined', () => {
    expect(draw2d.geo.Line).toBeDefined();
    expect(typeof draw2d.geo.Line).toBe('object');
  });

  describe('distance', () => {
    it('should calculate distance from point to horizontal line', () => {
      // Line from (0,0) to (10,0), point at (5,5)
      const dist = draw2d.geo.Line.distance(0, 0, 10, 0, 5, 5);

      expect(dist).toBe(5); // Perpendicular distance
    });

    it('should calculate distance from point to vertical line', () => {
      // Line from (0,0) to (0,10), point at (5,5)
      const dist = draw2d.geo.Line.distance(0, 0, 0, 10, 5, 5);

      expect(dist).toBe(5); // Perpendicular distance
    });

    it('should calculate distance from point to diagonal line', () => {
      // Line from (0,0) to (10,10), point at (10,0)
      const dist = draw2d.geo.Line.distance(0, 0, 10, 10, 10, 0);

      // For 45-degree line, perpendicular distance from (10,0) is 10/sqrt(2) ≈ 7.07
      expect(dist).toBeCloseTo(7.071, 2);
    });

    it('should return 0 for point on the line', () => {
      // Line from (0,0) to (10,10), point at (5,5)
      const dist = draw2d.geo.Line.distance(0, 0, 10, 10, 5, 5);

      expect(dist).toBeCloseTo(0, 5);
    });

    it('should calculate distance to line start point', () => {
      // Line from (0,0) to (10,0), point at (0,5)
      const dist = draw2d.geo.Line.distance(0, 0, 10, 0, 0, 5);

      expect(dist).toBe(5);
    });

    it('should calculate distance to line end point', () => {
      // Line from (0,0) to (10,0), point at (10,5)
      const dist = draw2d.geo.Line.distance(0, 0, 10, 0, 10, 5);

      expect(dist).toBe(5);
    });

    it('should calculate distance when point is beyond line start', () => {
      // Line from (5,5) to (10,5), point at (0,0)
      const dist = draw2d.geo.Line.distance(5, 5, 10, 5, 0, 0);

      // Distance from (0,0) to (5,5) = sqrt(50) ≈ 7.07
      expect(dist).toBeCloseTo(7.071, 2);
    });

    it('should calculate distance when point is beyond line end', () => {
      // Line from (0,0) to (5,0), point at (10,0)
      const dist = draw2d.geo.Line.distance(0, 0, 5, 0, 10, 0);

      // Distance from (10,0) to (5,0) = 5
      expect(dist).toBe(5);
    });

    it('should handle negative coordinates', () => {
      // Line from (-5,-5) to (5,5), point at (0,10)
      const dist = draw2d.geo.Line.distance(-5, -5, 5, 5, 0, 10);

      // Should calculate correctly with negative coords
      expect(dist).toBeCloseTo(7.071, 2);
    });

    it('should handle zero-length line segment', () => {
      // Degenerate line (point) at (5,5), test point at (8,9)
      const dist = draw2d.geo.Line.distance(5, 5, 5, 5, 8, 9);

      // Distance from (5,5) to (8,9) = sqrt(9+16) = 5
      expect(dist).toBe(5);
    });
  });

  describe('pointProjection', () => {
    it('should project point onto horizontal line', () => {
      // Line from (0,0) to (10,0), point at (5,5)
      const proj = draw2d.geo.Line.pointProjection(0, 0, 10, 0, 5, 5);

      expect(proj).not.toBeNull();
      expect(proj.x).toBe(5);
      expect(proj.y).toBe(0);
    });

    it('should project point onto vertical line', () => {
      // Line from (0,0) to (0,10), point at (5,5)
      const proj = draw2d.geo.Line.pointProjection(0, 0, 0, 10, 5, 5);

      expect(proj).not.toBeNull();
      expect(proj.x).toBe(0);
      expect(proj.y).toBe(5);
    });

    it('should project point onto diagonal line', () => {
      // Line from (0,0) to (10,10), point at (10,0)
      const proj = draw2d.geo.Line.pointProjection(0, 0, 10, 10, 10, 0);

      expect(proj).not.toBeNull();
      expect(proj.x).toBeCloseTo(5, 1);
      expect(proj.y).toBeCloseTo(5, 1);
    });

    it('should return null when projection is beyond line start', () => {
      // Line from (5,5) to (10,10), point at (0,0)
      const proj = draw2d.geo.Line.pointProjection(5, 5, 10, 10, 0, 0);

      expect(proj).toBeNull();
    });

    it('should return null when projection is beyond line end', () => {
      // Line from (0,0) to (5,5), point at (10,10)
      const proj = draw2d.geo.Line.pointProjection(0, 0, 5, 5, 10, 10);

      expect(proj).toBeNull();
    });

    it('should project point at line start', () => {
      // Line from (0,0) to (10,10), point at (0,0)
      const proj = draw2d.geo.Line.pointProjection(0, 0, 10, 10, 0, 0);

      expect(proj).not.toBeNull();
      expect(proj.x).toBe(0);
      expect(proj.y).toBe(0);
    });

    it('should project point at line end', () => {
      // Line from (0,0) to (10,10), point at (10,10)
      const proj = draw2d.geo.Line.pointProjection(0, 0, 10, 10, 10, 10);

      expect(proj).not.toBeNull();
      expect(proj.x).toBe(10);
      expect(proj.y).toBe(10);
    });

    it('should project point at line midpoint', () => {
      // Line from (0,0) to (10,0), point at (5,3)
      const proj = draw2d.geo.Line.pointProjection(0, 0, 10, 0, 5, 3);

      expect(proj).not.toBeNull();
      expect(proj.x).toBeCloseTo(5, 5);
      expect(proj.y).toBeCloseTo(0, 5);
    });

    it('should handle negative coordinates', () => {
      // Line from (-10,-10) to (10,10), point at (0,5)
      const proj = draw2d.geo.Line.pointProjection(-10, -10, 10, 10, 0, 5);

      expect(proj).not.toBeNull();
      expect(proj.x).toBeCloseTo(2.5, 1);
      expect(proj.y).toBeCloseTo(2.5, 1);
    });
  });

  describe('inverseLerp', () => {
    it('should return 0 for point at line start', () => {
      // Line from (0,0) to (10,10), point at (10,10)
      const t = draw2d.geo.Line.inverseLerp(0, 0, 10, 10, 10, 10);

      expect(t).toBe(0);
    });

    it('should return 1 for point at line end', () => {
      // Line from (0,0) to (10,10), point at (0,0)
      const t = draw2d.geo.Line.inverseLerp(0, 0, 10, 10, 0, 0);

      expect(t).toBe(1);
    });

    it('should return 0.5 for point at line midpoint', () => {
      // Horizontal line from (0,0) to (10,0), point at (5,0)
      const t = draw2d.geo.Line.inverseLerp(0, 0, 10, 0, 5, 0);

      expect(t).toBe(0.5);
    });

    it('should calculate position on horizontal line', () => {
      // Line from (0,0) to (10,0), point at (3,0)
      const t = draw2d.geo.Line.inverseLerp(0, 0, 10, 0, 3, 0);

      expect(t).toBeCloseTo(0.7, 1);
    });

    it('should calculate position on vertical line', () => {
      // Line from (0,0) to (0,10), point at (0,3)
      const t = draw2d.geo.Line.inverseLerp(0, 0, 0, 10, 0, 3);

      expect(t).toBeCloseTo(0.7, 1);
    });

    it('should calculate position on diagonal line', () => {
      // Line from (0,0) to (10,10), point at (2,2)
      const t = draw2d.geo.Line.inverseLerp(0, 0, 10, 10, 2, 2);

      expect(t).toBeCloseTo(0.8, 1);
    });

    it('should handle zero-length line', () => {
      // Degenerate line at (5,5), test point at (5,5)
      const t = draw2d.geo.Line.inverseLerp(5, 5, 5, 5, 5, 5);

      expect(t).toBe(1); // Returns 1 for zero-length line
    });

    it('should handle negative coordinates', () => {
      // Line from (-10,0) to (10,0), point at (0,0)
      const t = draw2d.geo.Line.inverseLerp(-10, 0, 10, 0, 0, 0);

      expect(t).toBe(0.5);
    });

    it('should handle line with only Y change', () => {
      // Vertical line from (5,0) to (5,20), point at (5,5)
      const t = draw2d.geo.Line.inverseLerp(5, 0, 5, 20, 5, 5);

      expect(t).toBe(0.75);
    });

    it('should handle fractional coordinates', () => {
      // Line from (0,0) to (10.5,0), point at (5.25,0)
      const t = draw2d.geo.Line.inverseLerp(0, 0, 10.5, 0, 5.25, 0);

      expect(t).toBe(0.5);
    });
  });

  describe('edge cases', () => {
    it('should handle very small line segments', () => {
      const dist = draw2d.geo.Line.distance(0, 0, 0.001, 0.001, 1, 1);

      expect(dist).toBeGreaterThan(0);
    });

    it('should handle very large coordinates', () => {
      const dist = draw2d.geo.Line.distance(0, 0, 1e6, 1e6, 1e6, 0);

      expect(dist).toBeGreaterThan(0);
    });

    it('should handle collinear point outside segment', () => {
      // Line from (0,0) to (5,0), point at (10,0) (collinear but beyond)
      const proj = draw2d.geo.Line.pointProjection(0, 0, 5, 0, 10, 0);

      expect(proj).toBeNull(); // Beyond segment
    });

    it('should handle perpendicular projection at boundary', () => {
      // Line from (0,0) to (10,0), point at (10,5)
      const proj = draw2d.geo.Line.pointProjection(0, 0, 10, 0, 10, 5);

      expect(proj).not.toBeNull();
      expect(proj.x).toBe(10);
      expect(proj.y).toBe(0);
    });
  });
});
