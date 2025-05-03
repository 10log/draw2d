import { Layout } from './layout';
import { Figure } from '../../core/figure';

/**
 * A table layout shape to arrange figures in a grid.
 */
export class TableLayout extends Layout {
  /**
   * Creates a new table layout figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Add a figure to the layout at the specified position
   * @param {Figure} figure The figure to add
   * @param {number} row The row index
   * @param {number} column The column index
   * @param {Object} [options] Additional options like colSpan, rowSpan
   * @returns {this}
   */
  add(figure: Figure, row: number, column: number, options?: any): this;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}