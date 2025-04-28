import { Port } from '../core/port';
import { Figure } from '../core/figure';
import { Connection } from '../core/connection';
import { AbstractPolicy } from './editpolicy';

/**
 * Base class for port feedback policies
 *
 * These policies provide visual feedback when working with ports,
 * typically during connection creation.
 */
export class PortFeedbackPolicy extends AbstractPolicy {
  /**
   * Creates a new port feedback policy
   */
  constructor();

  /**
   * Called if the user drags a connection from a port.
   *
   * @param port The port where the connection starts
   * @param feedback The temporary connection for feedback
   */
  onDragStart(port: Port, feedback: Connection): void;

  /**
   * Called during the drag of a connection.
   *
   * @param port The source port
   * @param feedback The temporary connection for feedback
   */
  onDrag(port: Port, feedback: Connection): void;

  /**
   * Called if the user releases the dragged connection.
   *
   * @param port The source port
   * @param feedback The temporary connection for feedback
   */
  onDragEnd(port: Port, feedback: Connection): void;
}

/**
 * Policy that highlights possible target ports during connection creation
 * with small intrusive decorations.
 */
export class IntrusivePortsFeedbackPolicy extends PortFeedbackPolicy {
  /**
   * Creates a new intrusive ports feedback policy
   */
  constructor();

  /**
   * Tokens assigned to ports during policy feedback
   * @private
   */
  protected currentDropTargets: Set<Port>;

  /**
   * Called if the user drags a connection from a port.
   *
   * @param port The port where the connection starts
   * @param feedback The temporary connection for feedback
   */
  onDragStart(port: Port, feedback: Connection): void;

  /**
   * Called during the drag of a connection.
   *
   * @param port The source port
   * @param feedback The temporary connection for feedback
   */
  onDrag(port: Port, feedback: Connection): void;

  /**
   * Called if the user releases the dragged connection.
   *
   * @param port The source port
   * @param feedback The temporary connection for feedback
   */
  onDragEnd(port: Port, feedback: Connection): void;
}

/**
 * Policy that shows an elastic strap line during connection drag
 * to provide feedback about the connection operation.
 */
export class ElasticStrapFeedbackPolicy extends PortFeedbackPolicy {
  /**
   * Creates a new elastic strap feedback policy
   */
  constructor();

  /**
   * Called if the user drags a connection from a port.
   *
   * @param port The port where the connection starts
   * @param feedback The temporary connection for feedback
   */
  onDragStart(port: Port, feedback: Connection): void;

  /**
   * Called during the drag of a connection.
   *
   * @param port The source port
   * @param feedback The temporary connection for feedback
   */
  onDrag(port: Port, feedback: Connection): void;

  /**
   * Called if the user releases the dragged connection.
   *
   * @param port The source port
   * @param feedback The temporary connection for feedback
   */
  onDragEnd(port: Port, feedback: Connection): void;
}
