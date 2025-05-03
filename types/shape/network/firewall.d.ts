import { Figure } from '../../core/figure';
import { Label } from '../basic/label';
import { Port } from '../../core/port';

/**
 * A Firewall shape for network and security diagrams.
 * This shape represents a network firewall in infrastructure diagrams.
 */
export class Firewall extends Figure {
  /**
   * Create a new Firewall element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the firewall name */
  readonly label: Label;

  /** The input port (external network side) */
  readonly inputPort: Port;

  /** The output port (internal network side) */
  readonly outputPort: Port;

  /**
   * Set the name of the firewall
   *
   * @param {String} name The firewall name
   * @returns {this}
   */
  setName(name: string): this;

  /**
   * Get the name of the firewall
   *
   * @returns {String} The firewall name
   */
  getName(): string;

  /**
   * Set the firewall rules description
   *
   * @param {String} rules The rules description
   * @returns {this}
   */
  setRules(rules: string): this;

  /**
   * Get the firewall rules description
   *
   * @returns {String} The rules description
   */
  getRules(): string;

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
