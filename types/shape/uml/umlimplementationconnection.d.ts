import { Connection } from '../../connection/connection';
import { Figure } from '../../core/figure';

/**
 * A UML Implementation connection for class diagrams.
 * This connection represents an implementation relationship in UML class diagrams
 * with a dashed line and empty triangle arrowhead pointing to the interface.
 */
export class UmlImplementationConnection extends Connection {
  /**
   * Create a new UML Implementation connection
   * @param {Object} [attr] the configuration of the connection
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the source class
   *
   * @param {Figure} figure The source figure (implementing class)
   * @returns {this}
   */
  setSource(figure: Figure): this;

  /**
   * Set the target interface
   *
   * @param {Figure} figure The target figure (interface being implemented)
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
