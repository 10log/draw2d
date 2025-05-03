import { Connection } from '../../core/connection';
import { Label } from '../basic/label';

/**
 * A specialized connection for database relationships.
 * This connection represents relationships between tables with cardinality.
 */
export class RelationConnection extends Connection {
  /**
   * Creates a new relation connection
   * @param {Object} [attr] the configuration of the connection
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The source cardinality label */
  readonly sourceLabel: Label;

  /** The target cardinality label */
  readonly targetLabel: Label;

  /** The relationship name label */
  readonly nameLabel: Label;

  /**
   * Set the source cardinality text
   *
   * @param {String} cardinality The cardinality text (e.g., "1", "0..n", "*")
   * @returns {this}
   */
  setSourceCardinality(cardinality: string): this;

  /**
   * Get the source cardinality text
   *
   * @returns {String} The source cardinality text
   */
  getSourceCardinality(): string;

  /**
   * Set the target cardinality text
   *
   * @param {String} cardinality The cardinality text (e.g., "1", "0..n", "*")
   * @returns {this}
   */
  setTargetCardinality(cardinality: string): this;

  /**
   * Get the target cardinality text
   *
   * @returns {String} The target cardinality text
   */
  getTargetCardinality(): string;

  /**
   * Set the relationship name
   *
   * @param {String} name The relationship name
   * @returns {this}
   */
  setName(name: string): this;

  /**
   * Get the relationship name
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
