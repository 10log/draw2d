import { Figure } from '../../core/figure';
import { Label } from '../basic/label';

/**
 * An Actor shape for UML use case diagrams.
 * This shape represents an external user or system that interacts with the system.
 */
export class Actor extends Figure {
  /**
   * Create a new Actor element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the actor name */
  readonly label: Label;

  /**
   * Set the name of the actor
   *
   * @param {String} name The actor name
   * @returns {this}
   */
  setName(name: string): this;

  /**
   * Get the name of the actor
   *
   * @returns {String} The actor name
   */
  getName(): string;

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}
