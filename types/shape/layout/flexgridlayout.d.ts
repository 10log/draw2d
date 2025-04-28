import { Figure } from '../../core/figure';

/**
 * Layout manager for placing figures in a grid with flexible row and column dimensions.
 * This layout manager allows elements to span multiple columns.
 *
 * Example:
 *     10px       grow         10px
 *
 *    -----+------------------+-----
 *    |    |  <LABEL>         |    |
 *    |    |                  |    |
 *    |    |                  |    |    grow
 *    |    |                  |    |
 *    |    |                  |    |
 *    -----+------------------+-----
 */
export class FlexGridLayout extends Figure {
  /**
   * Create a new FlexGridLayout element
   *
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the width/height of a column/row.
   *
   * @param {String} grid "columns" or "rows"
   * @param {Number|String} index The index of the row/column or "all" for all rows/columns
   * @param {Number|String} width The width/height of the row/column. Can be a number or "grow" for auto-sizing
   * @returns {this}
   */
  setCellWidth(grid: string, index: number | string, width: number | string): this;

  /**
   * Return the width of the given column
   *
   * @param {Number} index The column index
   * @returns {Number|String} The width of the column
   */
  getColumnWidth(index: number): number | string;

  /**
   * Return the height of the given row
   *
   * @param {Number} index The row index
   * @returns {Number|String} The height of the row
   */
  getRowHeight(index: number): number | string;

  /**
   * Add a figure to the grid at the given coordinates
   *
   * @param {draw2d.Figure} figure The figure to add
   * @param {Number} column The column index
   * @param {Number} row The row index
   * @param {Number} [colspan] The number of columns to span
   * @param {Number} [rowspan] The number of rows to span
   * @returns {this}
   */
  add(figure: Figure, column: number, row: number, colspan?: number, rowspan?: number): this;

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
