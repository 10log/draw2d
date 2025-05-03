import { SetFigure } from '../../setfigure';
import { Port } from '../../core/port';

/**
 * A router shape for network and infrastructure diagrams.
 * This shape represents a network router with multiple connection ports.
 */
export class Router extends SetFigure {
  /**
   * Creates a new router figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The north connection port */
  readonly portNorth: Port;

  /** The east connection port */
  readonly portEast: Port;

  /** The south connection port */
  readonly portSouth: Port;

  /** The west connection port */
  readonly portWest: Port;

  /**
   * @inheritdoc
   */
  createSet(): any;

  /**
   * Set the label text for the router
   *
   * @param {String} text The router label text
   * @returns {this}
   */
  setLabel(text: string): this;

  /**
   * Get the label text of the router
   *
   * @returns {String} The router label text
   */
  getLabel(): string;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}
