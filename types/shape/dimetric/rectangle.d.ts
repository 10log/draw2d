import { VectorFigure } from '../../core/vectorfigure';

/**
 * A dimetric projection rectangle.
 */
export class Rectangle extends VectorFigure {
  /**
   * Creates a new dimetric rectangle figure
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