import { Figure } from '../core/figure';
import { Connection } from '../core/connection';
import { Port } from '../core/port';
import { Canvas } from '../core/canvas';
import { AbstractPolicy } from './editpolicy';
import { Point } from '../geo/point';

/**
 * Base class for connection creation policies
 *
 * These policies define how connections can be created between ports
 */
export class ConnectionCreatePolicy extends AbstractPolicy {
  /**
   * Creates a new connection creation policy
   */
  constructor();

  /**
   * The factory method to create the requested connection type
   *
   * @param sourcePort The source port for the connection
   * @param targetPort The target port for the connection
   * @param callback Function to be called after the connection is created
   * @param dropTarget The drop target
   */
  createConnection(sourcePort: Port, targetPort: Port, callback?: (connection: Connection) => void, dropTarget?: Figure): Connection;
}

/**
 * Policy that allows connections to be created via drag and drop
 * between ports
 */
export class DragConnectionCreatePolicy extends ConnectionCreatePolicy {
  /**
   * Creates a new drag connection creation policy
   */
  constructor();

  /**
   * Called by the framework during drag&drop operations.
   *
   * @param draggedFigure The dragged figure
   * @param x The x-coordinate of the mouse event
   * @param y The y-coordinate of the mouse event
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onDragStart(draggedFigure: Figure, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): boolean;

  /**
   * Called by the framework during drag&drop operations.
   *
   * @param draggedFigure The dragged figure
   * @param dx The x delta movement
   * @param dy The y delta movement
   * @param dx2 The x delta since last call
   * @param dy2 The y delta since last call
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onDrag(draggedFigure: Figure, dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called by the framework when a drag ends.
   *
   * @param draggedFigure The dragged figure
   * @param x The x-coordinate of the mouse
   * @param y The y-coordinate of the mouse
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onDragEnd(draggedFigure: Figure, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;
}

/**
 * Policy that allows connections to be created by clicking on
 * source port and then clicking on target port
 */
export class ClickConnectionCreatePolicy extends ConnectionCreatePolicy {
  /**
   * Creates a new click connection creation policy
   */
  constructor();

  /**
   * Flag indicating active connection creation mode
   */
  readonly isInValidConnection: boolean;

  /**
   * Temporary connection for visual feedback
   */
  readonly currentDropConnection: Connection | null;

  /**
   * Called if the user clicks on an element/connection.
   *
   * @param figure The figure or connection that has been clicked
   * @param mouseX The x-coordinate of the mouse event
   * @param mouseY The y-coordinate of the mouse event
   */
  onClick(figure: Figure, mouseX: number, mouseY: number): boolean;

  /**
   * Called if the user moves the mouse within the canvas.
   *
   * @param dx The x delta movement
   * @param dy The y delta movement
   * @param dx2 The x delta since last call
   * @param dy2 The y delta since last call
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onMouseMove(dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): boolean;
}

/**
 * Policy that creates orthogonal connections between ports
 */
export class OrthogonalConnectionCreatePolicy extends ConnectionCreatePolicy {
  /**
   * Creates a new orthogonal connection creation policy
   */
  constructor();

  /**
   * The factory method to create the requested connection type
   * with orthogonal routing
   *
   * @param sourcePort The source port for the connection
   * @param targetPort The target port for the connection
   * @param callback Function to be called after the connection is created
   * @param dropTarget The drop target
   */
  createConnection(sourcePort: Port, targetPort: Port, callback?: (connection: Connection) => void, dropTarget?: Figure): Connection;
}

/**
 * Policy that combines different connection create policies
 * to provide multiple connection creation mechanisms
 */
export class ComposedConnectionCreatePolicy extends ConnectionCreatePolicy {
  /**
   * Creates a new composed connection creation policy
   *
   * @param policies Array of policies to compose
   */
  constructor(policies: ConnectionCreatePolicy[]);

  /**
   * Delegate policies for connection creation
   */
  readonly delegateTargets: ConnectionCreatePolicy[];
}
