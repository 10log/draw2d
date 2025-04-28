import { Node } from './node';
import { Port } from '../../core/port';

/**
 * A node that can be used as a connection point in a workflow.
 * It contains both input and output ports for connecting between elements.
 */
export class Between extends Node {
  /**
   * Creates a new Between element
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
  getInputPort(): Port;

  /**
   * Returns the main output port of this node
   * @returns {draw2d.Port} The output port
   */
  getOutputPort(): Port;
}
