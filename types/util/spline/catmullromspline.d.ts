import { Point } from '../../geo';
import { Spline } from './spline';

/**
 * A Catmull-Rom spline implementation.
 * A Catmull-Rom is a kind of interpolating spline that passes smoothly
 * through all control points.
 */
export class CatmullRomSpline extends Spline {
  /**
   * Creates a new Catmull-Rom spline.
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
  generate(controlPoints: Point[] | number[], parts: number): Point[];
}