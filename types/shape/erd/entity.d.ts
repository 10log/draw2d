import { Figure } from '../../core/figure';
import { Label } from '../basic/label';

/**
 * An Entity shape for Entity-Relationship diagrams.
 * This shape represents an entity type in an ER diagram with attributes.
 */
export class Entity extends Figure {
  /**
   * Create a new Entity element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the entity name */
  readonly nameLabel: Label;

  /** The label for the attributes section */
  readonly attributesLabel: Label;

  /**
   * Set the name of the entity
   *
   * @param {String} name The entity name
   * @returns {this}
   */
  setName(name: string): this;

  /**
   * Get the name of the entity
   *
   * @returns {String} The entity name
   */
  getName(): string;

  /**
   * Set the attributes text
   *
   * @param {String} attributes The attributes text (each attribute on a new line)
   * @returns {this}
   */
  setAttributes(attributes: string): this;

  /**
   * Get the attributes text
   *
   * @returns {String} The attributes text
   */
  getAttributes(): string;

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
