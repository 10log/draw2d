import { Figure } from '../core/figure';
import { Canvas } from '../core/canvas';
import { AbstractPolicy, CanvasEditPolicy } from './editpolicy';
import { Point } from '../geo/point';
import { Rectangle } from '../geo/rectangle';

/**
 * Basic policy for canvas interactions
 */
export class CanvasPolicy extends CanvasEditPolicy {
  /**
   * Creates a new canvas policy
   */
  constructor();

  /**
   * Called by the host if the user double clicks on the canvas.
   *
   * @param canvas The canvas where the event occurred
   * @param x The x-coordinate of the mouse event
   * @param y The y-coordinate of the mouse event
   */
  onDoubleClick(canvas: Canvas, x: number, y: number): boolean;

  /**
   * Called by the host if the user clicks on the canvas.
   *
   * @param canvas The canvas where the event occurred
   * @param x The x-coordinate of the mouse event
   * @param y The y-coordinate of the mouse event
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   */
  onClick(canvas: Canvas, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called if the user starts a drag&drop operation on the canvas.
   *
   * @param canvas The canvas where the event occurred
   * @param x The x-coordinate of the mouse event
   * @param y The y-coordinate of the mouse event
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   */
  onMouseDrag(canvas: Canvas, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called by the canvas if the user moves the mouse.
   *
   * @param canvas The canvas where the event occurred
   * @param x The x-coordinate of the mouse event
   * @param y The y-coordinate of the mouse event
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   */
  onMouseMove(canvas: Canvas, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): boolean;

  /**
   * Called by the canvas if the user releases the mouse button.
   *
   * @param canvas The canvas where the event occurred
   * @param x The x-coordinate of the mouse event
   * @param y The y-coordinate of the mouse event
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   */
  onMouseUp(canvas: Canvas, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;
}

/**
 * Base class for all selection policies for a canvas
 */
export class SelectionPolicy extends CanvasPolicy {
  /**
   * Creates a new selection policy
   */
  constructor();

  /**
   * Handle figures that already exist on the canvas when the policy is installed
   *
   * @param canvas The canvas with the policy
   */
  initialize(canvas: Canvas): void;

  /**
   * Called when a new element is added to the canvas
   *
   * @param canvas The canvas where the element is added
   * @param figure The added figure
   */
  onInstallEditPolicy(canvas: Canvas, figure: Figure): void;
}

/**
 * Policy for basic selection handling of figures
 */
export class SingleSelectionPolicy extends SelectionPolicy {
  /**
   * Creates a single selection policy
   */
  constructor();
}

/**
 * Policy that allows the selection of multiple figures
 * by drawing a bounding box
 */
export class BoundingboxSelectionPolicy extends SelectionPolicy {
  /**
   * Creates a boundingbox selection policy
   */
  constructor();

  /**
   * Selection rectangle for multiple selection
   * @private
   */
  protected boundingBoxFigure: Figure | null;

  /**
   * Start point of the selection rectangle
   * @private
   */
  protected x1: number;

  /**
   * Start point of the selection rectangle
   * @private
   */
  protected y1: number;
}

/**
 * Policy that prevents the selection of any figure
 */
export class ReadOnlySelectionPolicy extends SelectionPolicy {
  /**
   * Creates a read-only selection policy
   */
  constructor();
}

/**
 * Policy that allows panning the canvas by dragging
 */
export class PanningSelectionPolicy extends SelectionPolicy {
  /**
   * Creates a panning selection policy
   */
  constructor();
}

/**
 * Policy that shows a grid in the background of the canvas
 */
export class ShowGridEditPolicy extends AbstractPolicy {
  /**
   * Creates a grid edit policy
   *
   * @param grid Grid size in pixels
   * @param color Grid color
   */
  constructor(grid?: number, color?: string);

  /**
   * Grid spacing in pixels
   */
  grid: number;

  /**
   * Grid color
   */
  color: string;

  /**
   * Called if the policy is installed into the canvas
   *
   * @param canvas The owner of the policy
   */
  onInstall(canvas: Canvas): void;

  /**
   * Called if the policy is deinstalled from the canvas
   *
   * @param canvas The owner of the policy
   */
  onUninstall(canvas: Canvas): void;
}

/**
 * Policy that shows a dotted grid in the background
 */
export class ShowDotEditPolicy extends ShowGridEditPolicy {
  /**
   * Creates a dot grid policy
   *
   * @param grid Grid size in pixels
   * @param color Grid color
   */
  constructor(grid?: number, color?: string);
}

/**
 * Policy that shows a chessboard grid in the background
 */
export class ShowChessboardEditPolicy extends ShowGridEditPolicy {
  /**
   * Creates a chessboard grid policy
   *
   * @param grid Grid size in pixels
   * @param color1 First color of the chessboard
   * @param color2 Second color of the chessboard
   */
  constructor(grid?: number, color1?: string, color2?: string);

  /**
   * Second color for the chessboard
   */
  color2: string;
}

/**
 * Policy that shows a dimetric grid in the background
 */
export class ShowDimetricGridEditPolicy extends ShowGridEditPolicy {
  /**
   * Creates a dimetric grid policy
   *
   * @param grid Grid size in pixels
   * @param color Grid color
   */
  constructor(grid?: number, color?: string);
}

/**
 * Base class for all snap-to policies for canvas
 */
export class SnapToEditPolicy extends AbstractPolicy {
  /**
   * Creates a new snap-to policy
   */
  constructor();

  /**
   * Adjusts a figure's position/size based on snapping rules
   *
   * @param canvas The canvas where the figure is being edited
   * @param figure The figure being edited
   * @param modifiedBounds The original modified bounds before snapping
   */
  snap(canvas: Canvas, figure: Figure, modifiedBounds: Rectangle): Rectangle;
}

/**
 * Policy that snaps figures to a grid
 */
export class SnapToGridEditPolicy extends SnapToEditPolicy {
  /**
   * Creates a new snap-to-grid policy
   *
   * @param grid Grid size in pixels
   */
  constructor(grid?: number);

  /**
   * Grid spacing in pixels
   */
  grid: number;
}

/**
 * Policy that snaps figures to other figure's geometry
 */
export class SnapToGeometryEditPolicy extends SnapToEditPolicy {
  /**
   * Creates a new snap-to-geometry policy
   */
  constructor();
}

/**
 * Policy that snaps figures to the center of other figures
 */
export class SnapToCenterEditPolicy extends SnapToEditPolicy {
  /**
   * Creates a snap-to-center policy
   */
  constructor();
}

/**
 * Policy that snaps figures to points between other figures
 */
export class SnapToInBetweenEditPolicy extends SnapToEditPolicy {
  /**
   * Creates a snap-to-inbetween policy
   */
  constructor();
}

/**
 * Policy that snaps figures to vertices of other figures
 */
export class SnapToVerticesEditPolicy extends SnapToEditPolicy {
  /**
   * Creates a snap-to-vertices policy
   */
  constructor();
}

/**
 * Policy that snaps figures to a dimetric grid
 */
export class SnapToDimetricGridEditPolicy extends SnapToEditPolicy {
  /**
   * Creates a snap-to-dimetric-grid policy
   *
   * @param grid Grid size in pixels
   */
  constructor(grid?: number);

  /**
   * Grid spacing in pixels
   */
  grid: number;
}

/**
 * Base class for keyboard interaction policies
 */
export class KeyboardPolicy extends AbstractPolicy {
  /**
   * Creates a new keyboard policy
   */
  constructor();

  /**
   * Called if the user presses a key on the keyboard
   *
   * @param canvas The canvas where the event occurred
   * @param keyCode The key code of the pressed key
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   */
  onKeyDown(canvas: Canvas, keyCode: number, shiftKey: boolean, ctrlKey: boolean): boolean;

  /**
   * Called if the user releases a key on the keyboard
   *
   * @param canvas The canvas where the event occurred
   * @param keyCode The key code of the released key
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   */
  onKeyUp(canvas: Canvas, keyCode: number, shiftKey: boolean, ctrlKey: boolean): boolean;
}

/**
 * Default keyboard policy implementation with common keyboard shortcuts
 */
export class DefaultKeyboardPolicy extends KeyboardPolicy {
  /**
   * Creates a default keyboard policy
   */
  constructor();
}

/**
 * Extended keyboard policy with additional shortcuts
 */
export class ExtendedKeyboardPolicy extends DefaultKeyboardPolicy {
  /**
   * Creates an extended keyboard policy
   */
  constructor();
}

/**
 * Policy that allows zooming the canvas with the mouse wheel
 */
export class WheelZoomPolicy extends AbstractPolicy {
  /**
   * Creates a wheel zoom policy
   */
  constructor();

  /**
   * Called by the host if the user uses the mouse wheel
   *
   * @param canvas The canvas where the event occurred
   * @param wheelDelta The mouse wheel delta
   * @param x The x-coordinate of the mouse position
   * @param y The y-coordinate of the mouse position
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   */
  onMouseWheel(canvas: Canvas, wheelDelta: number, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): boolean;
}

/**
 * Abstract base policy for zooming a canvas
 */
export class ZoomPolicy extends AbstractPolicy {
  /**
   * Creates a zoom policy
   */
  constructor();

  /**
   * Set the zoom level of the canvas
   *
   * @param canvas The canvas to zoom
   * @param zoomFactor The zoom factor to set
   */
  setZoom(canvas: Canvas, zoomFactor: number): void;
}

/**
 * Policy that moves selected objects as "ghosts" during drag operations
 */
export class GhostMoveSelectionPolicy extends BoundingboxSelectionPolicy {
  /**
   * Creates a ghost move selection policy
   */
  constructor();
}

/**
 * Base class for decoration policies that add visual decoration to the canvas
 */
export class DecorationPolicy extends AbstractPolicy {
  /**
   * Creates a decoration policy
   */
  constructor();
}

/**
 * Decoration policy that creates a corona effect
 */
export class CoronaDecorationPolicy extends DecorationPolicy {
  /**
   * Creates a corona decoration policy
   */
  constructor();

  /**
   * Called if a figure has been moved
   *
   * @param canvas The canvas containing the figure
   * @param figure The figure that has been moved
   */
  onFigureMoved(canvas: Canvas, figure: Figure): void;
}

/**
 * Decoration policy with fadeout effect
 */
export class FadeoutDecorationPolicy extends DecorationPolicy {
  /**
   * Creates a fadeout decoration policy
   */
  constructor();
}

/**
 * Policy for handling drop interception on canvas
 */
export class DropInterceptorPolicy extends AbstractPolicy {
  /**
   * Creates a drop interceptor policy
   */
  constructor();

  /**
   * Called if the framework receives a drop event.
   *
   * @param canvas The canvas where the drop occurred
   * @param droppedDomNode The dropped DOM node
   * @param x The x-coordinate of the drop event
   * @param y The y-coordinate of the drop event
   * @param shiftKey True if the shift key is pressed during the event
   */
  onDrop(canvas: Canvas, droppedDomNode: HTMLElement, x: number, y: number, shiftKey: boolean): boolean;
}
