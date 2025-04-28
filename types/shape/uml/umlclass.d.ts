import { Figure } from '../../core/figure';
import { Label } from '../basic/label';
import { Port } from '../../core/port';

/**
 * A UML Class shape for class diagrams.
 * This shape represents a class in UML class diagrams with name, attributes and methods.
 */
export class UmlClass extends Figure {
  /**
   * Create a new UML Class element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the class name */
  readonly nameLabel: Label;

  /** The label for displaying attributes */
  readonly attributesLabel: Label;

  /** The label for displaying methods */
  readonly methodsLabel: Label;

  /** Available ports for connections */
  readonly ports: Port[];

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
   * Set the methods text
   *
   * @param {String} methods The methods text (each method on a new line)
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
   * Add a single attribute
   *
   * @param {String} name Attribute name
   * @param {String} type Attribute type
   * @param {String} visibility Visibility modifier ('+', '-', '#', '~')
   * @returns {this}
   */
  addAttribute(name: string, type: string, visibility?: string): this;

  /**
   * Add a single method
   *
   * @param {String} name Method name
   * @param {String} returnType Return type
   * @param {String} parameters Method parameters
   * @param {String} visibility Visibility modifier ('+', '-', '#', '~')
   * @returns {this}
   */
  addMethod(name: string, returnType: string, parameters?: string, visibility?: string): this;

  /**
   * Set whether this class is abstract
   *
   * @param {Boolean} isAbstract True if the class is abstract
   * @returns {this}
   */
  setAbstract(isAbstract: boolean): this;

  /**
   * Check if this class is abstract
   *
   * @returns {Boolean} True if the class is abstract
   */
  isAbstract(): boolean;

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
