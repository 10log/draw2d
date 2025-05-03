import { FigurePolicy } from '../figure';
import { Figure } from '../../core/figure';
import { Canvas } from '../../core/canvas';

/**
 * Policy that allows figures to be dragged and dropped
 */
export class DragDropEditPolicy extends FigurePolicy {
  /**
   * Creates a new drag and drop policy
   * 
   * @param {Object} [attr] Configuration attributes
   * @param {Object} [setter] Setter methods for attributes
   * @param {Object} [getter] Getter methods for attributes
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Called by the framework if the user starts dragging a figure.
   *
   * @param canvas The canvas where the drag occurs
   * @param figure The dragged figure
   * @param x The x-coordinate of the mouse event
   * @param y The y-coordinate of the mouse event
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   */
  onDragStart(canvas: Canvas, figure: Figure, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): boolean;

  /**
   * Called by the framework during a drag operation.
   *
   * @param canvas The canvas where the drag occurs
   * @param figure The dragged figure
   * @param dx The x delta movement
   * @param dy The y delta movement
   * @param dx2 The x delta since last call
   * @param dy2 The y delta since last call
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   */
  onDrag(canvas: Canvas, figure: Figure, dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called by the framework if the user ends the drag operation.
   *
   * @param canvas The canvas where the drag occurs
   * @param figure The dragged figure
   * @param x The x-coordinate of the mouse event
   * @param y The y-coordinate of the mouse event
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   */
  onDragEnd(canvas: Canvas, figure: Figure, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;
}