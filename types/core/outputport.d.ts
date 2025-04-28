import { Port } from './port';
import { Figure } from './figure';

/**
 * An OutputPort is a port that can only be a source for connections.
 */
export class OutputPort extends Port {
  /**
   * Creates a new OutputPort
   * @param attr Properties for the port
   * @param setter Custom setters for the properties
   * @param getter Custom getters for the properties
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Returns the locator of this port.
   * @returns The locator
   */
  getLocator(): any;

  /**
   * Create a clone of this OutputPort
   * @param cloneMetaData Optional metadata for cloning
   * @returns The cloned port
   */
  clone(cloneMetaData?: any): OutputPort;
}
