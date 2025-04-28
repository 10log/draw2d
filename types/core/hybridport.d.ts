import { Port } from './port';
import { Figure } from './figure';

/**
 * A HybridPort can be both a source and a target for connections.
 */
export class HybridPort extends Port {
  /**
   * Creates a new HybridPort
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
   * Create a clone of this HybridPort
   * @param cloneMetaData Optional metadata for cloning
   * @returns The cloned port
   */
  clone(cloneMetaData?: any): HybridPort;
}