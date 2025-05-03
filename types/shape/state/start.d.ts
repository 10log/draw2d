import { Circle } from '../basic/circle';
import { Port } from '../../core/port';

/**
 * A start state in a state diagram.
 */
export class Start extends Circle {
  /**
   * Creates a new start state figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * The output port for transitions
   */
  readonly output: Port;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}