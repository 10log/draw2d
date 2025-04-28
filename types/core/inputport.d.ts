import { Port } from './port';
import { Figure } from './figure';

/**
 * An InputPort is a port that can only be a target for connections.
 */
export class InputPort extends Port {
  /**
   * Creates a new InputPort
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
   * Create a clone of this InputPort
   * @param cloneMetaData Optional metadata for cloning
   * @returns The cloned port
   */
  clone(cloneMetaData?: any): InputPort;
}