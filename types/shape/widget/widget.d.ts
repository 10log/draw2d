import { Figure } from '../../core/figure';

/**
 * Base class for all widget shapes.
 */
export class Widget extends Figure {
  /**
   * Creates a new widget figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}