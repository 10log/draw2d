import { Figure } from '../../core/figure';
import { Label } from '../basic/label';
import { Port } from '../../core/port';

/**
 * A Database shape for data architecture diagrams.
 * This shape represents a database system in architecture diagrams.
 */
export class Database extends Figure {
  /**
   * Create a new Database element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the database name */
  readonly nameLabel: Label;

  /** The input/output port */
  readonly port: Port;

  /**
   * Set the name of the database
   *
   * @param {String} name The database name
   * @returns {this}
   */
  setName(name: string): this;

  /**
   * Get the name of the database
   *
   * @returns {String} The database name
   */
  getName(): string;

  /**
   * Set the database type (e.g., "MySQL", "MongoDB", "PostgreSQL")
   *
   * @param {String} type The database type
   * @returns {this}
   */
  setDatabaseType(type: string): this;

  /**
   * Get the database type
   *
   * @returns {String} The database type
   */
  getDatabaseType(): string;

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
