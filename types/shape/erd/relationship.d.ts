import { Figure } from '../../core/figure';
import { Label } from '../basic/label';

/**
 * A Relationship shape for Entity-Relationship diagrams.
 * This shape represents a relationship between entities in an ER diagram.
 */
export class Relationship extends Figure {
  /**
   * Create a new Relationship element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the relationship name */
  readonly label: Label;

  /**
   * Set the name of the relationship
   *
   * @param {String} name The relationship name
   * @returns {this}
   */
  setName(name: string): this;

  /**
   * Get the name of the relationship
   *
   * @returns {String} The relationship name
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
