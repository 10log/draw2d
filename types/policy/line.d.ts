import { Figure } from '../core/figure';
import { Connection } from '../core/connection';
import { AbstractPolicy } from './editpolicy';

/**
 * Base class for line selection feedback policies
 *
 * These policies define how a selected connection is visually highlighted
 */
export class LineSelectionFeedbackPolicy extends AbstractPolicy {
  /**
   * Creates a new line selection feedback policy
   */
  constructor();

  /**
   * Called by the framework if the related line has been selected
   *
   * @param connection The selected connection
   */
  onSelect(connection: Connection): void;

  /**
   * Called by the framework if the related line has been unselected
   *
   * @param connection The unselected connection
   */
  onUnselect(connection: Connection): void;
}

/**
 * Policy that shows selection handles at each vertex of a polyline/connection
 */
export class VertexSelectionFeedbackPolicy extends LineSelectionFeedbackPolicy {
  /**
   * Creates a new vertex selection feedback policy
   */
  constructor();

  /**
   * Selection handles for the vertices
   * @private
   */
  protected selectionHandles: Figure[];

  /**
   * Called by the framework if the related line has been selected
   *
   * @param connection The selected connection
   */
  onSelect(connection: Connection): void;

  /**
   * Called if a user moves a selection handle
   *
   * @param line The related connection
   * @param index The index of the vertex handle
   * @param newPos The new position of the vertex
   */
  moveVertex(line: Connection, index: number, newPos: {x: number, y: number}): void;

  /**
   * Remove a vertex from the connection
   *
   * @param line The connection to modify
   * @param index The vertex index to remove
   */
  removeVertex(line: Connection, index: number): void;

  /**
   * Called by the framework if the related line has been unselected
   *
   * @param connection The unselected connection
   */
  onUnselect(connection: Connection): void;
}

/**
 * Policy that shows orthogonal selection handles for connections
 * that follow an orthogonal router
 */
export class OrthogonalSelectionFeedbackPolicy extends VertexSelectionFeedbackPolicy {
  /**
   * Creates a new orthogonal selection feedback policy
   */
  constructor();

  /**
   * Called by the framework if the related line has been selected
   *
   * @param connection The selected connection
   */
  onSelect(connection: Connection): void;
}
