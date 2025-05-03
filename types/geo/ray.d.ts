import { Point } from './point';

/**
 * Represents a vector within 2-dimensional Euclidean space.
 */
export class Ray extends Point {
  /**
   * Creates a ray object.
   *
   * @param x X-coordinate of the ray
   * @param y Y-coordinate of the ray
   */
  constructor(x: number, y: number);

  /**
   * Determines if this ray has a horizontal component.
   * @returns True if the ray has a horizontal component (x != 0)
   */
  isHorizontal(): boolean;

  /**
   * Calculates the similarity between this ray and another ray.
   *
   * @param otherRay The ray to compare with
   * @returns The absolute value of the dot product between the rays
   */
  similarity(otherRay: Ray): number;

  /**
   * Creates a new ray that is the average of this ray and another ray.
   *
   * @param otherRay The ray to average with
   * @returns A new ray with coordinates that are the average of this ray and the other ray
   */
  getAveraged(otherRay: Ray): Ray;
}
