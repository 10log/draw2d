// filepath: c:\Users\Rob_M\repos\draw2d\draw2d\types\shape\uml\umlgeneralizationconnection.d.ts
import { Connection } from '../../connection/connection';
import { Figure } from '../../core/figure';

/**
 * A UML Generalization connection for class diagrams.
 * This connection represents a generalization relationship in UML class diagrams,
 * which is an "is-a" relationship between a specific class (child) and a more
 * general class (parent) using the characteristic empty triangle arrowhead.
 */
export class UmlGeneralizationConnection extends Connection {
  /**
   * Create a new UML Generalization connection
   * @param {Object} [attr] the configuration of the connection
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the source class (specific class)
   *
   * @param {Figure} figure The source figure (specific/child class)
   * @returns {this}
   */
  setSource(figure: Figure): this;

  /**
   * Set the target class (general class)
   *
   * @param {Figure} figure The target figure (general/parent class)
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
