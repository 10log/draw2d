import { Canvas } from './canvas';
import { Point, Rectangle } from '../geo';
import { ArrayList } from '../util/arraylist';
import { Color } from '../util/color';
import { EditPolicy } from '../policy/editpolicy';
import { Command } from '../command/command';
import { CommandType } from '../command/commandtype';
import { Raphael } from '../../src/lib/raphael.exec';

/**
 * Base class for all draw2d shapes.
 */
export class Figure {
  /**
   * Creates a new Figure object
   * @param attr Attributes for initial configuration
   * @param setter Custom setters for attributes
   * @param getter Custom getters for attributes
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The name identifier of this figure */
  readonly NAME: string;

  /** Minimum timer interval in milliseconds */
  readonly MIN_TIMER_INTERVAL: number;

  /** The unique id of this element */
  id: string;

  /** The cached z-order of the figure */
  cachedZOrder: number;

  /** Flag indicating if this is a resize handle */
  isResizeHandle: boolean;

  /** Current command during drag/drop operation */
  command: Command | null;

  /** The canvas this figure belongs to */
  canvas: Canvas | null;

  /** The RaphaelJS element reference */
  shape: Raphael.Element | null;

  /** Children of this figure */
  children: ArrayList<{ figure: Figure, locator: any }>;

  /** Flag indicating if this figure is selectable */
  selectable: boolean;

  /** Flag indicating if this figure is deleteable */
  deleteable: boolean;

  /** Flag indicating if this figure is resizeable */
  resizeable: boolean;

  /** Flag indicating if this figure is draggable */
  draggable: boolean;

  /** Flag indicating if this figure is visible */
  visible: boolean;

  /** Flag indicating if aspect ratio should be kept */
  keepAspectRatio: boolean;

  /** Flag indicating if this figure can snap to helper */
  canSnapToHelper: boolean;

  /** Hot spot for snap to grid */
  snapToGridAnchor: Point;

  /** List of installed edit policies */
  editPolicy: ArrayList<EditPolicy>;

  /** Timer ID for animation */
  timerId: number;

  /** Timer interval for animation */
  timerInterval: number;

  /** Parent figure */
  parent: Figure | null;

  /** Composite container for this figure */
  composite: any | null;

  /** User data for this figure */
  userData: any;

  /** x position */
  x: number;

  /** y position */
  y: number;

  /** Minimum height */
  minHeight: number;

  /** Minimum width */
  minWidth: number;

  /** Rotation angle */
  rotationAngle: number;

  /** CSS class for this figure */
  cssClass: string | null;

  /** Width of the figure */
  width: number;

  /** Height of the figure */
  height: number;

  /** Alpha transparency value */
  alpha: number;

  /** Flag indicating if the figure is in drag/drop mode */
  isInDragDrop: boolean;

  /** Origin x coordinate for drag/drop */
  ox: number;

  /** Origin y coordinate for drag/drop */
  oy: number;

  /** Flag to block repainting */
  repaintBlocked: boolean;

  /** Selection handles */
  selectionHandles: ArrayList<any>;

  /** Panning delegate */
  panningDelegate: Figure | null;

  /** Event subscriptions */
  eventSubscriptions: Record<string, Function[]>;

  /**
   * Read or set shape attributes
   * @param name The attribute name or attribute object
   * @param value Optional value to set
   * @returns The attribute value or this
   */
  attr(name: string | object, value?: any): any;

  /**
   * Add the figure to the current selection
   * @param asPrimarySelection True if this should be the primary selection
   * @returns this
   * @private
   */
  select(asPrimarySelection?: boolean): this;

  /**
   * Unselect the figure
   * @returns this
   * @private
   */
  unselect(): this;

  /**
   * Set the selection adapter function
   * @param adapter Function to handle selection
   * @returns this
   */
  setSelectionAdapter(adapter?: Function): this;

  /**
   * Get the selection adapter function
   * @returns The selection adapter
   */
  getSelectionAdapter(): Function;

  /**
   * Check if the figure is selected
   * @returns True if selected
   */
  isSelected(): boolean;

  /**
   * Set user data for this figure
   * @param object The user data
   * @returns this
   */
  setUserData(object: any): this;

  /**
   * Get the user data of this figure
   * @returns The user data
   */
  getUserData(): any;

  /**
   * Get the UUID of this element
   * @returns The ID
   */
  getId(): string;

  /**
   * Set the id of this element
   * @param newId The new ID
   * @returns this
   */
  setId(newId: string): this;

  /**
   * Get the CSS class of this element
   * @returns The CSS class
   */
  getCssClass(): string | null;

  /**
   * Set the CSS class of this element
   * @param cssClass The new CSS class
   * @returns this
   */
  setCssClass(cssClass: string | null): this;

  /**
   * Check if the figure has a specific CSS class
   * @param className The class to check
   * @returns True if class exists
   */
  hasCssClass(className: string): boolean;

  /**
   * Add a CSS class to the figure
   * @param className The class to add
   * @returns this
   */
  addCssClass(className: string): this;

  /**
   * Remove a CSS class from the figure
   * @param className The class to remove
   * @returns this
   */
  removeCssClass(className: string): this;

  /**
   * Toggle a CSS class on the figure
   * @param className The class to toggle
   * @returns this
   */
  toggleCssClass(className: string): this;

  /**
   * Set the canvas element for this figure
   * @param canvas The new canvas or null
   * @returns this
   */
  setCanvas(canvas: Canvas | null): this;

  /**
   * Get the current canvas
   * @returns The canvas
   */
  getCanvas(): Canvas | null;

  /**
   * Start a timer to call onTimer periodically
   * @param milliSeconds The interval in milliseconds
   * @returns this
   */
  startTimer(milliSeconds: number): this;

  /**
   * Stop the timer
   * @returns this
   */
  stopTimer(): this;

  /**
   * Callback method for timer events
   * @template
   */
  onTimer(): void;

  /**
   * Move the figure to the front
   * @param figure Optional figure to place this in front of
   * @returns this
   */
  toFront(figure?: Figure): this;

  /**
   * Move the figure to the back
   * @param figure Optional figure to place behind
   * @returns this
   */
  toBack(figure?: Figure): this;

  /**
   * Install an edit policy to the figure
   * @param policy The policy to install
   * @returns this
   */
  installEditPolicy(policy: EditPolicy): this;

  /**
   * Uninstall an edit policy from the figure
   * @param policy The policy to uninstall
   */
  uninstallEditPolicy(policy: EditPolicy | string): void;

  /**
   * Add a child figure
   * @param child The figure to add
   * @param locator The locator for positioning
   * @param index Optional index for insertion
   * @returns this
   */
  add(child: Figure, locator: any, index?: number): this;

  /**
   * Remove a child figure
   * @param child The figure to remove
   * @returns The removed element or null
   */
  remove(child: Figure): { figure: Figure, locator: any } | null;

  /**
   * Get all children of this figure
   * @returns List of all children
   */
  getChildren(): ArrayList<Figure>;

  /**
   * Remove all children
   * @returns this
   */
  resetChildren(): this;

  /**
   * Get the current SVG shape element
   * @returns The shape element
   * @protected
   */
  getShapeElement(): Raphael.Element;

  /**
   * Get the top level shape element
   * @returns The top level element
   * @private
   */
  getTopLevelShapeElement(): Raphael.Element;

  /**
   * Create the shape element
   * @returns The created element
   * @template
   * @abstract
   */
  createShapeElement(): Raphael.Element;

  /**
   * Propagate attributes to the shape element
   * @param attributes Optional style attributes
   * @returns this
   * @private
   */
  repaint(attributes?: any): this;

  /**
   * Apply transformation to the shape
   * @returns this
   * @template
   * @private
   */
  applyTransformation(): this;

  /**
   * Highlight the element or remove highlighting
   * @param flag True to enable glow
   * @template
   * @returns this
   */
  setGlow(flag: boolean): this;

  /**
   * Get the bounding box for dragging
   * @returns The bounding box or null
   */
  getHandleBBox(): Rectangle | ArrayList<Rectangle> | null;

  /**
   * Called when drag starts
   * @param x The x-coordinate of mouse
   * @param y The y-coordinate of mouse
   * @param shiftKey True if shift key pressed
   * @param ctrlKey True if ctrl key pressed
   * @returns True if dragging allowed
   */
  onDragStart(x: number, y: number, shiftKey: boolean, ctrlKey: boolean): boolean;

  /**
   * Called during dragging
   * @param dx The x difference since start
   * @param dy The y difference since start
   * @param dx2 The x difference since last call
   * @param dy2 The y difference since last call
   * @param shiftKey True if shift key pressed
   * @param ctrlKey True if ctrl key pressed
   */
  onDrag(dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called during panning
   * @param dx The x difference since start
   * @param dy The y difference since start
   * @param dx2 The x difference since last call
   * @param dy2 The y difference since last call
   * @param shiftKey True if shift key pressed
   * @param ctrlKey True if ctrl key pressed
   * @template
   */
  onPanning(dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called when panning ends
   * @template
   */
  onPanningEnd(): void;

  /**
   * Called when dragging ends
   * @param x The x-coordinate of mouse
   * @param y The y-coordinate of mouse
   * @param shiftKey True if shift key pressed
   * @param ctrlKey True if ctrl key pressed
   */
  onDragEnd(x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Determine target for dropping
   * @param draggedFigure The figure being dragged
   * @returns The target figure or null
   * @private
   */
  delegateTarget(draggedFigure: Figure): Figure | null;

  /**
   * Called when a figure is dragged over this figure
   * @param draggedFigure The figure being dragged
   * @template
   */
  onDragEnter(draggedFigure: Figure): void;

  /**
   * Called when a figure leaves this figure during drag
   * @param draggedFigure The figure being dragged
   * @template
   */
  onDragLeave(draggedFigure: Figure): void;

  /**
   * Called when this figure is dropped onto a target
   * @param dropTarget The drop target
   * @param x The x-coordinate of the event
   * @param y The y-coordinate of the event
   * @param shiftKey True if shift key pressed
   * @param ctrlKey True if ctrl key pressed
   * @template
   */
  onDrop(dropTarget: Figure, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called when a figure is dropped onto this figure
   * @param droppedFigure The dropped figure
   * @param x The x-coordinate of the event
   * @param y The y-coordinate of the event
   * @param shiftKey True if shift key pressed
   * @param ctrlKey True if ctrl key pressed
   * @template
   */
  onCatch(droppedFigure: Figure, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called when mouse enters this figure
   * @template
   */
  onMouseEnter(): void;

  /**
   * Called when mouse leaves this figure
   * @template
   */
  onMouseLeave(): void;

  /**
   * Called on double click
   * @template
   */
  onDoubleClick(): void;

  /**
   * Called on click
   * @template
   * @deprecated
   */
  onClick(): void;

  /**
   * Called for context menu events
   * @param x The x-coordinate
   * @param y The y-coordinate
   * @template
   */
  onContextMenu(x: number, y: number): void;

  /**
   * Set the alpha transparency
   * @param percent Alpha value between 0-1
   * @returns this
   */
  setAlpha(percent: number): this;

  /**
   * Get the alpha transparency
   * @returns The alpha value
   */
  getAlpha(): number;

  /**
   * Set the rotation angle
   * @param angle The angle in degrees (0-356)
   * @returns this
   */
  setRotationAngle(angle: number): this;

  /**
   * Get the rotation angle
   * @returns The angle in degrees
   */
  getRotationAngle(): number;

  /**
   * Set visibility of the figure
   * @param flag True to show, false to hide
   * @param duration Optional fade duration
   * @returns this
   */
  setVisible(flag: boolean, duration?: number): this;

  /**
   * Check if figure is visible
   * @returns True if visible
   */
  isVisible(): boolean;

  /**
   * Set if aspect ratio should be maintained
   * @param flag True to keep aspect ratio
   * @returns this
   */
  setKeepAspectRatio(flag: boolean): this;

  /**
   * Get if aspect ratio is maintained
   * @returns True if keeping aspect ratio
   */
  getKeepAspectRatio(): boolean;

  /**
   * Get the z-order of the element
   * @returns The z-order
   */
  getZOrder(): number;

  /**
   * Set if this figure can snap to grid/geometry
   * @param flag True if snapping enabled
   * @returns this
   */
  setCanSnapToHelper(flag: boolean): this;

  /**
   * Check if figure can snap to helpers
   * @returns True if snapping enabled
   */
  getCanSnapToHelper(): boolean;

  /**
   * Get the snap to grid anchor point
   * @returns The anchor point
   */
  getSnapToGridAnchor(): Point;

  /**
   * Set the snap to grid anchor point
   * @param point The anchor point
   * @returns this
   */
  setSnapToGridAnchor(point: Point): this;

  /**
   * Set the width of the figure
   * @param width The new width
   * @returns this
   */
  setWidth(width: number): this;

  /**
   * Get the width of the figure
   * @returns The width
   */
  getWidth(): number;

  /**
   * Set the height of the figure
   * @param height The new height
   * @returns this
   */
  setHeight(height: number): this;

  /**
   * Get the height of the figure
   * @returns The height
   */
  getHeight(): number;

  /**
   * Get the minimum width
   * @returns The minimum width
   */
  getMinWidth(): number;

  /**
   * Set the minimum width
   * @param w The minimum width
   * @returns this
   */
  setMinWidth(w: number): this;

  /**
   * Get the minimum height
   * @returns The minimum height
   */
  getMinHeight(): number;

  /**
   * Set the minimum height
   * @param h The minimum height
   * @returns this
   */
  setMinHeight(h: number): this;

  /**
   * Set the x position
   * @param x The new x position
   * @returns this
   */
  setX(x: number): this;

  /**
   * Get the x position
   * @returns The x position
   */
  getX(): number;

  /**
   * Set the y position
   * @param y The new y position
   * @returns this
   */
  setY(y: number): this;

  /**
   * Get the y position
   * @returns The y position
   */
  getY(): number;

  /**
   * Get the absolute x position
   * @returns The absolute x
   */
  getAbsoluteX(): number;

  /**
   * Get the absolute y position
   * @returns The absolute y
   */
  getAbsoluteY(): number;

  /**
   * Get the absolute position
   * @returns The absolute position
   */
  getAbsolutePosition(): Point;

  /**
   * Get the absolute bounds
   * @returns The absolute bounds
   */
  getAbsoluteBounds(): Rectangle;

  /**
   * Set the position of the figure
   * @param x The new x position or Point
   * @param y The new y position if x is a number
   * @returns this
   */
  setPosition(x: number | Point, y?: number): this;

  /**
   * Get the current position
   * @returns The position
   */
  getPosition(): Point;

  /**
   * Translate the figure by given amounts
   * @param dx The x amount
   * @param dy The y amount
   * @returns this
   */
  translate(dx: number, dy: number): this;

  /**
   * Set the dimensions of the figure
   * @param w The new width
   * @param h The new height
   * @returns this
   */
  setDimension(w: number, h: number): this;

  /**
   * Set the bounding box of the figure
   * @param rect The new bounds
   * @returns this
   */
  setBoundingBox(rect: Rectangle | { x: number, y: number, width: number, height: number }): this;

  /**
   * Get the bounding box
   * @returns The bounds
   */
  getBoundingBox(): Rectangle;

  /**
   * Get the bounding box including all children
   * @returns The outer bounds
   */
  getOuterBoundingBox(): Rectangle;

  /**
   * Test if a point is inside the figure
   * @param iX The x coordinate
   * @param iY The y coordinate
   * @param corona Optional additional hit area
   * @returns True if hit
   */
  hitTest(iX: number, iY: number, corona?: number): boolean;

  /**
   * Set if the figure is draggable
   * @param flag True to enable dragging
   * @returns this
   */
  setDraggable(flag: boolean): this;

  /**
   * Check if the figure is draggable
   * @returns True if draggable
   */
  isDraggable(): boolean;

  /**
   * Check if the figure is resizeable
   * @returns True if resizeable
   */
  isResizeable(): boolean;

  /**
   * Set if the figure is resizeable
   * @param flag True to enable resizing
   * @returns this
   */
  setResizeable(flag: boolean): this;

  /**
   * Check if the figure is selectable
   * @returns True if selectable
   */
  isSelectable(): boolean;

  /**
   * Set if the figure is selectable
   * @param flag True to enable selection
   * @returns this
   */
  setSelectable(flag: boolean): this;

  /**
   * Check if figure ignores aspect ratio
   * @returns True if stretchable
   * @deprecated Use getKeepAspectRatio instead
   */
  isStrechable(): boolean;

  /**
   * Check if figure is deleteable
   * @returns True if deleteable
   */
  isDeleteable(): boolean;

  /**
   * Set if figure is deleteable
   * @param flag True to enable deletion
   * @returns this
   */
  setDeleteable(flag: boolean): this;

  /**
   * Set the parent of this figure
   * @param parent The new parent
   * @returns this
   * @private
   */
  setParent(parent: Figure | null): this;

  /**
   * Get the parent of this figure
   * @returns The parent
   */
  getParent(): Figure | null;

  /**
   * Check if a figure is a descendant
   * @param containedFigure Figure to check
   * @returns True if contained
   */
  contains(containedFigure: Figure): boolean;

  /**
   * Get the top-most parent
   * @returns The root
   */
  getRoot(): Figure | null;

  /**
   * Set the composite container
   * @param composite The composite
   * @returns this
   */
  setComposite(composite: any | null): this;

  /**
   * Get the composite container
   * @returns The composite
   */
  getComposite(): any | null;

  /**
   * Trigger an event
   * @param event The event name
   * @param args Optional parameters
   */
  fireEvent(event: string, args?: any): void;

  /**
   * Register an event handler
   * @param event Space-separated event types
   * @param callback The handler function
   * @param context Optional context
   * @returns this
   */
  on(event: string, callback: (emitter: Figure, args?: any) => void, context?: any): this;

  /**
   * Remove event handlers
   * @param eventOrFunction Event name or handler function
   * @returns this
   */
  off(eventOrFunction?: string | Function): this;

  /**
   * Find the best child at given location
   * @param x The x coordinate
   * @param y The y coordinate
   * @param figureToIgnore Figures to ignore
   * @returns The found figure or null
   */
  getBestChild(x: number, y: number, figureToIgnore?: Figure | Figure[]): Figure | null;

  /**
   * Create a command for the specified request
   * @param request The command request
   * @returns The command or null
   * @private
   */
  createCommand(request: CommandType): Command | null;

  /**
   * Clone the figure
   * @param cloneMetaData Optional metadata for cloning
   * @param cloneMetaData.excludeChildren Set to true to exclude children
   * @returns The cloned figure
   */
  clone(cloneMetaData?: { excludeChildren?: boolean }): Figure;

  /**
   * Get attributes for serialization
   * @returns Object with serializable attributes
   */
  getPersistentAttributes(): any;

  /**
   * Set attributes from serialized data
   * @param memento The serialized data
   * @returns this
   */
  setPersistentAttributes(memento: any): this;
}
