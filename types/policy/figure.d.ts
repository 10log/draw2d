import { Figure } from '../core/figure';
import { AbstractPolicy, FigureEditPolicy } from './editpolicy';
import { Canvas } from '../core/canvas';
import { Rectangle } from '../geo/rectangle';

/**
 * Base class for figure edit policies
 */
export class FigurePolicy extends FigureEditPolicy {
  /**
   * Creates a new figure policy
   */
  constructor();
}

/**
 * Policy that allows figures to be dragged and dropped
 */
export class DragDropEditPolicy extends FigurePolicy {
  /**
   * Creates a new drag and drop policy
   */
  constructor();

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

/**
 * Base class for all feedback policies for selections
 */
export class SelectionFeedbackPolicy extends FigurePolicy {
  /**
   * Creates a selection feedback policy
   */
  constructor();

  /**
   * Called by the framework if the related figure has been selected.
   *
   * @param canvas The canvas where the selection occurs
   * @param figure The selected figure
   * @param isPrimarySelection True if this is the primary selection
   */
  onSelect(canvas: Canvas, figure: Figure, isPrimarySelection: boolean): void;

  /**
   * Called by the framework if the related figure has been unselected.
   *
   * @param canvas The canvas where the deselection occurs
   * @param figure The unselected figure
   */
  onUnselect(canvas: Canvas, figure: Figure): void;
}

/**
 * Feedback policy that shows a rectangle around the selected figure
 */
export class RectangleSelectionFeedbackPolicy extends SelectionFeedbackPolicy {
  /**
   * Creates a rectangle selection feedback policy
   */
  constructor();

  /**
   * Called by the framework if the related figure has been selected.
   *
   * @param canvas The canvas where the selection occurs
   * @param figure The selected figure
   * @param isPrimarySelection True if this is the primary selection
   */
  onSelect(canvas: Canvas, figure: Figure, isPrimarySelection: boolean): void;

  /**
   * Called by the framework if the related figure has been unselected.
   *
   * @param canvas The canvas where the deselection occurs
   * @param figure The unselected figure
   */
  onUnselect(canvas: Canvas, figure: Figure): void;
}

/**
 * Feedback policy that shows a big rectangle around the selected figure
 */
export class BigRectangleSelectionFeedbackPolicy extends RectangleSelectionFeedbackPolicy {
  /**
   * Creates a big rectangle selection feedback policy
   */
  constructor();
}

/**
 * Feedback policy that shows a glow effect around the selected figure
 */
export class GlowSelectionFeedbackPolicy extends SelectionFeedbackPolicy {
  /**
   * Creates a glow selection feedback policy
   */
  constructor();

  /**
   * Called by the framework if the related figure has been selected.
   *
   * @param canvas The canvas where the selection occurs
   * @param figure The selected figure
   * @param isPrimarySelection True if this is the primary selection
   */
  onSelect(canvas: Canvas, figure: Figure, isPrimarySelection: boolean): void;

  /**
   * Called by the framework if the related figure has been unselected.
   *
   * @param canvas The canvas where the deselection occurs
   * @param figure The unselected figure
   */
  onUnselect(canvas: Canvas, figure: Figure): void;
}

/**
 * Feedback policy that shows a round rectangle around the selected figure
 */
export class RoundRectangleSelectionFeedbackPolicy extends RectangleSelectionFeedbackPolicy {
  /**
   * Creates a round rectangle selection feedback policy
   */
  constructor();
}

/**
 * Feedback policy that shows an animated ant-line selection around the figure
 */
export class AntSelectionFeedbackPolicy extends SelectionFeedbackPolicy {
  /**
   * Creates an ant-line selection feedback policy
   */
  constructor();

  /**
   * Called by the framework if the related figure has been selected.
   *
   * @param canvas The canvas where the selection occurs
   * @param figure The selected figure
   * @param isPrimarySelection True if this is the primary selection
   */
  onSelect(canvas: Canvas, figure: Figure, isPrimarySelection: boolean): void;

  /**
   * Called by the framework if the related figure has been unselected.
   *
   * @param canvas The canvas where the deselection occurs
   * @param figure The unselected figure
   */
  onUnselect(canvas: Canvas, figure: Figure): void;
}

/**
 * Feedback policy that shows a slim selection border around the figure
 */
export class SlimSelectionFeedbackPolicy extends SelectionFeedbackPolicy {
  /**
   * Creates a slim selection feedback policy
   */
  constructor();

  /**
   * Called by the framework if the related figure has been selected.
   *
   * @param canvas The canvas where the selection occurs
   * @param figure The selected figure
   * @param isPrimarySelection True if this is the primary selection
   */
  onSelect(canvas: Canvas, figure: Figure, isPrimarySelection: boolean): void;

  /**
   * Called by the framework if the related figure has been unselected.
   *
   * @param canvas The canvas where the deselection occurs
   * @param figure The unselected figure
   */
  onUnselect(canvas: Canvas, figure: Figure): void;
}

/**
 * Policy that restricts movement to a specific region
 */
export class RegionEditPolicy extends FigurePolicy {
  /**
   * Creates a region constraint policy
   *
   * @param x The x-coordinate of the allowed region
   * @param y The y-coordinate of the allowed region
   * @param width The width of the allowed region
   * @param height The height of the allowed region
   */
  constructor(x: number, y: number, width: number, height: number);

  /**
   * The constraint region
   */
  constRect: Rectangle;

  /**
   * Adjust the coordinates to constraint the figure to the defined region
   *
   * @param figure The figure to constraint
   * @param x The desired x-coordinate
   * @param y The desired y-coordinate
   */
  adjustPosition(figure: Figure, x: number, y: number): {x: number, y: number};

  /**
   * Adjust the dimensions to constraint the figure to the defined region
   *
   * @param figure The figure to constraint
   * @param w The desired width
   * @param h The desired height
   */
  adjustDimension(figure: Figure, w: number, h: number): {w: number, h: number};
}

/**
 * Policy that restricts movement to vertical direction only
 */
export class VerticalEditPolicy extends FigurePolicy {
  /**
   * Creates a vertical constraint policy
   */
  constructor();

  /**
   * Called by the framework if the user edit the position of a figure with drag&drop
   * or arrow keys.
   *
   * @param canvas The related canvas
   * @param figure The figure to modify
   * @param x The new x-coordinate
   * @param y The new y-coordinate
   */
  moved(canvas: Canvas, figure: Figure, x: number, y: number): {x: number, y: number};
}

/**
 * Policy that restricts movement to horizontal direction only
 */
export class HorizontalEditPolicy extends FigurePolicy {
  /**
   * Creates a horizontal constraint policy
   */
  constructor();

  /**
   * Called by the framework if the user edit the position of a figure with drag&drop
   * or arrow keys.
   *
   * @param canvas The related canvas
   * @param figure The figure to modify
   * @param x The new x-coordinate
   * @param y The new y-coordinate
   */
  moved(canvas: Canvas, figure: Figure, x: number, y: number): {x: number, y: number};
}

/**
 * Feedback policy for bus-shaped selection indicators
 */
export class BusSelectionFeedbackPolicy extends SelectionFeedbackPolicy {
  /**
   * Creates a bus selection feedback policy
   */
  constructor();

  /**
   * Called by the framework if the related figure has been selected.
   *
   * @param canvas The canvas where the selection occurs
   * @param figure The selected figure
   * @param isPrimarySelection True if this is the primary selection
   */
  onSelect(canvas: Canvas, figure: Figure, isPrimarySelection: boolean): void;

  /**
   * Called by the framework if the related figure has been unselected.
   *
   * @param canvas The canvas where the deselection occurs
   * @param figure The unselected figure
   */
  onUnselect(canvas: Canvas, figure: Figure): void;
}

/**
 * Feedback policy for horizontal bus-shaped selection indicators
 */
export class HBusSelectionFeedbackPolicy extends BusSelectionFeedbackPolicy {
  /**
   * Creates a horizontal bus selection feedback policy
   */
  constructor();
}

/**
 * Feedback policy for vertical bus-shaped selection indicators
 */
export class VBusSelectionFeedbackPolicy extends BusSelectionFeedbackPolicy {
  /**
   * Creates a vertical bus selection feedback policy
   */
  constructor();
}

/**
 * Feedback policy for selection indicators that include resize handles
 */
export class ResizeSelectionFeedbackPolicy extends SelectionFeedbackPolicy {
  /**
   * Creates a resize selection feedback policy
   */
  constructor();

  /**
   * Called by the framework if the related figure has been selected.
   *
   * @param canvas The canvas where the selection occurs
   * @param figure The selected figure
   * @param isPrimarySelection True if this is the primary selection
   */
  onSelect(canvas: Canvas, figure: Figure, isPrimarySelection: boolean): void;

  /**
   * Called by the framework if the related figure has been unselected.
   *
   * @param canvas The canvas where the deselection occurs
   * @param figure The unselected figure
   */
  onUnselect(canvas: Canvas, figure: Figure): void;
}

/**
 * Feedback policy for raft-shaped selection indicators
 * (similar to group selection in graphic design software)
 */
export class RaftSelectionFeedbackPolicy extends SelectionFeedbackPolicy {
  /**
   * Creates a raft selection feedback policy
   */
  constructor();

  /**
   * Called by the framework if the related figure has been selected.
   *
   * @param canvas The canvas where the selection occurs
   * @param figure The selected figure
   * @param isPrimarySelection True if this is the primary selection
   */
  onSelect(canvas: Canvas, figure: Figure, isPrimarySelection: boolean): void;

  /**
   * Called by the framework if the related figure has been unselected.
   *
   * @param canvas The canvas where the deselection occurs
   * @param figure The unselected figure
   */
  onUnselect(canvas: Canvas, figure: Figure): void;
}
