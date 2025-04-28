import { Connection } from '../../core/connection';
import { Point } from '../../geo';
import { ConnectionRouter } from './connectionrouter';

/**
 * Provides a Connection with an orthogonal route between the Connection's source
 * and target anchors. This router creates "Manhattan style" connections with only
 * horizontal and vertical line segments.
 */
export class ManhattanConnectionRouter extends ConnectionRouter {
  /**
   * Creates a new Manhattan Router object
   */
  constructor();

  /** Minimum distance for connection segments */
  MINDIST: number;

  /** Tolerance value for calculations */
  TOL: number;

  /** Squared tolerance value */
  TOLxTOL: number;

  /** Distance at which path direction toggles */
  TOGGLE_DIST: number;

  /**
   * Callback method if the router has been assigned to a connection.
   * Installs the necessary policies for Manhattan routing.
   *
   * @param connection The assigned connection
   */
  onInstall(connection: Connection): void;

  /**
   * Routes the Connection using Manhattan routing algorithm.
   *
   * @param connection The Connection to route
   * @param routingHints Additional hints for the router
   */
  route(connection: Connection, routingHints?: object): void;

  /**
   * Internal routing algorithm.
   *
   * @private
   * @param connection The connection to route
   * @param fromPt The starting point
   * @param fromDir The direction to start from
   * @param toPt The target point
   * @param toDir The direction to end at
   */
  _route(connection: Connection, fromPt: Point, fromDir: number, toPt: Point, toDir: number): void;
}
