import { Node } from './node';
import { Port } from '../../core/port';

/**
 * A node that can be used as the end of a workflow or process.
 * It contains an input port for connecting from other elements.
 */
export class End extends Node {
  /**
   * Creates a new End element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * Returns the main input port of this node
   * @returns {draw2d.Port} The input port
   */
  getPort(): Port;
}
