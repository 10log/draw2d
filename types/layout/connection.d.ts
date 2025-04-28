import { Point } from '../geo';
import { Connection } from '../core/connection';
import { Figure } from '../core/figure';

/**
 * Base class for all Connection Router implementations.
 * A connection router is responsible for calculating the points for a
 * connection based on the source and target port/anchor.
 */
export class ConnectionRouter {
  /**
   * Creates a new connection router
   */
  constructor();

  /**
   * Routes the connection.
   * @param connection The connection to route
   * @returns The routed points
   */
  route(connection: Connection): Point[];
}

/**
 * The DirectRouter routes a connection in a direct line between the
 * source and target port.
 */
export class DirectRouter extends ConnectionRouter {
  /**
   * Creates a new direct router
   */
  constructor();

  /**
   * Routes the connection directly between source and target
   * @param connection The connection to route
   * @returns The routed points
   */
  route(connection: Connection): Point[];
}

/**
 * The Manhattan Router routes a connection in an orthogonal
 * (right-angle line segments) fashion.
 */
export class ManhattanConnectionRouter extends ConnectionRouter {
  /**
   * Creates a new Manhattan router
   */
  constructor();

  /**
   * Routes the connection orthogonally
   * @param connection The connection to route
   * @returns The routed points
   */
  route(connection: Connection): Point[];
}

/**
 * The FanConnectionRouter routes a connection in a "fan" style, useful
 * for multiple connections to or from the same port.
 */
export class FanConnectionRouter extends ConnectionRouter {
  /**
   * Creates a new fan connection router
   */
  constructor();

  /**
   * Routes the connection as a fan
   * @param connection The connection to route
   * @returns The routed points
   */
  route(connection: Connection): Point[];
}

/**
 * The SketchConnectionRouter routes a connection in a sketch-like style with
 * slightly curved lines that appear hand-drawn.
 */
export class SketchConnectionRouter extends ConnectionRouter {
  /**
   * Creates a new sketch router
   */
  constructor();

  /**
   * Routes the connection in a sketch style
   * @param connection The connection to route
   * @returns The routed points
   */
  route(connection: Connection): Point[];
}

/**
 * The SplineConnectionRouter routes a connection in a curved spline fashion.
 */
export class SplineConnectionRouter extends ConnectionRouter {
  /**
   * Creates a new spline router
   */
  constructor();

  /**
   * Routes the connection as a smooth spline
   * @param connection The connection to route
   * @returns The routed points
   */
  route(connection: Connection): Point[];
}
