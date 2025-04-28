import { Point } from '../../geo';

/**
 * An abstract class defining a general spline object.
 */
export abstract class Spline {
  /**
   * Create a new spline.
   */
  constructor();

  /**
   * Create a spline based on the given control points.
   * The generated curve starts in the first control point and ends
   * in the last control point.
   *
   * @param controlPoints Control points of spline as array of Points or as flat array [x0,y0,x1,y1,...]
   * @param parts Number of parts to divide each leg into
   * @returns Array of points on the spline
   */
  abstract generate(controlPoints: Point[] | number[], parts: number): Point[];
}
