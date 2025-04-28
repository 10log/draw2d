import { Connection } from '../../core/connection';
import { ConnectionRouter } from './connectionrouter';

/**
 * Router for direct connections between two ports. Beeline.
 * This router creates a straight line connection between source and target ports.
 */
export class DirectRouter extends ConnectionRouter {
  /**
   * Creates a new Direct Router object
   */
  constructor();

  /**
   * Callback method if the router has been assigned to a connection.
   * Installs the necessary policies for direct line routing.
   *
   * @param connection The assigned connection
   */
  onInstall(connection: Connection): void;

  /**
   * Invalidates the given Connection
   */
  invalidate(): void;

  /**
   * Routes the Connection with a direct line between start and end points.
   *
   * @param connection The Connection to route
   * @param routingHints Additional hints for the router
   */
  route(connection: Connection, routingHints?: object): void;
}