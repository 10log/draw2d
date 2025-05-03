import { Circle } from '../basic/circle';
import { Port } from '../../core/port';

/**
 * An end state in a state diagram.
 */
export class End extends Circle {
  /**
   * Creates a new end state figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * The input port for transitions
   */
  readonly input: Port;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}