import { Figure } from '../../core/figure';
import { Port } from '../../core/port';
import { Label } from '../../shape/basic/label';

/**
 * A State shape that can be used in state diagrams.
 * This shape has a hybrid port at the bottom for connecting states.
 */
export class State extends Figure {
  /**
   * Create a new State element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The hybrid port for connections */
  readonly port: Port;

  /** The label of the state */
  readonly label: Label;

  /**
   * Set the text for the state
   *
   * @param {String} text The new text for the state
   * @returns {this}
   */
  setText(text: string): this;

  /**
   * Get the text of the state
   *
   * @returns {String} The state text
   */
  getText(): string;

  /**
   * Create a label for the state with default styling
   *
   * @param {String} text The text for the label
   * @returns {draw2d.shape.basic.Label} The created label
   * @private
   */
  createLabel(text: string): Label;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}
