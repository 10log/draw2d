import { Figure } from '../../core/figure';

/**
 * A layout manager that arranges elements in a horizontal row.
 * Elements are arranged from left to right in the order they are added.
 *
 * The layout manager respects the alignment (top, middle, bottom) of the children
 * figures.
 */
export class HorizontalLayout extends Figure {
  /**
   * Create a new HorizontalLayout element
   *
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Add a figure to the right side of the layout
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
