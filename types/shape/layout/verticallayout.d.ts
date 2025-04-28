import { Figure } from '../../core/figure';

/**
 * A layout manager that arranges elements in a vertical column.
 * Elements are arranged from top to bottom in the order they are added.
 *
 * The layout manager respects the alignment (center, left, right) of the children
 * figures.
 */
export class VerticalLayout extends Figure {
  /**
   * Create a new VerticalLayout element
   *
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Add a figure to the bottom of the layout
   *
   * @param {draw2d.Figure} figure The figure to add
   * @returns {this}
   */
  add(figure: Figure): this;

  /**
   * Add a figure after the given index
   *
   * @param {draw2d.Figure} figure The figure to add
   * @param {Number} index The index where to insert the figure
   * @returns {this}
   */
  insertAt(figure: Figure, index: number): this;

  /**
   * Replace a figure at the given index with another figure
   *
   * @param {draw2d.Figure} figure The figure to add
   * @param {Number} index The index of the figure to replace
   * @returns {this}
   */
  setAt(figure: Figure, index: number): this;

  /**
   * Remove a figure from the layout at the given index
   *
   * @param {Number} index The index of the figure to remove
   * @returns {this}
   */
  removeAt(index: number): this;

  /**
   * Get the minimum dimension of the layout
   *
   * @returns {Object} {width, height} The minimum dimension
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
