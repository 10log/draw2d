import { Figure } from '../../core/figure';
import { Label } from '../basic/label';

/**
 * A Class shape for UML class diagrams.
 * This shape represents a class with name, attributes, and methods sections.
 */
export class Class extends Figure {
  /**
   * Create a new Class element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the class name */
  readonly nameLabel: Label;

  /** The label for the attributes section */
  readonly attributesLabel: Label;

  /** The label for the methods section */
  readonly methodsLabel: Label;

  /**
   * Set the name of the class
   *
   * @param {String} name The class name
   * @returns {this}
   */
  setName(name: string): this;

  /**
   * Get the name of the class
   *
   * @returns {String} The class name
   */
  getName(): string;

  /**
   * Set the attributes text
   *
   * @param {String} attributes The attributes text
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
   * Set the methods text
   *
   * @param {String} methods The methods text
   * @returns {this}
   */
  setMethods(methods: string): this;

  /**
   * Get the methods text
   *
   * @returns {String} The methods text
   */
  getMethods(): string;

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
