import { Figure } from '../../core/figure';
import { Label } from '../basic/label';

/**
 * An Interface shape for UML class diagrams.
 * This shape represents an interface with name and methods sections.
 */
export class Interface extends Figure {
  /**
   * Create a new Interface element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the interface name */
  readonly nameLabel: Label;

  /** The label for the methods section */
  readonly methodsLabel: Label;

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
