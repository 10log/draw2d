import { Figure } from '../../core/figure';
import { Label } from '../basic/label';

/**
 * A UseCase shape for UML use case diagrams.
 * This shape represents a function or service provided by the system.
 */
export class UseCase extends Figure {
  /**
   * Create a new UseCase element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the use case name */
  readonly label: Label;

  /**
   * Set the name of the use case
   *
   * @param {String} name The use case name
   * @returns {this}
   */
  setName(name: string): this;

  /**
   * Get the name of the use case
   *
   * @returns {String} The use case name
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
