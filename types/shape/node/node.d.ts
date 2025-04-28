import { Figure } from '../../core/figure';
import { Port } from '../../core/port';

/**
 * Base class for nodes in a diagram.
 * A node is a shape with ports for connecting to other elements.
 */
export class Node extends Figure {
  /**
   * Creates a new Node element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Return all ports of the node.
   *
   * @returns {draw2d.util.ArrayList}
   */
  getPorts(): any;

  /**
   * Return all input ports of the node.
   *
   * @returns {draw2d.util.ArrayList}
   */
  getInputPorts(): any;

  /**
   * Return all output ports of the node.
   *
   * @returns {draw2d.util.ArrayList}
   */
  getOutputPorts(): any;

  /**
   * Return the port with the corresponding name.
   *
   * @param {String} name The name of the port to search.
   * @returns {draw2d.Port} Returns the port with the given name or null.
   */
  getPort(name: string): Port | null;

  /**
   * Return the input port with the corresponding name.
   *
   * @param {String} name The name of the port to search.
   * @returns {draw2d.InputPort} Returns the port with the given name or null.
   */
  getInputPort(name: string): Port | null;

  /**
   * Return the output port with the corresponding name.
   *
   * @param {String} name The name of the port to search.
   * @returns {draw2d.OutputPort} Returns the port with the given name or null.
   */
  getOutputPort(name: string): Port | null;

  /**
   * Create a new port for this node at a specific position with a specific locator.
   *
   * @param {String} type The type of the port. "input", "output" or "hybrid"
   * @param {draw2d.layout.locator.Locator} locator The locator for the position of the port
   * @returns {draw2d.Port} The created port.
   */
  createPort(type: string, locator?: any): Port;

  /**
   * Remove the port with the given index or port object.
   *
   * @param {draw2d.Port|Number} portOrIndex An object or the index of the port to remove.
   * @returns {draw2d.Port} The removed port or null if port doesn't exist.
   */
  removePort(portOrIndex: Port | number): Port | null;

  /**
   * Allows the node to override the default persistence behavior.
   * Set to true to save ports and set false to not save ports.
   *
   * @param {boolean} flag true or false.
   * @returns {this}
   */
  setPersistPorts(flag: boolean): this;
}
