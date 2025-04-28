import { Figure } from '../../core/figure';

/**
 * Base class for all composite figures in draw2d.
 * Composite figures can contain other figures and provide advanced grouping capabilities.
 */
export class Composite extends Figure {
  /**
   * Creates a new composite figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Delegate method to calculate if a figure is selectable. A composite has the right to override
   * the initial selectable flag of the figure.
   *
   * @param {draw2d.Figure} figure the figure to check
   * @returns {boolean}
   */
  delegateIsSelectable(figure: Figure): boolean;

  /**
   * Returns the internal used figures for selection handling and DragDrop operations
   *
   * @returns {draw2d.util.ArrayList} the internally used figures
   */
  getAssignedFigures(): any;

  /**
   * @inheritdoc
   */
  setCanvas(canvas: any): this;

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
  setRotationAngle(angle: number): this;

  /**
   * @inheritdoc
   */
  setVisible(flag: boolean, duration?: number): this;
}
