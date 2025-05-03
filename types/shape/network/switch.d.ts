import { SetFigure } from '../../setfigure';
import { Port } from '../../core/port';

/**
 * A switch shape for network and infrastructure diagrams.
 * This shape represents a network switch with multiple connection ports.
 */
export class Switch extends SetFigure {
  /**
   * Creates a new switch figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** Array of ports on the left side */
  readonly portsLeft: Port[];

  /** Array of ports on the right side */
  readonly portsRight: Port[];

  /**
   * @inheritdoc
   */
  createSet(): any;

  /**
   * Set the label text for the switch
   *
   * @param {String} text The switch label text
   * @returns {this}
   */
  setLabel(text: string): this;

  /**
   * Get the label text of the switch
   *
   * @returns {String} The switch label text
   */
  getLabel(): string;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}
