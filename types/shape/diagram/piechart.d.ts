import { Figure } from '../../core/figure';

/**
 * A pie chart figure for visualizing proportional data in diagrams.
 * The pie chart can be used to display data as parts of a whole.
 */
export class PieChart extends Figure {
  /**
   * Create a new PieChart element
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
   * Set the labels for the pie segments
   *
   * @param {Array} labels Array of labels for each segment
   * @returns {this}
   */
  setLabels(labels: string[]): this;

  /**
   * Get the labels of the pie segments
   *
   * @returns {Array} The current labels
   */
  getLabels(): string[];

  /**
   * Set the colors for the pie segments
   *
   * @param {Array} colors Array of colors for each segment
   * @returns {this}
   */
  setColors(colors: string[]): this;

  /**
   * Get the colors of the pie segments
   *
   * @returns {Array} The current colors
   */
  getColors(): string[];

  /**
   * Set whether to show percentage values
   *
   * @param {Boolean} showPercentage True to show percentages, false to hide them
   * @returns {this}
   */
  setShowPercentage(showPercentage: boolean): this;

  /**
   * Check if percentages are shown
   *
   * @returns {Boolean} True if percentages are shown
   */
  getShowPercentage(): boolean;

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
