import { Connection } from '../../connection/connection';
import { Figure } from '../../core/figure';

/**
 * A UML Inheritance connection for class diagrams.
 * This connection represents an inheritance relationship in UML class diagrams
 * with the characteristic empty triangle arrowhead pointing to the parent class.
 */
export class UmlInheritanceConnection extends Connection {
  /**
   * Create a new UML Inheritance connection
   * @param {Object} [attr] the configuration of the connection
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the source class/interface
   *
   * @param {Figure} figure The source figure (child class)
   * @returns {this}
   */
  setSource(figure: Figure): this;

  /**
   * Set the target class/interface
   *
   * @param {Figure} figure The target figure (parent class)
   * @returns {this}
   */
  setTarget(figure: Figure): this;

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
