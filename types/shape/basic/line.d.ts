import { Figure } from '../../core/figure';
import { Point } from '../../geo/point';
import { Rectangle } from '../../geo/rectangle';
import { Color } from '../../util/color';
import { ArrayList } from '../../util/arraylist';

/**
 * The base class for all visible line elements inside a canvas.
 */
export class Line extends Figure {
  /**
   * Creates a new line with the given start and end coordinates.
   * @param attr Optional attributes for the line
   * @param setter Add or replace setter methods
   * @param getter Add or replace getter methods
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** Click area for the line hit test */
  corona: number;

  /** Flag indicating if the line is currently glowing */
  isGlowing: boolean;

  /** The color of the line */
  lineColor: Color;

  /** The stroke width of the line */
  stroke: number;

  /** The outline stroke width */
  outlineStroke: number;

  /** The outline color */
  outlineColor: Color;

  /** Flag indicating if the outline is visible */
  outlineVisible: boolean;

  /** The currently dragged segment */
  draggedSegment: { index: number, start: Point, end: Point } | null;

  /** The dash pattern for the line */
  dasharray: string | null;

  /** Offset for the dash pattern */
  dasharrayOffset: string | null;

  /** Flag indicating if the line should be animated */
  animate: boolean;

  /** Animation direction */
  animateDirection: boolean;

  /** Start point of the line */
  start: Point;

  /** End point of the line */
  end: Point;

  /** Color used for the glow effect */
  glowColor: Color;

  /** Stroke size for the glow effect */
  glowStrokeSize: number;

  /** List of vertices that make up the line */
  vertices: ArrayList<Point>;

  /**
   * Set the outline color of the line.
   * @param color The new color of the outline
   * @returns this
   */
  setOutlineColor(color: string | Color): this;

  /**
   * Get the outline color of the line.
   * @returns The outline color
   */
  getOutlineColor(): Color;

  /**
   * Set the outline stroke width of the line.
   * @param w The new outline width
   * @returns this
   */
  setOutlineStroke(w: number): this;

  /**
   * Get the outline stroke width of the line.
   * @returns The outline stroke width
   */
  getOutlineStroke(): number;

  /**
   * @inheritdoc
   */
  onDragStart(x: number, y: number, shiftKey: boolean, ctrlKey: boolean, isFaked?: boolean): boolean;

  /**
   * @inheritdoc
   */
  onDrag(dx: number, dy: number, dx2: number, dy2: number): void;

  /**
   * @inheritdoc
   */
  onDragEnd(x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * @inheritdoc
   */
  setPosition(x: number | Point, y?: number): void;

  /**
   * Called when a user clicks on the element.
   */
  onClick(): void;

  /**
   * Set the line style for this object.
   * @param dashPattern The dash pattern (e.g., "", "-", ".", "-.", etc.)
   * @returns this
   */
  setDashArray(dashPattern: string): this;

  /**
   * Get the line style for this object.
   * @returns The current dash pattern
   */
  getDashArray(): string | null;

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;

  /**
   * @inheritdoc
   */
  toBack(figure?: Figure): this;

  /**
   * Set the color used for the glow effect.
   * @param color The new glow color
   * @returns this
   */
  setGlowColor(color: string | Color): this;

  /**
   * Get the glow stroke size.
   * @returns The glow stroke size
   */
  getGlowStrokeSize(): number;

  /**
   * Set the glow stroke size.
   * @param size The new glow stroke size
   * @returns this
   */
  setGlowStrokeSize(size: number): this;

  /**
   * Get the glow color.
   * @returns The glow color
   */
  getGlowColor(): Color;

  /**
   * Get the dasharray offset.
   * @returns The dasharray offset
   */
  getDasharrayOffset(): string | null;

  /**
   * Set the dasharray offset.
   * @param offset The new dasharray offset
   * @returns this
   */
  setDasharrayOffset(offset: string): this;

  /**
   * Get whether animation is enabled.
   * @returns True if animation is enabled
   */
  getAnimate(): boolean;

  /**
   * Set whether animation is enabled.
   * @param animate True to enable animation
   * @returns this
   */
  setAnimate(animate: boolean): this;

  /**
   * Get the animation direction.
   * @returns The animation direction
   */
  getAnimateDirection(): boolean;

  /**
   * Set the animation direction.
   * @param direction The new animation direction
   * @returns this
   */
  setAnimateDirection(direction: boolean): this;

  /**
   * Highlight the element or remove the highlighting.
   * @param flag Indicates glow/no glow
   * @returns this
   */
  setGlow(flag: boolean): this;

  /**
   * @inheritdoc
   */
  isResizeable(): boolean;

  /**
   * Set the line width.
   * @param w The new line width
   * @returns this
   */
  setStroke(w: number): this;

  /**
   * Get the line width.
   * @returns The current line width
   */
  getStroke(): number;

  /**
   * Set the click area for the line hit test.
   * @param w The new click hit offset
   * @returns this
   */
  setCorona(w: number): this;

  /**
   * Get the corona hit test area.
   * @returns The corona size
   */
  getCorona(): number;

  /**
   * Set the color of the line.
   * @param color The new color
   * @returns this
   */
  setColor(color: string | Color): this;

  /**
   * Get the current paint color.
   * @returns The line color
   */
  getColor(): Color;

  /**
   * Translate the line with the given x/y offset.
   * @param dx The x translate offset
   * @param dy The y translate offset
   * @returns this
   */
  translate(dx: number, dy: number): this;

  /**
   * Get the bounding box of the line or polygon.
   * @returns The bounding rectangle
   */
  getBoundingBox(): Rectangle;

  /**
   * Set the start position of the line.
   * @param x The x coordinate or a Point object
   * @param y The y coordinate (if x is a number)
   * @returns this
   */
  setStartPosition(x: number | Point, y?: number): this;

  /**
   * @deprecated Use setStartPosition instead
   */
  setStartPoint(x: number | Point, y?: number): this;

  /**
   * Set the x coordinate of the start point.
   * @param x The new x coordinate
   */
  setStartX(x: number): void;

  /**
   * Set the y coordinate of the start point.
   * @param y The new y coordinate
   */
  setStartY(y: number): void;

  /**
   * Set the x coordinate of the end point.
   * @param x The new x coordinate
   */
  setEndX(x: number): void;

  /**
   * Set the y coordinate of the end point.
   * @param y The new y coordinate
   */
  setEndY(y: number): void;

  /**
   * Set the end position of the line.
   * @param x The x coordinate or a Point object
   * @param y The y coordinate (if x is a number)
   * @returns this
   */
  setEndPosition(x: number | Point, y?: number): this;

  /**
   * @deprecated Use setEndPosition instead
   */
  setEndPoint(x: number | Point, y?: number): this;

  /**
   * Get the x coordinate of the start point.
   * @returns The x coordinate
   */
  getStartX(): number;

  /**
   * Get the y coordinate of the start point.
   * @returns The y coordinate
   */
  getStartY(): number;

  /**
   * Get the start position.
   * @returns The start point
   */
  getStartPosition(): Point;

  /**
   * @deprecated Use getStartPosition instead
   */
  getStartPoint(): Point;

  /**
   * Get the x coordinate of the end point.
   * @returns The x coordinate
   */
  getEndX(): number;

  /**
   * Get the y coordinate of the end point.
   * @returns The y coordinate
   */
  getEndY(): number;

  /**
   * Get the end position.
   * @returns The end point
   */
  getEndPosition(): Point;

  /**
   * @deprecated Use getEndPosition instead
   */
  getEndPoint(): Point;

  /**
   * @inheritdoc
   */
  getX(): number;

  /**
   * @inheritdoc
   */
  getY(): number;

  /**
   * Get the vertex at the given index.
   * @param index The index of the vertex
   * @returns The vertex at the specified index
   */
  getVertex(index: number): Point;

  /**
   * Update the vertex at the given position with new coordinates.
   * @param index The index of the vertex to update
   * @param x The new x coordinate or a Point object
   * @param y The new y coordinate (if x is a number)
   * @returns this
   */
  setVertex(index: number, x: number | Point, y?: number): this;

  /**
   * Get the vertices of the line.
   * @returns The list of vertices
   */
  getVertices(): ArrayList<Point>;

  /**
   * Update the vertices of the line.
   * @param vertices The new vertices
   * @returns this
   */
  setVertices(vertices: ArrayList<Point> | Array<any>): this;

  /**
   * Get the segments of the line.
   * @returns List of segments with start and end points
   */
  getSegments(): ArrayList<{start: Point, end: Point}>;

  /**
   * Get the length of the line.
   * @returns The length
   */
  getLength(): number;

  /**
   * Get the angle of the line in degrees.
   * @returns The angle in degrees
   */
  getAngle(): number;

  /**
   * @inheritdoc
   */
  createCommand(request: any): any;

  /**
   * @inheritdoc
   */
  installEditPolicy(policy: any): void;

  /**
   * Check if the provided coordinate is close to the line.
   * @param px The x coordinate to test
   * @param py The y coordinate to test
   * @returns True if the point is close to the line
   */
  hitTest(px: number, py: number): boolean;

  /**
   * Get the projection of a point onto the line.
   * @param px The x coordinate to project
   * @param py The y coordinate to project
   * @returns The projected point
   */
  pointProjection(px: number, py: number): Point;

  /**
   * Get the point on the line at the specified percentage position.
   * @param percentage Value between 0 and 1
   * @returns The point at the percentage position
   */
  lerp(percentage: number): Point;

  /**
   * Find all intersection points with another line.
   * @param other The other line to check for intersections
   * @returns List of intersection points
   */
  intersection(other: Line): ArrayList<Point>;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;

  /**
   * Static utility to find the intersection of two line segments.
   * @param a1 Start point of first line
   * @param a2 End point of first line
   * @param b1 Start point of second line
   * @param b2 End point of second line
   * @returns The intersection point or null
   */
  static intersection(a1: Point, a2: Point, b1: Point, b2: Point): Point | null;

  /**
   * Static utility to check if a point is close to a line.
   * @param coronaWidth The accepted distance for the hit test
   * @param X1 x coordinate of line start
   * @param Y1 y coordinate of line start
   * @param X2 x coordinate of line end
   * @param Y2 y coordinate of line end
   * @param px x coordinate of test point
   * @param py y coordinate of test point
   * @returns True if the point is close to the line
   */
  static hit(coronaWidth: number, X1: number, Y1: number, X2: number, Y2: number, px: number, py: number): boolean;
}
