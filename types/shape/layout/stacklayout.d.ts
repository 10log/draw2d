import { Layout } from './layout';
import { Figure } from '../../core/figure';

/**
 * A stack layout shape to stack figures on top of each other.
 */
export class StackLayout extends Layout {
  /**
   * Creates a new stack layout figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Add a figure to the stack
   * @param {Figure} figure The figure to add
   * @param {Object} [options] Additional options
   * @returns {this}
   */
  add(figure: Figure, options?: any): this;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}