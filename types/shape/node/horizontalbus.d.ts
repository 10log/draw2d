import { Node } from './node';
import { Port } from '../../core/port';

/**
 * A horizontal bus shape for connecting multiple components
 * in system architecture diagrams.
 */
export class HorizontalBus extends Node {
  /**
   * Create a new HorizontalBus element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Add a port to the bus at the given position
   *
   * @param {Number} x The x position where to add the port
   * @param {String} [type] The port type (input, output, hybrid). Default is hybrid.
   * @returns {draw2d.Port} The created port
   */
  addPort(x: number, type?: string): Port;

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
