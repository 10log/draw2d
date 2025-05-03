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

  /** The corona width for hit testing */
  coronaWidth: number;

  /** The max number of connections for this port */
  maxFanOut: number;

  /** The parent figure of this port */
  parent: Figure | null;

  /** The connection anchor for this port */
  connectionAnchor: ConnectionAnchor;

  /** The name of this port */
  name: string | null;

  /** The locator for the port */
  locator: any;
  
  /** Semantic group for connection validation */
  semanticGroup: string;
  
  /** Current value for the port (for interactive diagrams) */
  value: any;
  
  /** List of current attached connections */
  connections: ArrayList<Connection>;

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
   * Set the semantic group of this port. Only ports in the same semantic group
   * can be connected. The default for all ports is "global"
   * @param group The semantic group of this port
   * @returns this
   */
  setSemanticGroup(group: string): this;
  
  /**
   * Get the semantic group of this port. Only ports in the same semantic group
   * can be connected. The default for all ports is "global"
   * @returns The semantic group
   */
  getSemanticGroup(): string;

  /**
   * Set the connection anchor for this port
   * @param anchor The connection anchor
   * @returns this
   */
  setConnectionAnchor(anchor: ConnectionAnchor): this;

  /**
   * Get the connection anchor
   * @returns The connection anchor
   */
  getConnectionAnchor(): ConnectionAnchor;
  
  /**
   * Return the anchor location for this port
   * @param referencePoint The reference point for the connection
   * @param inquiringConnection The connection requesting the location
   * @returns The anchor location point
   */
  getConnectionAnchorLocation(referencePoint: Point, inquiringConnection: Connection): Point;
  
  /**
   * Return the reference point for the connection anchor
   * @param inquiringConnection The connection requesting the reference point
   * @returns The reference point
   */
  getConnectionAnchorReferencePoint(inquiringConnection: Connection): Point;
  
  /**
   * Returns the direction for the connection in relation to the given port and its parent
   * @param peerPort The counterpart port
   * @returns The connection direction
   */
  getConnectionDirection(peerPort: Port): number;
  
  /**
   * Set the preferred direction for the connection
   * @param direction The preferred direction (up=0, right=1, down=2, left=3, or null for auto-calculation)
   * @returns this
   */
  setConnectionDirection(direction: number | null): this;

  /**
   * Set the position of the port
   * @param x The x-coordinate or Point object
   * @param y The y-coordinate if x is a number
   * @returns this
   */
  setPosition(x: number | Point, y?: number): this;

  /**
   * Set the locator/layouter of the port. A locator is responsive for the x/y arrangement of the
   * port in relation to the parent node.
   * @param locator The locator object
   * @returns this
   */
  setLocator(locator: any): this;
  
  /**
   * Get the locator of this port
   * @returns The locator
   */
  getLocator(): any;
  
  /**
   * Set a value for the port. Useful for interactive/dynamic diagrams
   * @param value The new value for the port
   * @returns this
   */
  setValue(value: any): this;
  
  /**
   * Return the user defined value of the port
   * @returns The port value
   */
  getValue(): any;

  /**
   * Returns an ArrayList of Connections of all related connections to this port
   * @returns ArrayList of connections
   */
  getConnections(): ArrayList<Connection>;

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
   * Check if the port has the given connection
   * @param connection The connection to check
   * @returns True if connection exists
   */
  hasConnection(connection: Connection): boolean;

  /**
   * Called when drag operation ends
   * @param x The x-coordinate of the event
   * @param y The y-coordinate of the event
   * @param shiftKey True if shift key pressed
   * @param ctrlKey True if ctrl key pressed
   * @private
   */
  onDragEnd(x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

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
   * Callback method if a new connection has been created with this port
   * @param connection The connection which has been created
   */
  onConnect(connection: Connection): void;
  
  /**
   * Callback method if a connection has been removed from this port
   * @param connection The connection which has been removed
   */
  onDisconnect(connection: Connection): void;

  /**
   * Callback if a new connection has been created
   * @param connection The new connection
   * @private
   */
  fireEvent(event: string, args?: any): void;
  
  /**
   * Get the selection adapter for this port
   * @returns The selection adapter
   */
  getSelectionAdapter(): any;

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
  
  /**
   * Highlight this port with a corona
   * @param flag Indicator if the port should glow
   * @returns this
   */
  setGlow(flag: boolean): this;
  
  /**
   * Set the diameter of the port. The center of the port will be retained.
   * @param d The new diameter of the port
   * @returns this
   */
  setDiameter(d: number): this;
}
