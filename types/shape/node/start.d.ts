import { Node } from './node';
import { Port } from '../../core/port';

/**
 * A node that can be used as the start of a workflow or process.
 * It contains an output port for connecting to other elements.
 */
export class Start extends Node {
  /**
   * Creates a new Start element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * Returns the main output port of this node
   * @returns {draw2d.Port} The output port
   */
  getPort(): Port;
}
