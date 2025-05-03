import { Figure } from '../../core/figure';

/**
 * Base class for all layout shapes.
 */
export class Layout extends Figure {
  /**
   * Creates a new layout figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set padding for the layout
   * @param {number} padding The padding value
   * @returns {this}
   */
  setPadding(padding: number): this;

  /**
   * Get the current padding
   * @returns {number} The current padding
   */
  getPadding(): number;

  /**
   * Add a figure to the layout
   * @param {Figure} figure The figure to add
   * @returns {this}
   */
  add(figure: Figure): this;

  /**
   * Remove a figure from the layout
   * @param {Figure} figure The figure to remove
   * @returns {this}
   */
  remove(figure: Figure): this;

  /**
   * @inheritdoc
   */
  getMinWidth(): number;

  /**
   * @inheritdoc
   */
  getMinHeight(): number;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}