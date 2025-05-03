import { Figure } from '../core/figure';
import { Connection } from '../core/connection';
import { Canvas } from '../core/canvas';
import { AbstractPolicy } from './editpolicy';
import { SelectionFeedbackPolicy } from './figure';

/**
 * Base class for line selection feedback policies
 *
 * These policies define how a selected connection is visually highlighted
 */
export class LineSelectionFeedbackPolicy extends SelectionFeedbackPolicy {
  /**
   * Creates a new line selection feedback policy
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Called by the framework if the related line has been selected
   *
   * @param canvas The canvas where the selection occurs
   * @param figure The selected connection
   * @param isPrimarySelection True if this is the primary selection
   */
  onSelect(canvas: Canvas, figure: Connection, isPrimarySelection: boolean): void;

  /**
   * Called if the figure has been moved
   *
   * @param canvas The canvas containing the figure
   * @param figure The figure that has been moved
   */
  moved(canvas: Canvas, figure: Connection): void;

  /**
   * Called by the framework if the related line has been unselected
   *
   * @param canvas The canvas where the deselection occurs
   * @param figure The unselected connection
   */
  onUnselect(canvas: Canvas, figure: Connection): void;
}

/**
 * Policy that shows selection handles at each vertex of a polyline/connection
 */
export class VertexSelectionFeedbackPolicy extends LineSelectionFeedbackPolicy {
  /**
   * Creates a new vertex selection feedback policy
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Selection handles for the vertices
   * @private
   */
  protected selectionHandles: Figure[];

  /**
   * Called by the framework if the related line has been selected
   *
   * @param canvas The canvas where the selection occurs
   * @param figure The selected connection
   * @param isPrimarySelection True if this is the primary selection
   */
  onSelect(canvas: Canvas, figure: Connection, isPrimarySelection: boolean): void;

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
   * @param canvas The canvas where the deselection occurs
   * @param figure The unselected connection
   */
  onUnselect(canvas: Canvas, figure: Connection): void;
}

/**
 * Policy that shows orthogonal selection handles for connections
 * that follow an orthogonal router
 */
export class OrthogonalSelectionFeedbackPolicy extends VertexSelectionFeedbackPolicy {
  /**
   * Creates a new orthogonal selection feedback policy
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Called by the framework if the related line has been selected
   *
   * @param canvas The canvas where the selection occurs
   * @param figure The selected connection
   * @param isPrimarySelection True if this is the primary selection
   */
  onSelect(canvas: Canvas, figure: Connection, isPrimarySelection: boolean): void;
}
