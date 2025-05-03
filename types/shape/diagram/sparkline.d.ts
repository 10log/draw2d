import { Figure } from '../../core/figure';

/**
 * A sparkline chart figure for visualizing data trends.
 * Sparklines are small, high-density line charts without axes or coordinates.
 */
export class Sparkline extends Figure {
  /**
   * Create a new Sparkline element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the data for the sparkline
   *
   * @param {Array} data Array of data values to display
   * @returns {this}
   */
  setData(data: number[]): this;

  /**
   * Get the current data of the sparkline
   *
   * @returns {Array} The current data values
   */
  getData(): number[];

  /**
   * Set the min/max range for the sparkline
   *
   * @param {number} min The minimum value
   * @param {number} max The maximum value
   * @returns {this}
   */
  setRange(min: number, max: number): this;

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}