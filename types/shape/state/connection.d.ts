import { Connection as CoreConnection } from '../../core/connection';

/**
 * A specialized connection for state diagrams.
 */
export class Connection extends CoreConnection {
  /**
   * Creates a new state connection
   * @param {Object} [attr] the configuration of the connection
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the label for the connection
   * @param {string} label The label text
   * @returns {this}
   */
  setLabel(label: string): this;

  /**
   * Get the connection label
   * @returns {string} The current label
   */
  getLabel(): string;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}