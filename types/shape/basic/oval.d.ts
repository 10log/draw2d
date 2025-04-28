import { VectorFigure } from '../../core/vectorfigure';
import { Point } from '../../geo/point';
import { ArrayList } from '../../util/arraylist';

/**
 * Oval figure.
 */
export class Oval extends VectorFigure {
  /**
   * Creates a new Oval
   * @param attr Optional attributes for the oval
   * @param setter Add or replace setter methods
   * @param getter Add or replace getter methods
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * @inheritdoc
   */
  applyTransformation(): this;

  /**
   * Get the center of the figure
   * @returns The center point of the oval
   */
  getCenter(): Point;

  /**
   * Set the center of the figure.
   *
   * @param x The new x coordinate of the center or a Point object with the center
   * @param y The y coordinate of the new center (if first argument isn't a Point object)
   * @returns this
   */
  setCenter(x: number | Point, y?: number): this;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;

  /**
   * Calculate the intersection points of a line with this oval
   *
   * @param a1 The start point of the line
   * @param a2 The end point of the line
   * @returns A list of intersection points
   */
  intersectionWithLine(a1: Point, a2: Point): ArrayList<Point>;
}
