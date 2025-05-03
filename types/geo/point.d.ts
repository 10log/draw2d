/**
 * A Point represents a location in (x,y) coordinate space.
 */
export class Point {
  /**
   * Creates a new Point object
   * @param x The x coordinate
   * @param y The y coordinate
   */
  constructor(x?: number, y?: number);

  /** The x coordinate */
  x: number;

  /** The y coordinate */
  y: number;

  /**
   * Creates a copy of this Point
   * @returns A copy of this point
   */
  clone(): Point;

  /**
   * Get a copy of this point with negated coordinates
   * @returns A new point with negated coordinates
   */
  negate(): Point;

  /**
   * Translate this point by the given dx, dy values
   * @param dx The x translation
   * @param dy The y translation
   * @returns this
   */
  translate(dx: number, dy: number): this;

  /**
   * Scale the point by the given factor
   * @param factor The scale factor
   * @returns this
   */
  scale(factor: number): this;

  /**
   * Calculate the distance between this point and another point
   * @param other The other point
   * @returns The distance
   */
  getDistance(other: Point): number;

  /**
   * Compare this point with another
   * @param other The other point
   * @returns True if equal
   */
  equals(other: Point): boolean;

  /**
   * Calculate the distance to another point
   * @param other The other point
   * @returns The linear distance
   */
  getDistance(other: Point): number;

  /**
   * Calculate the determinant of the two points
   * @param other The other point
   * @returns The determinant value
   */
  determinant(other: Point): number;

  /**
   * Returns a string representation of this point
   * @returns String representation
   */
  toString(): string;
}
