import { Point } from './point';

/**
 * A Rectangle is the description of an area with a upper left and lower right corner.
 */
export class Rectangle {
  /**
   * Creates a new rectangle
   * @param x The x coordinate of the upper left corner
   * @param y The y coordinate of the upper left corner
   * @param w The width of the rectangle
   * @param h The height of the rectangle
   */
  constructor(x?: number, y?: number, w?: number, h?: number);

  /** The x coordinate of the upper left corner */
  x: number;

  /** The y coordinate of the upper left corner */
  y: number;

  /** The width of the rectangle */
  w: number;

  /** The height of the rectangle */
  h: number;

  /**
   * Returns a copy of this rectangle
   * @returns A copy of this rectangle
   */
  clone(): Rectangle;

  /**
   * Moves this rectangle horizontally by dx and vertically by dy
   * @param dx The horizontal translation
   * @param dy The vertical translation
   * @returns this
   */
  translate(dx: number, dy: number): this;

  /**
   * Resizes this rectangle by the given values
   * @param dw The width change
   * @param dh The height change
   * @returns this
   */
  resize(dw: number, dh: number): this;

  /**
   * Scale this rectangle by the given factor
   * @param factor The scale factor
   * @returns this
   */
  scale(factor: number): this;

  /**
   * Returns the top-left corner of the rectangle
   * @returns The top-left corner point
   */
  getTopLeft(): Point;

  /**
   * Returns the top-right corner of the rectangle
   * @returns The top-right corner point
   */
  getTopRight(): Point;

  /**
   * Returns the bottom-left corner of the rectangle
   * @returns The bottom-left corner point
   */
  getBottomLeft(): Point;

  /**
   * Returns the bottom-right corner of the rectangle
   * @returns The bottom-right corner point
   */
  getBottomRight(): Point;

  /**
   * Returns the center of the rectangle
   * @returns The center point
   */
  getCenter(): Point;

  /**
   * Returns the width of the rectangle
   * @returns The width
   */
  getWidth(): number;

  /**
   * Returns the height of the rectangle
   * @returns The height
   */
  getHeight(): number;

  /**
   * Set the top/left corner of the rectangle
   * @param x The new x coordinate
   * @param y The new y coordinate
   * @returns this
   */
  setPosition(x: number, y: number): this;

  /**
   * Returns true if the rectangle contains the given point
   * @param iX The x coordinate to test
   * @param iY The y coordinate to test
   * @returns True if the point is inside
   */
  hitTest(iX: number, iY: number): boolean;

  /**
   * Returns a point which is the nearest point to the given point on this rectangle border
   * @param px The reference point
   * @param py The reference point
   * @returns The nearest point on this rectangle
   */
  getNearestPointOnBorder(px: number, py: number): Point;

  /**
   * Get a direction vector from this rectangle to the given point
   * @param p The reference point
   * @returns A normalized direction vector
   */
  getDirection(p: Point): Point;

  /**
   * Creates a rectangle which is the bounding box of this rectangle and the given one
   * @param other The other rectangle
   * @returns The new merged bounding box
   */
  merge(other: Rectangle): Rectangle;

  /**
   * Returns the rectangle which is the intersection of this rectangle and the given one
   * @param other The other rectangle
   * @returns The new rectangle or null if the rectangles don't intersect
   */
  getIntersection(other: Rectangle): Rectangle | null;

  /**
   * Returns true if the rectangles intersects each other
   * @param other The other rectangle to test
   * @returns True if the rectangles intersect
   */
  intersects(other: Rectangle): boolean;

  /**
   * Returns true if the other rectangle is contained in this rectangle
   * @param other The other rectangle to test
   * @returns True if the other rectangle is contained
   */
  contains(other: Rectangle): boolean;

  /**
   * Compares two rectangles for equality
   * @param o The other rectangle
   * @returns True if equal
   */
  equals(o: Rectangle): boolean;

  /**
   * Returns a string representation of the rectangle
   * @returns The string representation
   */
  toString(): string;
}
