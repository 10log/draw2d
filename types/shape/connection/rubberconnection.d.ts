import { Connection } from '../../core/connection';

/**
 * A RubberConnection is a simple connection with a rubber band rendering style.
 * It uses the RubberbandRouter for routing and has a customized appearance.
 *
 * @example
 *    let connection = new draw2d.RubberConnection();
 *    connection.setSource(sourcePort);
 *    connection.setTarget(targetPort);
 *    canvas.add(connection);
 */
export class RubberConnection extends Connection {
  /**
   * Creates a new RubberConnection
   * @param {Object} [attr] the configuration of the connection
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}
