import { Figure } from '../../core/figure';

/**
 * A pie chart figure for visualizing data in diagrams.
 * The pie chart can be used to display proportional data.
 */
export class Pie extends Figure {
  /**
   * Create a new Pie chart element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the data for the pie chart
   *
   * @param {Array} data Array of data values to display
   * @returns {this}
   */
  setData(data: number[]): this;

  /**
   * Get the current data of the pie chart
   *
   * @returns {Array} The current data values
   */
  getData(): number[];

  /**
   * Set the colors for the pie chart slices
   *
   * @param {Array} colors Array of colors for the slices
   * @returns {this}
   */
  setColors(colors: string[]): this;

  /**
   * Get the colors of the pie chart slices
   *
   * @returns {Array} The current colors
   */
  getColors(): string[];

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
