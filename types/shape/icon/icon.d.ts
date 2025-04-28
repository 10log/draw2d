import { SetFigure } from '../../setfigure';

/**
 * Base class for all icon shapes.
 */
export class Icon extends SetFigure {
  /**
   * Creates a new icon element which is not assigned to any canvas.
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Creates the path for the specific icon
   * @private
   * @returns {Object} the raphaelJS path object
   */
  createSet(): any;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;

  /**
   * @inheritdoc
   */
  applyTransformation(): this;
}
