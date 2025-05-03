import { Figure } from '../../core/figure';

/**
 * A bar chart figure for visualizing data in diagrams.
 * The bar chart can be used to display comparative data.
 */
export class BarChart extends Figure {
  /**
   * Create a new BarChart element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the data for the bar chart
   *
   * @param {Array} data Array of data values to display
   * @returns {this}
   */
  setData(data: number[]): this;

  /**
   * Get the current data of the bar chart
   *
   * @returns {Array} The current data values
   */
  getData(): number[];

  /**
   * Set the labels for the bar chart
   *
   * @param {Array} labels Array of labels for each bar
   * @returns {this}
   */
  setLabels(labels: string[]): this;

  /**
   * Get the labels of the bar chart
   *
   * @returns {Array} The current labels
   */
  getLabels(): string[];

  /**
   * Set the colors for the bars
   *
   * @param {Array} colors Array of colors for the bars
   * @returns {this}
   */
  setColors(colors: string[]): this;

  /**
   * Get the colors of the bars
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
