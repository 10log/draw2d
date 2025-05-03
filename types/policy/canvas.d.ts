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
  
  /**
   * Called if the user drags the mouse
   * 
   * @param canvas The canvas
   * @param dx The x-delta since the start of the drag
   * @param dy The y-delta since the start of the drag
   * @param dx2 The x-delta since the last call
   * @param dy2 The y-delta since the last call
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onMouseDrag(canvas: Canvas, dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): void;
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
 * Zoom support for a canvas. Use the mouse wheel and the shift key to zoom in/out.
 */
export class WheelZoomPolicy extends ZoomPolicy {
  /**
   * Creates a wheel zoom policy
   */
  constructor();

  /**
   * Center point for zooming
   */
  center: { x: number, y: number, clientX: number, clientY: number } | null;

  /**
   * Debounced callback for zoom end
   */
  debouncedZoomedCallback: Function;

  /**
   * Called when the policy is installed
   * 
   * @param canvas The canvas where the policy is installed
   */
  onInstall(canvas: Canvas): void;

  /**
   * Called when the policy is uninstalled
   * 
   * @param canvas The canvas where the policy was installed
   */
  onUninstall(canvas: Canvas): void;

  /**
   * Called by the host if the user uses the mouse wheel
   *
   * @param wheelDelta The mouse wheel delta
   * @param x The x-coordinate of the mouse position
   * @param y The y-coordinate of the mouse position
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   * @returns Return false to prevent the default event operation (e.g. scrolling)
   */
  onMouseWheel(wheelDelta: number, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): boolean;

  /**
   * Set the new zoom level of the canvas
   * 
   * @param zoomFactor The new zoom factor
   * @param animated Whether to animate the zoom
   */
  setZoom(zoomFactor: number, animated?: boolean): void;

  /**
   * Internal zoom implementation
   * 
   * @param zoom The zoom factor
   * @param center The center point for the zoom
   */
  _zoom(zoom: number, center: { x: number, y: number, clientX?: number, clientY?: number }): void;

  /**
   * Returns a debounced function
   * 
   * @param func The function to debounce
   * @param wait The wait time in milliseconds
   * @param immediate Whether to trigger on the leading edge instead of trailing
   */
  _debounce(func: Function, wait: number, immediate?: boolean): Function;
}

/**
 * Abstract base policy for zooming a canvas
 * Generic zoom policy installable into a canvas object.
 * This is the legacy implementation of the very first zooming in
 * Draw2D. You can use this implementation if you want backward compatible.
 */
export class ZoomPolicy extends CanvasPolicy {
  /**
   * Creates a zoom policy
   */
  constructor();

  /**
   * Called when the policy is installed
   * 
   * @param canvas The canvas where the policy is installed
   */
  onInstall(canvas: Canvas): void;

  /**
   * Called when the policy is uninstalled
   * 
   * @param canvas The canvas where the policy was installed
   */
  onUninstall(canvas: Canvas): void;

  /**
   * Set the zoom level of the canvas. The value must be between [0.01..10]
   *
   * @param zoomFactor The zoom factor to set
   * @param animated Set it to true for smooth zoom in/out
   */
  setZoom(zoomFactor: number, animated?: boolean): void;
}

/**
 * Policy that moves selected objects as "ghosts" during drag operations
 * A drag&Drop feedback handler for the canvas. The policy didn't move the
 * shapes in real time rather it shows a ghost rectangle as feedback.
 * The shapes are updated after the drag&drop operation.
 */
export class GhostMoveSelectionPolicy extends SingleSelectionPolicy {
  /**
   * Creates a ghost move selection policy
   */
  constructor();

  /**
   * Clone of the dragged figure for ghost feedback
   */
  clone: Figure | null;

  /**
   * First ghost rectangle for feedback
   */
  ghostRectangle1: Figure | null;

  /**
   * Second ghost rectangle for feedback
   */
  ghostRectangle2: Figure | null;

  /**
   * Called if the user drags the mouse
   * 
   * @param canvas The canvas
   * @param dx The x-delta since the start of the drag
   * @param dy The y-delta since the start of the drag
   * @param dx2 The x-delta since the last call
   * @param dy2 The y-delta since the last call
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onMouseDrag(canvas: Canvas, dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called if the user releases the mouse button
   * 
   * @param canvas The canvas
   * @param x The x-coordinate of the mouse
   * @param y The y-coordinate of the mouse
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onMouseUp(canvas: Canvas, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;
}

/**
 * Base class for decoration policies that add visual decoration to the canvas
 * The base class for any canvas decoration like grid, chessboard, graph paper
 * or other visual enhancements.
 */
export class DecorationPolicy extends CanvasPolicy {
  /**
   * Creates a decoration policy
   * 
   * @param attr Configuration attributes
   * @param setter Setter methods for attributes
   * @param getter Getter methods for attributes
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Called by the canvas if the user moves the mouse.
   *
   * @param canvas The canvas where the event occurred
   * @param x The x-coordinate of the mouse event
   * @param y The y-coordinate of the mouse event
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   */
  onMouseMove(canvas: Canvas, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called if the user starts a drag&drop operation on the canvas.
   *
   * @param canvas The canvas where the event occurred
   * @param dx The x-delta since the start of the drag
   * @param dy The y-delta since the start of the drag
   * @param dx2 The x-delta since the last call
   * @param dy2 The y-delta since the last call
   * @param shiftKey True if the shift key is pressed during the event
   * @param ctrlKey True if the ctrl key is pressed during the event
   */
  onMouseDrag(canvas: Canvas, dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): void;
}

/**
 * Decoration policy that creates a corona effect
 * This decoration hides ports which are too far from the current cursor position.
 * This makes the canvas more clean if you have a lot of nodes on it.
 */
export class CoronaDecorationPolicy extends DecorationPolicy {
  /**
   * Creates a corona decoration policy
   * 
   * @param attr Configuration attributes
   * @param setter Setter methods for attributes
   * @param getter Getter methods for attributes
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Start X position of drag operation
   */
  startDragX: number;

  /**
   * Start Y position of drag operation
   */
  startDragY: number;

  /**
   * Distance in pixel where the port becomes fully visible
   */
  diameterToBeFullVisible: number;

  /**
   * Distance in pixel where the port starts to fade in
   */
  diameterToBeVisible: number;

  /**
   * Sum of both diameters for calculation
   */
  sumDiameter: number;

  /**
   * Set the diameter where ports start to become visible
   * 
   * @param diameter The diameter in pixels
   */
  setDiameterToBeVisible(diameter: number): void;

  /**
   * Get the diameter where ports start to become visible
   */
  getDiameterToBeVisible(): number;

  /**
   * Set the diameter where ports become fully visible
   * 
   * @param diameter The diameter in pixels
   */
  setDiameterToBeFullVisible(diameter: number): void;

  /**
   * Get the diameter where ports become fully visible
   */
  getDiameterToBeFullVisible(): number;

  /**
   * Called if the policy is installed into the canvas
   * 
   * @param canvas The canvas where the policy is installed
   */
  onInstall(canvas: Canvas): void;

  /**
   * Called if the policy is uninstalled from the canvas
   * 
   * @param canvas The canvas where the policy was installed
   */
  onUninstall(canvas: Canvas): void;

  /**
   * Called if the user presses the mouse down
   * 
   * @param canvas The canvas
   * @param x The x-coordinate of the mouse
   * @param y The y-coordinate of the mouse
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onMouseDown(canvas: Canvas, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called if the user moves the mouse
   * 
   * @param canvas The canvas
   * @param x The x-coordinate of the mouse
   * @param y The y-coordinate of the mouse
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onMouseMove(canvas: Canvas, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called if the user drags the mouse
   * 
   * @param canvas The canvas
   * @param dx The x-delta since the last call
   * @param dy The y-delta since the last call
   * @param dx2 The x-delta since the drag started
   * @param dy2 The y-delta since the drag started
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onMouseDrag(canvas: Canvas, dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Update all ports with the new calculated opacity in relation to the distance to the current
   * mouse position
   * 
   * @param canvas The canvas
   * @param x The x-coordinate of the mouse
   * @param y The y-coordinate of the mouse
   */
  updatePorts(canvas: Canvas, x: number, y: number): void;
}

/**
 * Decoration policy with fadeout effect
 * Install this edit policy in a canvas if you want fadeout all decorations like ports, resize handles
 * if the user didn't move the mouse. This is good for a clean representation of your diagram.
 */
export class FadeoutDecorationPolicy extends DecorationPolicy {
  /**
   * Creates a fadeout decoration policy
   */
  constructor();

  /**
   * Default duration for fadeout in timer ticks
   */
  readonly DEFAULT_FADEOUT_DURATION: number;

  /**
   * Default alpha decrement per timer tick
   */
  readonly DEFAULT_ALPHA_DECREMENT: number;

  /**
   * Current alpha value for decorations
   */
  alpha: number;

  /**
   * Current alpha decrement per timer tick
   */
  alphaDec: number;

  /**
   * Counter for hiding ports
   */
  hidePortsCounter: number;

  /**
   * Flag indicating if a port is being dragged
   */
  portDragging: boolean;

  /**
   * Timer ID for the fadeout interval
   */
  timerId: number;

  /**
   * Called when the policy is installed
   * 
   * @param canvas The canvas where the policy is installed
   */
  onInstall(canvas: Canvas): void;

  /**
   * Called when the policy is uninstalled
   * 
   * @param canvas The canvas where the policy was installed
   */
  onUninstall(canvas: Canvas): void;

  /**
   * Timer function to show/hide the related ports
   */
  onTimer(): void;

  /**
   * Called on mouse down
   * 
   * @param canvas The canvas
   * @param x The x-coordinate of the mouse
   * @param y The y-coordinate of the mouse
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onMouseDown(canvas: Canvas, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called on mouse move
   * 
   * @param canvas The canvas
   * @param x The x-coordinate of the mouse
   * @param y The y-coordinate of the mouse
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onMouseMove(canvas: Canvas, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called on mouse drag
   * 
   * @param canvas The canvas
   * @param dx The x-delta since the start of the drag
   * @param dy The y-delta since the start of the drag
   * @param dx2 The x-delta since the last call
   * @param dy2 The y-delta since the last call
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onMouseDrag(canvas: Canvas, dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called on mouse up
   * 
   * @param canvas The canvas
   * @param x The x-coordinate of the mouse
   * @param y The y-coordinate of the mouse
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onMouseUp(canvas: Canvas, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;
}

/**
 * Policy for handling drop interception on canvas
 * 
 * Drop interceptors are basically event handlers from which you can return a value
 * that tells draw2d to abort what it is that it was doing.
 * 
 * The delegateTarget method is responsible for all drop event especially to all 
 * connection and port handling.
 */
export class DropInterceptorPolicy extends CanvasPolicy {
  /**
   * Creates a drop interceptor policy
   * 
   * @param attr Configuration attributes
   * @param setter Setter methods for attributes
   * @param getter Getter methods for attributes
   */
  constructor(attr?: any, setter?: any, getter?: any);

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

  /**
   * Called if the user want connect a port with any kind figure.
   * Return a non null value if the interceptor accept the connect event.
   * 
   * It is possible to delegate the drop event to another figure if the policy
   * returns another figure. This is useful if a figure want to accept a port
   * drop event and delegates this drop event to another port.
   * 
   * @param connectInquirer The figure who wants connect
   * @param connectIntent The potential connect target
   * @returns The calculated connect intent or null if the interceptor uses the veto right
   */
  delegateTarget(connectInquirer: Figure, connectIntent: Figure): Figure | null;
}
