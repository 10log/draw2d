import { Connection } from '../../core/connection';
import { Point } from '../../geo/point';

/**
 * A specialized connection for UML aggregation relationships.
 * This connection has a diamond decoration at the source end.
 */
export class AggregationConnection extends Connection {
  /**
   * Creates a new aggregation connection
   * @param {Object} [attr] the configuration of the connection
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the vertices in the connection
   *
   * @param {Point[]} vertices The array of vertices (or empty array to clear)
   * @param {Boolean} [silent] True to avoid firing an event
   * @returns {this}
   */
  setVertices(vertices: Point[], silent?: boolean): this;

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * Called when the connection is initially created
   * @private
   */
  onConnect(): void;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}
