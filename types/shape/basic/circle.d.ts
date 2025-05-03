import { Oval } from './oval';

/**
 * A circle figure with basic background and stroke API.
 * A circle cannot be stretched. The aspect ratio is always 1:1.
 */
export class Circle extends Oval {
  /**
   * Creates a new Circle
   * @param attr Optional attributes for the circle
   * @param setter Add or replace setter methods
   * @param getter Add or replace getter methods
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the diameter of the circle. The center of the circle will be retained.
   *
   * @param d The new diameter of the circle
   * @returns this
   */
  setDiameter(d: number): this;

  /**
   * Get the diameter of the circle.
   *
   * @returns The diameter of the circle
   */
  getDiameter(): number;

  /**
   * Set the radius of the circle. The center of the circle will be retained.
   *
   * @param r The new radius of the circle
   * @returns this
   */
  setRadius(r: number): this;

  /**
   * Get the radius of the circle
   *
   * @returns The radius of the circle
   */
  getRadius(): number;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;
}
