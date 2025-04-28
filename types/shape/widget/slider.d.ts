import { Figure } from '../../core/figure';

/**
 * A slider widget for interactive diagrams.
 * The slider can be used to provide interactive control over values
 * in a diagram.
 */
export class Slider extends Figure {
  /**
   * Create a new Slider element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the minimum value of the slider
   *
   * @param {Number} value The minimum value
   * @returns {this}
   */
  setMinValue(value: number): this;

  /**
   * Get the minimum value of the slider
   *
   * @returns {Number} The minimum value
   */
  getMinValue(): number;

  /**
   * Set the maximum value of the slider
   *
   * @param {Number} value The maximum value
   * @returns {this}
   */
  setMaxValue(value: number): this;

  /**
   * Get the maximum value of the slider
   *
   * @returns {Number} The maximum value
   */
  getMaxValue(): number;

  /**
   * Set the current value of the slider
   *
   * @param {Number} value The current value
   * @param {Boolean} [silent] True to not fire an event
   * @returns {this}
   */
  setValue(value: number, silent?: boolean): this;

  /**
   * Get the current value of the slider
   *
   * @returns {Number} The current value
   */
  getValue(): number;

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
