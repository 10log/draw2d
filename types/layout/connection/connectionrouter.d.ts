import { Connection } from '../../core/connection';
import { PolyLine } from '../../shape/basic/polyline';
import { Line } from '../../shape/basic/line';
import { ArrayList } from '../../util/arraylist';

/**
 * Routes a Connection, possibly using a constraint.
 * This is the base class for all connection router implementations.
 */
export class ConnectionRouter {
  /**
   * Creates a new Router object
   */
  constructor();

  /**
   * Routes the Connection.
   *
   * @param connection The Connection to route
   * @param routingHints Some helper attributes for the router
   * @param routingHints.startMoved Is true if just the start location has moved
   * @param routingHints.endMoved Is true if the destination location has changed
   * @param routingHints.oldVertices The vertices before the reroute has been triggered
   */
  route(connection: Connection, routingHints?: {
    startMoved?: boolean;
    endMoved?: boolean;
    oldVertices?: ArrayList;
  }): void;

  /**
   * Internal method to paint the router's path
   * @param conn The connection to paint
   * @private
   */
  _paint(conn: Connection): void;

  /**
   * Callback method if the router has been assigned to a connection.
   *
   * @param connection The assigned connection
   */
  onInstall(connection: Connection): void;

  /**
   * Callback method if the router has been removed from the connection.
   *
   * @param connection The related connection
   */
  onUninstall(connection: Connection): void;

  /**
   * Callback method for the PolyLine or Connection to check if it possible to remove a vertex from
   * the list. The router can send a veto for this.
   * Per default it is not possible to remove any vertex from the PolyLine exceptional if any interactive
   * router is installed.
   *
   * @param index The index of the vertex to remove
   * @returns true if vertex can be removed, false otherwise
   */
  canRemoveVertexAt(index: number): boolean;

  /**
   * Callback method for the PolyLine or Connection to verify that a segment is deletable.
   *
   * @param index The index of the segment to check
   * @returns true if segment can be removed, false otherwise
   */
  canRemoveSegmentAt(index: number): boolean;

  /**
   * Tweak or enrich the polyline persistence data with routing information
   *
   * @param line The polyline to get persistent attributes for
   * @param memento The memento data of the polyline
   * @returns The modified memento object
   */
  getPersistentAttributes(line: PolyLine, memento: object): object;

  /**
   * Set the attributes for the polyline with routing information
   *
   * @param line The line to set attributes for
   * @param memento The JSON data to read
   */
  setPersistentAttributes(line: Line, memento: object): void;

  /**
   * The Connection delegates the drag operation to the router. The router can
   * handle the different constraints of the connection.
   *
   * @param line The line being dragged
   * @param dx The x difference between the start of the drag drop operation and now
   * @param dy The y difference between the start of the drag drop operation and now
   * @param dx2 The x diff since the last call of this dragging operation
   * @param dy2 The y diff since the last call of this dragging operation
   */
  onDrag(line: Line, dx: number, dy: number, dx2: number, dy2: number): void;

  /**
   * Called by the connection if the vertices set outside.
   * This enforce the router to avoid full autoroute. E.g. InteractiveManhattanRouter
   *
   * @param line The line whose vertices have been set
   */
  verticesSet(line: Line): void;
}
