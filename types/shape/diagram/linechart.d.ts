import { Figure } from '../../core/figure';

/**
 * A line chart figure for visualizing data trends in diagrams.
 * The line chart can be used to display data over time or other continuous dimensions.
 */
export class LineChart extends Figure {
  /**
   * Create a new LineChart element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the data for the line chart
   *
   * @param {Array} data Array of data series to display
   * @returns {this}
   */
  setData(data: number[][]): this;

  /**
   * Get the current data of the line chart
   *
   * @returns {Array} The current data series
   */
  getData(): number[][];

  /**
   * Set the labels for the x-axis
   *
   * @param {Array} labels Array of labels for the x-axis points
   * @returns {this}
   */
  setLabels(labels: string[]): this;

  /**
   * Get the labels of the x-axis
   *
   * @returns {Array} The current x-axis labels
   */
  getLabels(): string[];

  /**
   * Set the colors for each line/data series
   *
   * @param {Array} colors Array of colors for each line
   * @returns {this}
   */
  setColors(colors: string[]): this;

  /**
   * Get the colors of the lines
   *
   * @returns {Array} The current colors
   */
  getColors(): string[];

  /**
   * Set whether to show data points on the lines
   *
   * @param {Boolean} showPoints True to show points, false to hide them
   * @returns {this}
   */
  setShowPoints(showPoints: boolean): this;

  /**
   * Check if data points are shown
   *
   * @returns {Boolean} True if points are shown
   */
  getShowPoints(): boolean;

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
