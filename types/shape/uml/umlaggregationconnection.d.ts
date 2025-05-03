import { Connection } from '../../connection/connection';
import { Figure } from '../../core/figure';

/**
 * A UML Aggregation connection for class diagrams.
 * This connection represents a whole-part relationship in UML class diagrams
 * with a diamond at the "whole" end of the relationship.
 */
export class UmlAggregationConnection extends Connection {
  /**
   * Create a new UML Aggregation connection
   * @param {Object} [attr] the configuration of the connection
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the source class (the "part" in the relationship)
   *
   * @param {Figure} figure The source figure
   * @returns {this}
   */
  setSource(figure: Figure): this;

  /**
   * Set the target class (the "whole" in the relationship)
   *
   * @param {Figure} figure The target figure
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
