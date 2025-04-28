import { Figure } from '../../core/figure';
import { Label } from '../basic/label';
import { Port } from '../../core/port';

/**
 * A UML Interface shape for class diagrams.
 * This shape represents an interface in UML class diagrams with name and methods.
 */
export class UmlInterface extends Figure {
  /**
   * Create a new UML Interface element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the interface name */
  readonly nameLabel: Label;

  /** The label for displaying methods */
  readonly methodsLabel: Label;

  /** Available ports for connections */
  readonly ports: Port[];

  /**
   * Set the name of the interface
   *
   * @param {String} name The interface name
   * @returns {this}
   */
  setName(name: string): this;

  /**
   * Get the name of the interface
   *
   * @returns {String} The interface name
   */
  getName(): string;

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
   * Add a single method
   *
   * @param {String} name Method name
   * @param {String} returnType Return type
   * @param {String} parameters Method parameters
   * @returns {this}
   */
  addMethod(name: string, returnType: string, parameters?: string): this;

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
