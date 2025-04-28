import { Figure } from './figure';
import { Connection } from './connection';
import { Point, Rectangle } from '../geo';
import { ArrayList } from '../util/arraylist';
import { ConnectionAnchor } from '../layout/anchor/connectionanchor';

/**
 * A port is an object that is used to establish a connection between
 * two figures. The port can be used as a source or target node of a
 * Connection.
 */
export class Port extends Figure {
  /**
   * Creates a new Port
   * @param attr Properties for the port
   * @param setter Custom setters for the port properties
   * @param getter Custom getters for the port properties
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** Flag indicating if the port accepts targets */
  canSnapToHelper: boolean;

  /** The port color */
  coronaWidth: number;

  /** Flag indicating if this port is a source port */
  isSource: boolean;

  /** Flag indicating if this port is a target port */
  isTarget: boolean;

  /** The max number of connections for this port */
  maxFanOut: number;

  /** The parent figure of this port */
  parent: Figure | null;

  /** The connection anchor for this port */
  connectionAnchor: ConnectionAnchor;

  /** The hierarchy name of this port */
  hierarchyName: string | null;

  /** The locator for the port */
  locator: any;

  /** Flag indicating if connections are visible during drag & drop */
  showOnDragStart: boolean;

  /** Flag indicating if connections from/to same figure are allowed */
  allowFanOut: boolean;

  /**
   * Set the parent of this port
   * @param parent The new parent figure
   * @returns this
   */
  setParent(parent: Figure | null): this;

  /**
   * Return the corona width of the port
   * @returns The corona width
   */
  getCoronaWidth(): number;

  /**
   * Set the corona width of the port
   * @param width The new corona width
   * @returns this
   */
  setCoronaWidth(width: number): this;

  /**
   * Set whether the port can have multiple connections
   * @param flag True if multiple connections allowed
   * @returns this
   */
  setMaxFanOut(count: number): this;

  /**
   * Get the maximum number of connections for this port
   * @returns The maximum number of connections
   */
  getMaxFanOut(): number;

  /**
   * Set if this port handles connections by drag & drop
   * @param flag True if drag & drop is enabled
   * @returns this
   */
  setConnectionAnchor(anchor: ConnectionAnchor): this;

  /**
   * Get the connection anchor
   * @returns The connection anchor
   */
  getConnectionAnchor(): ConnectionAnchor;

  /**
   * Set the position of the port
   * @param x The x-coordinate or Point object
   * @param y The y-coordinate if x is a number
   * @returns this
   */
  setPosition(x: number | Point, y?: number): this;

  /**
   * Set the locator for this port
   * @param locator The locator object
   * @returns this
   */
  setLocator(locator: any): this;

  /**
   * Get all connections of this port
   * @returns Array of connections
   */
  getConnections(): Connection[];

  /**
   * Return the name of this port
   * @returns The name
   */
  getName(): string;

  /**
   * Set the name of this port
   * @param name The new name
   * @returns this
   */
  setName(name: string): this;

  /**
   * Set if this port is a target port
   * @param flag True if this is a target port
   * @returns this
   */
  setIsTarget(flag: boolean): this;

  /**
   * Check if this port can be a target port
   * @returns True if this can be a target port
   */
  isInTarget(): boolean;

  /**
   * Set if this port is a source port
   * @param flag True if this is a source port
   * @returns this
   */
  setIsSource(flag: boolean): this;

  /**
   * Check if this port can be a source port
   * @returns True if this can be a source port
   */
  isInSource(): boolean;

  /**
   * Set if connections should be visible on drag start
   * @param flag True to show connections
   * @returns this
   */
  setShowOnDragStart(flag: boolean): this;

  /**
   * Get if connections are visible during drag
   * @returns True if connections are visible
   */
  getShowOnDragStart(): boolean;

  /**
   * Set if connection to the same figure is allowed
   * @param flag True if connections to same figure allowed
   * @returns this
   */
  setAllowFanOut(flag: boolean): this;

  /**
   * Get if fan out connections are allowed
   * @returns True if connections to same figure allowed
   */
  getAllowFanOut(): boolean;

  /**
   * Check if the port has the given connection
   * @param connection The connection to check
   * @returns True if connection exists
   */
  hasConnection(connection: Connection): boolean;

  /**
   * Called when a connection is removed
   * @param connection The connection that was removed
   * @private
   */
  onDragEnd(x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called when a connection is removed
   * @param connection The connection that was removed
   * @param source True if this port was the source
   * @private
   */
  onConnectionLost(connection: Connection, source: boolean): void;

  /**
   * Called if a connection is created
   * @param connection The connection that was created
   * @param source True if this port is the source
   * @private
   */
  onConnectionCreated(connection: Connection, source: boolean): void;

  /**
   * Called if a port was moved
   * @param dx The x-delta movement
   * @param dy The y-delta movement
   * @private
   */
  onDrag(dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called if a port can accept a connection
   * @param port The source port
   * @returns True if connection is allowed
   * @private
   */
  onDragEnter(port: Port): boolean;

  /**
   * Called if a port leaves a port
   * @param port The source port
   * @private
   */
  onDragLeave(port: Port): void;

  /**
   * Called if a connection is dropped on this port
   * @param port The source port
   * @param x The x-coordinate of the event
   * @param y The y-coordinate of the event
   * @param shiftKey True if shift key pressed
   * @param ctrlKey True if ctrl key pressed
   * @private
   */
  onDrop(port: Port, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Callback if a new connection has been created
   * @param connection The new connection
   * @private
   */
  fireEvent(event: string, args?: any): void;

  /**
   * Clone the figure
   * @param cloneMetaData Metadata for cloning
   * @returns The cloned figure
   */
  clone(cloneMetaData?: any): Port;

  /**
   * Get the attributes for serialization
   * @returns Object with serializable attributes
   */
  getPersistentAttributes(): any;

  /**
   * Read the attributes from serialized data
   * @param memento The serialized data
   * @returns this
   */
  setPersistentAttributes(memento: any): this;
}
