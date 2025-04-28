import { Port } from './port';
import { PolyLine } from '../shape/basic/polyline';
import { Point } from '../geo';
import { ConnectionRouter } from '../layout/connection/connectionrouter';
import { Decorator } from '../decoration/connection/decorator';
import { Raphael } from '../../src/lib/raphael.exec';
import { Canvas } from './canvas';

/**
 * Connections figures are used to display a line between two points.
 *
 * The source and target endpoints of a connection are each defined using a ConnectionAnchor.
 * These endpoints, along with any other points on the connection, are set by the
 * connection's ConnectionRouter.
 */
export class Connection extends PolyLine {
  /**
   * Creates a new connection between two points/ports.
   * @param attr Attributes for the connection
   * @param setter Custom setters for attributes
   * @param getter Custom getters for attributes
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** Source port of the connection */
  sourcePort: Port | null;

  /** Target port of the connection */
  targetPort: Port | null;

  /** Helper for move operations */
  oldPoint: Point | null;

  /** Decorator at the source end */
  sourceDecorator: Decorator | null;

  /** Decorator at the target end */
  targetDecorator: Decorator | null;

  /** Raphaël node for source decorator */
  sourceDecoratorNode: Raphael.Element | null;

  /** Raphaël node for target decorator */
  targetDecoratorNode: Raphael.Element | null;

  /** Flag to track if connection is being moved */
  isMoving: boolean;

  /** Function reference for port movement handling */
  moveListener: (figure: Port) => void;

  /** Router for this connection */
  router: ConnectionRouter;

  /**
   * Disconnect the connection from the source and target ports
   */
  disconnect(): void;

  /**
   * Reconnect the connection to the source and target ports
   */
  reconnect(): void;

  /**
   * Check if the connection can be resized
   * @returns True if resizable
   */
  isResizeable(): boolean;

  /**
   * Add a child figure to the connection
   * @param child Figure to add
   * @param locator Locator for positioning
   * @param index Optional index for insertion
   * @returns this
   */
  add(child: any, locator: any, index?: number): this;

  /**
   * Set the source decorator
   * @param decorator The decorator to use
   * @returns this
   */
  setSourceDecorator(decorator: Decorator): this;

  /**
   * Get the source decorator
   * @returns The source decorator
   */
  getSourceDecorator(): Decorator | null;

  /**
   * Set the target decorator
   * @param decorator The decorator to use
   * @returns this
   */
  setTargetDecorator(decorator: Decorator): this;

  /**
   * Get the target decorator
   * @returns The target decorator
   */
  getTargetDecorator(): Decorator | null;

  /**
   * Calculate the path of the connection
   * @param routingHints Helper attributes for the router
   * @private
   * @returns this
   */
  calculatePath(routingHints: { startMoved?: boolean, destMoved?: boolean }): this;

  /**
   * Draw the connection
   * @param attributes Optional attributes to apply
   * @returns this
   */
  repaint(attributes?: any): this;

  /**
   * Get the absolute x position
   * @returns Always returns 0 for connections
   */
  getAbsoluteX(): number;

  /**
   * Get the absolute y position
   * @returns Always returns 0 for connections
   */
  getAbsoluteY(): number;

  /**
   * Perform post-processing operations
   * @param postProcessCache Cache for post-processing
   */
  postProcess(postProcessCache: any): void;

  /**
   * Handle drag operations
   * @param dx X difference from start
   * @param dy Y difference from start
   * @param dx2 X difference since last call
   * @param dy2 Y difference since last call
   */
  onDrag(dx: number, dy: number, dx2: number, dy2: number): void;

  /**
   * Move the connection to the front
   * @param figure Optional figure to place in front of
   * @returns this
   */
  toFront(figure?: any): this;

  /**
   * Move the connection to the back
   * @param figure Optional figure to place behind
   * @returns this
   */
  toBack(figure?: any): this;

  /**
   * Get the start point
   * @param refPoint Optional reference point
   * @returns The start point
   * @deprecated Use getStartPosition instead
   */
  getStartPoint(refPoint?: Point): Point;

  /**
   * Get the start position
   * @param refPoint Optional reference point
   * @returns The start position
   */
  getStartPosition(refPoint?: Point): Point;

  /**
   * Get the end point
   * @param refPoint Optional reference point
   * @returns The end point
   * @deprecated Use getEndPosition instead
   */
  getEndPoint(refPoint?: Point): Point;

  /**
   * Get the end position
   * @param refPoint Optional reference point
   * @returns The end position
   */
  getEndPosition(refPoint?: Point): Point;

  /**
   * Set the source port
   * @param port The new source port
   */
  setSource(port: Port): void;

  /**
   * Get the source port
   * @returns The source port
   */
  getSource(): Port | null;

  /**
   * Set the target port
   * @param port The new target port
   */
  setTarget(port: Port): void;

  /**
   * Get the target port
   * @returns The target port
   */
  getTarget(): Port | null;

  /**
   * Get the opposite port for the given port
   * @param port The port to find peer for
   * @returns The opposite port or null
   */
  getPeerPort(port: Port): Port | null;

  /**
   * Check if this connection shares any ports with another connection
   * @param other The other connection
   * @returns True if connections share ports
   */
  sharingPorts(other: Connection): boolean;

  /**
   * Set the canvas
   * @param canvas The new canvas
   * @returns this
   */
  setCanvas(canvas: Canvas | null): this;

  /**
   * Get the angle at the connection start
   * @returns The angle in degrees
   */
  getStartAngle(): number;

  /**
   * Get the angle at the connection end
   * @returns The angle in degrees
   */
  getEndAngle(): number;

  /**
   * Fire source port route event to update connections
   * @private
   */
  fireSourcePortRouteEvent(): void;

  /**
   * Fire target port route event to update connections
   * @private
   */
  fireTargetPortRouteEvent(): void;

  /**
   * Create a command for the specified request
   * @param request The command request
   * @returns The command or null
   * @private
   */
  createCommand(request: any): any;

  /**
   * Get persistent attributes for serialization
   * @returns Object with attributes
   */
  getPersistentAttributes(): any;

  /**
   * Set attributes from serialized data
   * @param memento The serialized data
   * @returns this
   */
  setPersistentAttributes(memento: any): this;
}
