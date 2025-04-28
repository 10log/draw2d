import { Figure } from '../../core/figure';
import { Label } from '../basic/label';
import { Port } from '../../core/port';

/**
 * A Table shape for database diagrams.
 * This shape represents a database table with columns and properties.
 */
export class Table extends Figure {
  /**
   * Create a new Table element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the table name */
  readonly nameLabel: Label;

  /** The label for displaying columns */
  readonly columnsLabel: Label;

  /** The connection port */
  readonly port: Port;

  /**
   * Set the name of the table
   *
   * @param {String} name The table name
   * @returns {this}
   */
  setName(name: string): this;

  /**
   * Get the name of the table
   *
   * @returns {String} The table name
   */
  getName(): string;

  /**
   * Set the columns text
   *
   * @param {String} columns The columns text (each column on a new line)
   * @returns {this}
   */
  setColumns(columns: string): this;

  /**
   * Get the columns text
   *
   * @returns {String} The columns text
   */
  getColumns(): string;

  /**
   * Add a single column
   *
   * @param {String} name Column name
   * @param {String} type Column data type
   * @param {Boolean} isPrimary Whether this is a primary key
   * @returns {this}
   */
  addColumn(name: string, type: string, isPrimary?: boolean): this;

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
