import { Figure } from './figure';
import { Point, Rectangle } from '../geo';
import { Command } from '../command/command';
import { CommandType } from '../command/commandtype';

/**
 * A ResizeHandle is a special widget for resizing a figure.
 */
export class ResizeHandle extends Figure {
  /** Constant for the north-west direction */
  static readonly DIRECTION_NORTH_WEST: number;
  /** Constant for the north direction */
  static readonly DIRECTION_NORTH: number;
  /** Constant for the north-east direction */
  static readonly DIRECTION_NORTH_EAST: number;
  /** Constant for the east direction */
  static readonly DIRECTION_EAST: number;
  /** Constant for the south-east direction */
  static readonly DIRECTION_SOUTH_EAST: number;
  /** Constant for the south direction */
  static readonly DIRECTION_SOUTH: number;
  /** Constant for the south-west direction */
  static readonly DIRECTION_SOUTH_WEST: number;
  /** Constant for the west direction */
  static readonly DIRECTION_WEST: number;

  /**
   * Creates a new resize handle
   * @param owner The owner figure of this handle
   * @param type The handle type (location)
   */
  constructor(owner: Figure, type: number);

  /** The owner figure of this handle */
  owner: Figure;

  /** The direction/type of this resize handle */
  type: number;

  /** Initial drag x position */
  ox: number;

  /** Initial drag y position */
  oy: number;

  /** Initial drag figure width */
  initialWidth: number;

  /** Initial drag figure height */
  initialHeight: number;

  /** Initial drag figure position */
  initialPosition: Point;

  /** Initial drag figure minWidth */
  initialMinWidth: number;

  /** Initial drag figure minHeight */
  initialMinHeight: number;

  /**
   * Set the dimension of the rectangle/square
   * @param width The new width of the figure
   * @param height The new height of the figure
   * @returns this
   */
  setDimension(width: number, height: number): this;

  /**
   * Called if a drag&drop operation starts
   * @param x X position where the drag starts
   * @param y Y position where the drag starts
   * @param shiftKey True if user presses the shift key
   * @param ctrlKey True if user presses the ctrl key
   * @returns true if the figure accepts draging
   */
  onDragStart(x: number, y: number, shiftKey: boolean, ctrlKey: boolean): boolean;

  /**
   * Called during dragging a resize handle
   * @param dx The x offset to the initial drag position
   * @param dy The y offset to the initial drag position
   * @param dx2 The x offset to the previous drag event
   * @param dy2 The y offset to the previous drag event
   * @param shiftKey True if user presses the shift key
   * @param ctrlKey True if user presses the ctrl key
   */
  onDrag(dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called if a drag&drop operation ends
   * @param x X position where the drag ends
   * @param y Y position where the drag ends
   * @param shiftKey True if user presses the shift key
   * @param ctrlKey True if user presses the ctrl key
   */
  onDragEnd(x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Get the direction of the resize handle
   * @returns The direction of the handle
   */
  getType(): number;

  /**
   * Returns the current position of the resize handle
   * @returns The current position
   */
  getPosition(absolute?: boolean): Point;

  /**
   * Set the dimension of the ResizeHandle
   * @param width The new width
   * @param height The new height
   * @returns this
   */
  setDimension(width: number, height: number): this;

  /**
   * Get the owner of the resize handle
   * @returns The owner figure
   */
  getOwner(): Figure;

  /**
   * Set the owner of the resize handle
   * @param owner The owner figure
   * @returns this
   */
  setOwner(owner: Figure): this;

  /**
   * Shows this handle
   * @returns this
   */
  show(canvas: any): this;

  /**
   * Hide this handle
   * @returns this
   */
  hide(): this;

  /**
   * Checks whether this ResizeHandle is resizing the given figure
   * @param figure The figure to check
   * @returns True if the resize handle belongs to the given figure
   */
  isResizeHandleFor(figure: Figure): boolean;

  /**
   * Create a command for the specified request
   * @param request The command request or bounding box
   * @param dx Optional x translation if first parameter is Rectangle
   * @param dy Optional y translation if first parameter is Rectangle
   * @param ct Optional constraint information if first parameter is Rectangle
   * @returns The command or null
   * @override
   */
  createCommand(request: CommandType | Rectangle, dx?: number, dy?: number, ct?: any): Command | null;

  /**
   * Internal method to create resize commands
   * @param boundingBox The bounding box of the figure to resize
   * @param dx The x translation
   * @param dy The y translation
   * @param ct Information about the resize constraint
   * @returns The resize command
   * @private
   */
  private _createResizeCommand(boundingBox: Rectangle, dx: number, dy: number, ct: any): Command | null;
}
