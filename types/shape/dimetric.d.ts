import { Figure } from '../core/figure';

/**
 * Dimetric projection shapes for pseudo-3D rendering
 */
export namespace dimetric {
  /**
   * A rectangle with dimetric projection
   */
  export class Rectangle extends Figure {
    /**
     * Creates a new dimetric rectangle
     * @param attr Optional attributes for the rectangle
     */
    constructor(attr?: any);

    /**
     * Set the height of the dimetric projection
     * @param height The projection height
     * @returns this
     */
    setDimDepth(height: number): this;

    /**
     * Get the height of the dimetric projection
     * @returns The projection height
     */
    getDimDepth(): number;

    /**
     * Set the angle of the dimetric projection
     * @param angle The projection angle in degrees
     * @returns this
     */
    setDimAngle(angle: number): this;

    /**
     * Get the angle of the dimetric projection
     * @returns The projection angle in degrees
     */
    getDimAngle(): number;
  }
}