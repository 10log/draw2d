import { Point } from '../../geo';
import { Spline } from './spline';

/**
 * A Bezier spline implementation.
 * Bezier splines are commonly used in graphics applications to create smooth curves.
 */
export class BezierSpline extends Spline {
  /**
   * Creates a new Bezier spline.
   */
  constructor();

  /**
   * Create a spline based on the given control points.
   * The generated curve is influenced by the control points but doesn't necessarily
   * pass through them (except the first and last points).
   *
   * @param controlPoints Control points of spline as array of Points or as flat array [x0,y0,x1,y1,...]
   * @param parts Number of parts to divide each leg into
   * @returns Array of points on the spline
   */
  generate(controlPoints: Point[] | number[], parts: number): Point[];
}
