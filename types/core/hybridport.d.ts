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
  
  /** The max number of incomming connections for this port */
  maxFanIn: number;

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
  
  /**
   * Set the maximal possible count of incomming connections for this port
   * @param count The maximal number of incomming connections
   * @returns this
   */
  setMaxFanIn(count: number): this;
  
  /**
   * Return the maximal possible incomming connections for this port
   * @returns The maximum number of incomming connections
   */
  getMaxFanIn(): number;
  
  /**
   * Creates a command for the specified request
   * @param request The request to create a command for
   * @returns The command or null
   */
  createCommand(request: any): any;
}