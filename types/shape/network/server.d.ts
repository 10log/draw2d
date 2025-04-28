import { Figure } from '../../core/figure';
import { Label } from '../basic/label';
import { Port } from '../../core/port';

/**
 * A Server shape for network and infrastructure diagrams.
 * This shape represents physical or virtual servers in network diagrams.
 */
export class Server extends Figure {
  /**
   * Create a new Server element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the server name */
  readonly label: Label;

  /** The input port */
  readonly inputPort: Port;

  /** The output port */
  readonly outputPort: Port;

  /**
   * Set the name of the server
   *
   * @param {String} name The server name
   * @returns {this}
   */
  setName(name: string): this;

  /**
   * Get the name of the server
   *
   * @returns {String} The server name
   */
  getName(): string;

  /**
   * Set the server type (e.g., "Web Server", "Database Server")
   *
   * @param {String} type The server type
   * @returns {this}
   */
  setServerType(type: string): this;

  /**
   * Get the server type
   *
   * @returns {String} The server type
   */
  getServerType(): string;

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
