import { Point } from './point';

/**
 * Geometric utility functions used in ray, point and some routers.
 */
export namespace Util {
  /**
   * Calculates a new point that is inset along a line by a specified distance from the start point.
   *
   * @param start Start point of a line
   * @param end End point of a line
   * @param distanceFromStart Distance from the start point to extrapolate a new point
   * @returns A new point with the distance *distanceFromStart* from the start point
   */
  function insetPoint(start: Point, end: Point, distanceFromStart: number): { x: number, y: number };
}
