import { Figure } from './figure';
import { Connection } from './connection';
import { Port } from './port';
import { Point, Rectangle } from '../geo';
import { Selection } from '../util';
import { CommandStack } from '../command';
import { ArrayList } from '../util/arraylist';
import { EditPolicy } from '../policy/editpolicy';
import { RegionEditPolicy } from '../policy/figure';
import { ZoomPolicy } from '../policy/canvas';
import { ConnectionAnchor } from '../layout/anchor/connectionanchor';
import { Raphael } from '../../src/lib/raphael.exec';

/**
 * A scrolling Canvas that contains Figures.
 */
export class Canvas {
  /**
   * Create a new canvas with the given HTML DOM references.
   * @param canvasId The id of the DOM element to use as parent container
   * @param width Optional width for the canvas
   * @param height Optional height for the canvas
   */
  constructor(canvasId: string, width?: number, height?: number);

  /** The name identifier of this canvas */
  readonly NAME: string;

  /** The unique id of this canvas */
  readonly canvasId: string;

  /** The jQuery selection of the canvas element */
  readonly html: any; // JQuery;

  /** The Raphael paper object for drawing */
  readonly paper: Raphael.Paper;

  /** The current zoom factor */
  zoomFactor: number;

  /** The current selection */
  readonly selection: Selection;

  /** Current drop target during drag and drop operation */
  readonly currentDropTarget: Figure | null;

  /** Current hover figure during drag and drop operation */
  readonly currentHoverFigure: Figure | null;

  /** The installed region constraint for figures */
  readonly regionDragDropConstraint: RegionEditPolicy;

  /** The list of all installed edit policies */
  readonly editPolicy: ArrayList<EditPolicy>;

  /** All figures in the canvas */
  readonly figures: ArrayList<Figure>;

  /** All connections in the canvas */
  readonly lines: ArrayList<Connection>;

  /** All ports in the canvas */
  readonly commonPorts: ArrayList<Port>;

  /** All resize handles that are currently visible */
  readonly resizeHandles: ArrayList<Figure>;

  /** The command stack for undo/redo operations */
  readonly commandStack: CommandStack;

  /** A list of connections that need to be repainted after drag/drop */
  readonly linesToRepaintAfterDragDrop: ArrayList<Connection>;

  /** A list of line intersections in the canvas */
  readonly lineIntersections: ArrayList<any>;

  /** The zoom policy for this canvas */
  readonly zoomPolicy: ZoomPolicy | null;

  /**
   * Reset the canvas and delete all model elements.
   * @returns this
   */
  clear(): this;

  /**
   * Callback for any kind of image export tools to trigger the canvas to hide all unwanted decorations.
   */
  hideDecoration(): void;

  /**
   * Callback method for any image export writer to reactivate the decoration of the canvas.
   */
  showDecoration(): void;

  /**
   * Calculate all connection intersection of the canvas.
   * @private
   * @returns this
   */
  calculateConnectionIntersection(): this;

  /**
   * Install a new selection and edit policy into the canvas
   * @param policy The policy to install
   * @returns this
   */
  installEditPolicy(policy: EditPolicy): this;

  /**
   * Uninstall the selection and edit policy from the canvas.
   * @param policy The policy to uninstall or the name of the policy to remove
   * @returns this
   */
  uninstallEditPolicy(policy: EditPolicy | string): this;

  /**
   * Get all drop interceptor policies
   * @returns A clone of the list of drop interceptor policies
   */
  getDropInterceptorPolicies(): ArrayList<any>;

  /**
   * Set the new zoom factor for the canvas.
   * @param zoomFactor New zoom factor (range [0.001..10]). 1.0 is no zoom.
   * @param animated Set to true for smooth zoom in/out
   */
  setZoom(zoomFactor: number, animated?: boolean): void;

  /**
   * Return the current zoom factor of the canvas.
   * @returns The current zoom factor
   */
  getZoom(): number;

  /**
   * Return the dimension of the drawing area
   * @returns The dimension as Rectangle
   */
  getDimension(): Rectangle;

  /**
   * Set the dimension of the canvas
   * @param dim The dimension or width if passing a number
   * @param height The height if first parameter is a number
   * @returns this
   */
  setDimension(dim: Rectangle | number | { width: number, height: number }, height?: number): this;

  /**
   * Transforms a document coordinate to canvas coordinate.
   * @param x The x coordinate relative to the window
   * @param y The y coordinate relative to the window
   * @returns The coordinate in relation to the canvas [0,0] position
   */
  fromDocumentToCanvasCoordinate(x: number, y: number): Point;

  /**
   * Transforms a canvas coordinate to document coordinate.
   * @param x The x coordinate in the canvas
   * @param y The y coordinate in the canvas
   * @returns The coordinate in relation to the document [0,0] position
   */
  fromCanvasToDocumentCoordinate(x: number, y: number): Point;

  /**
   * Get the DOM host of the canvas
   * @returns The HTML element
   */
  getHtmlContainer(): HTMLElement;

  /**
   * Set the area which is scrolling the canvas.
   * @param elementSelector jQuery selector or jQuery node
   * @returns this
   */
  setScrollArea(elementSelector: string | HTMLElement): this;

  /**
   * Get the scrolling area of the canvas.
   * @returns The jQuery object
   */
  getScrollArea(): any; // JQuery;

  /**
   * Get the left scroll position.
   * @returns The left scroll offset
   */
  getScrollLeft(): number;

  /**
   * Get the top scroll position
   * @returns The top scroll offset
   */
  getScrollTop(): number;

  /**
   * Set left scroll position.
   * @param left The left scroll offset
   * @returns this
   */
  setScrollLeft(left: number): this;

  /**
   * Set top scroll position
   * @param top The top scroll offset
   * @returns this
   */
  setScrollTop(top: number): this;

  /**
   * Set the new scroll position of the canvas
   * @param top The top scroll offset
   * @param left The left scroll offset
   * @returns this
   */
  scrollTo(top: number, left: number): this;

  /**
   * Get the absolute document x offset.
   * @returns The x offset
   */
  getAbsoluteX(): number;

  /**
   * Get the absolute document y offset.
   * @returns The y offset
   */
  getAbsoluteY(): number;

  /**
   * Get the width of the canvas
   * @returns The width
   */
  getWidth(): number;

  /**
   * Get the height of the canvas
   * @returns The height
   */
  getHeight(): number;

  /**
   * Add a figure at the given x/y coordinate.
   * @param figure The figure to add
   * @param x The x position or Point object
   * @param y The y position if x is a number
   * @returns this
   */
  add(figure: Figure, x?: number | Point, y?: number): this;

  /**
   * Remove a figure or connection from the Canvas.
   * @param figure The figure to remove
   * @returns this
   */
  remove(figure: Figure): this;

  /**
   * Get all lines/connections in this canvas.
   * @returns The list of lines
   */
  getLines(): ArrayList<Connection>;

  /**
   * Get all figures in this canvas.
   * @returns The list of figures
   */
  getFigures(): ArrayList<Figure>;

  /**
   * Get the line or connection with the given id.
   * @param id The id of the line
   * @returns The line or null
   */
  getLine(id: string): Connection | null;

  /**
   * Get the figure with the given id.
   * @param id The id of the figure
   * @returns The figure or null
   */
  getFigure(id: string): Figure | null;

  /**
   * Get all intersections between the given line and all other lines in the canvas.
   * @param line The line to check for intersections
   * @returns The list of intersections
   */
  getIntersection(line: Connection): ArrayList<{ x: number, y: number, justTouching: boolean, other: Connection }>;

  /**
   * Adjust the coordinate with the installed SnapToHelper.
   * @param figure The related figure
   * @param pos The position to adjust
   * @returns The adjusted position
   * @private
   */
  snapToHelper(figure: Figure, pos: Point): Point;

  /**
   * Register a port to the canvas. Required for other ports to find valid drop targets.
   * @param port The new port to register
   * @returns this
   */
  registerPort(port: Port): this;

  /**
   * Remove a port from the internal canvas registration.
   * @param port The port to unregister
   * @returns this
   */
  unregisterPort(port: Port): this;

  /**
   * Get all ports in the canvas
   * @returns All ports from all figures
   */
  getAllPorts(): ArrayList<Port>;

  /**
   * Get the command stack for the Canvas.
   * @returns The command stack
   */
  getCommandStack(): CommandStack;

  /**
   * Get the current selected figure in the Canvas.
   * @returns The primary selection
   */
  getPrimarySelection(): Figure | null;

  /**
   * Get the current selection.
   * @returns The selection
   */
  getSelection(): Selection;

  /**
   * Set the current selected figure or figures in the canvas.
   * @param object The figure or list of figures to select
   * @returns this
   */
  setCurrentSelection(object: Figure | ArrayList<Figure>): this;

  /**
   * Add the current figure to the selection.
   * @param object The figure or list of figures to add
   * @returns this
   */
  addSelection(object: Figure | ArrayList<Figure>): this;

  /**
   * Get the best figure at the location [x,y].
   * @param x The x position
   * @param y The y position
   * @param blacklist Figures or classes to ignore
   * @param whitelist Figures or classes to consider
   * @returns The best figure
   */
  getBestFigure(x: number, y: number, blacklist?: Figure | Figure[] | Function, whitelist?: Figure | Figure[] | Function): Figure | null;

  /**
   * Get the line which match the hands over coordinate
   * @param x The x-coordinate for the hit test
   * @param y The y-coordinate for the hit test
   * @param lineToIgnore A possible line to ignore
   * @returns The matching line
   */
  getBestLine(x: number, y: number, lineToIgnore?: Connection | Connection[]): Connection | null;

  /**
   * Callback for drag enter events during drag and drop operations.
   * @param draggedDomNode The DOM element being dragged
   */
  onDragEnter(draggedDomNode: HTMLElement): void;

  /**
   * Callback for drag events during drag and drop operations.
   * @param draggedDomNode The dragged DOM element
   * @param x The x coordinate of the drag
   * @param y The y coordinate of the drag
   * @param shiftKey True if the shift key is pressed
   * @param ctrlKey True if the ctrl key is pressed
   */
  onDrag(draggedDomNode: HTMLElement, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Callback for drag leave events during drag and drop operations.
   * @param draggedDomNode The figure being dragged
   */
  onDragLeave(draggedDomNode: HTMLElement): void;

  /**
   * Callback for drop events during drag and drop operations.
   * @param droppedDomNode The dropped DOM element
   * @param x The x-coordinate of the drop
   * @param y The y-coordinate of the drop
   * @param shiftKey True if the shift key was pressed
   * @param ctrlKey True if the ctrl key was pressed
   */
  onDrop(droppedDomNode: HTMLElement, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Callback for double click events.
   * @param x The x-coordinate of the event
   * @param y The y-coordinate of the event
   * @param shiftKey True if the shift key was pressed
   * @param ctrlKey True if the ctrl key was pressed
   * @private
   */
  onDoubleClick(x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Callback for click events.
   * @param x The x-coordinate of the event
   * @param y The y-coordinate of the event
   * @param shiftKey True if the shift key was pressed
   * @param ctrlKey True if the ctrl key was pressed
   * @private
   */
  onClick(x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Callback for right mouse down events.
   * @param x The x-coordinate of the event
   * @param y The y-coordinate of the event
   * @param shiftKey True if the shift key was pressed
   * @param ctrlKey True if the ctrl key was pressed
   * @private
   */
  onRightMouseDown(x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Callback for mouse wheel events.
   * @param wheelDelta The delta of the wheel rotation
   * @param x The x-coordinate of the event
   * @param y The y-coordinate of the event
   * @param shiftKey True if the shift key was pressed
   * @param ctrlKey True if the ctrl key was pressed
   * @private
   */
  onMouseWheel(wheelDelta: number, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): boolean;

  /**
   * Execute all handlers and behaviors attached to the canvas for the given event type.
   * @param event The event to trigger
   * @param args Optional parameters for the event callback
   * @private
   */
  fireEvent(event: string, args?: any): void;

  /**
   * Attach an event handler function for one or more events to the canvas.
   * @param event One or more space-separated event types
   * @param callback A function to execute when the event is triggered
   * @returns this
   */
  on(event: string, callback: (emitter: Canvas, args?: any) => void): this;

  /**
   * Remove event handlers from the canvas.
   * @param eventOrFunction The event name or function to remove
   * @returns this
   */
  off(eventOrFunction?: string | Function): this;

  /**
   * Call this method if you didn't need the canvas anymore.
   * Unregisters all event handlers and frees resources.
   */
  destroy(): void;
}
