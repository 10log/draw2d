import { Point } from '../../geo';
import { Spline } from './spline';

/**
 * A Cubic spline implementation.
 * Cubic splines are piecewise cubic polynomials that pass through all control points
 * with continuous first and second derivatives at the control points.
 */
export class CubicSpline extends Spline {
  /**
   * Creates a new Cubic spline.
   */
  constructor();

  /**
   * Create a spline based on the given control points.
   * The generated curve passes through all control points with smooth transitions.
   *
   * @param controlPoints Control points of spline as array of Points or as flat array [x0,y0,x1,y1,...]
   * @param parts Number of parts to divide each leg into
   * @returns Array of points on the spline
   */
  generate(controlPoints: Point[] | number[], parts: number): Point[];
}