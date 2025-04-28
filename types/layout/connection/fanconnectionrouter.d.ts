import { Connection } from '../../core/connection';
import { Point } from '../../geo';
import { DirectRouter } from './directrouter';
import { ArrayList } from '../../util/arraylist';

/**
 * Automatic router that spreads its Connections in a fan-like fashion upon collision.
 * This is useful when multiple connections connect the same source and target ports.
 */
export class FanConnectionRouter extends DirectRouter {
  /**
   * Creates a new Fan Router object
   */
  constructor();

  /**
   * Callback method if the router has been assigned to a connection.
   * Installs the necessary policies for fan routing.
   *
   * @param connection The assigned connection
   */
  onInstall(connection: Connection): void;

  /**
   * Layout the handed over connection in a fan-like layout when collisions are detected.
   *
   * @param connection The Connection to route
   * @param routingHints Additional hints for the router
   */
  route(connection: Connection, routingHints?: {
    startMoved?: boolean;
    destMoved?: boolean;
  }): void;

  /**
   * Routes the connection if connections overlap. Two connections overlap if the combination
   * of source and target anchors are equal.
   *
   * @param connection The connection to route
   * @param index The index of the connection in the set of overlapping connections
   */
  routeCollision(connection: Connection, index: number): void;
}