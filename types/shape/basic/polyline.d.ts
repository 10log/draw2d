import { Line } from './line';
import { Point } from '../../geo/point';
import { ArrayList } from '../../util/arraylist';
import { ConnectionRouter } from '../../layout/connection/connectionrouter';

/**
 * A PolyLine is a line with more than 2 points.
 */
export class PolyLine extends Line {
  /**
   * Creates a new PolyLine
   * @param attr Optional attributes for the polyline
   * @param setter Add or replace setter methods
   * @param getter Add or replace getter methods
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** SVG path string cache */
  svgPathString: string | null;

  /** Temporary storage of the last added point */
  oldPoint: Point | null;

  /** The connection router for this polyline */
  router: ConnectionRouter;

  /** Flag indicating if routing needs to be recalculated */
  routingRequired: boolean;

  /** List of calculated line segments */
  lineSegments: ArrayList<{start: Point, end: Point}>;

  /** Corner radius for polyline edges */
  radius: string | number;

  /**
   * Sets the corner radius of the edges.
   * @param radius The corner radius
   * @returns this
   */
  setRadius(radius: number | string): this;

  /**
   * Get the corner radius of the edges.
   * @returns The corner radius
   */
  getRadius(): string | number;

  /**
   * @inheritdoc
   */
  setStartPoint(x: number | Point, y?: number): this;

  /**
   * @inheritdoc
   */
  setEndPoint(x: number | Point, y?: number): this;

  /**
   * Inserts a vertex at the end of the polyline.
   * @param x The x coordinate or a Point object
   * @param y The y coordinate (if x is a number)
   * @returns this
   */
  addVertex(x: number | Point, y?: number): this;

  /**
   * Inserts a vertex into the polyline at the specified index.
   * @param index The index at which to insert the vertex
   * @param x The x coordinate or a Point object
   * @param y The y coordinate (if x is a number)
   * @returns this
   */
  insertVertexAt(index: number, x: number | Point, y?: number): this;

  /**
   * Removes a vertex from the polyline.
   * @param index The index of the vertex to remove
   * @returns The removed point or null if the router declined the operation
   */
  removeVertexAt(index: number): Point | null;

  /**
   * Set the router for this connection.
   * @param router The new router for this connection or null to use the default routing
   * @returns this
   */
  setRouter(router?: ConnectionRouter): this;

  /**
   * Return the current active router of this connection.
   * @returns The current router
   */
  getRouter(): ConnectionRouter;

  /**
   * Calculate the path of the polyline
   * @param routingHints Optional helper attributes for the router
   * @private
   */
  calculatePath(routingHints?: {
    startMoved?: boolean;
    endMoved?: boolean;
    oldVertices?: ArrayList<Point>;
  }): void;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;

  /**
   * Return all line segments of the polyline.
   * @returns List of line segments
   */
  getSegments(): ArrayList<{start: Point, end: Point}>;

  /**
   * Used for the router to add calculated points
   * @param p The point to add or x-coordinate
   * @param y The y-coordinate if p is a number
   */
  addPoint(p: Point | number, y?: number): void;

  /**
   * @inheritdoc
   */
  onDragStart(x: number, y: number, shiftKey: boolean, ctrlKey: boolean, isFaked?: boolean): boolean;

  /**
   * @inheritdoc
   */
  getLength(): number;

  /**
   * @inheritdoc
   */
  setVertices(vertices: ArrayList<Point> | Array<any>): this;

  /**
   * @inheritdoc
   */
  pointProjection(px: number, py: number): Point | null;

  /**
   * @inheritdoc
   */
  lerp(percentage: number): Point;

  /**
   * Get the best segment of the line which is below the given coordinate or null if
   * no segment is close to the coordinate.
   * @param px The x coordinate of the test point
   * @param py The y coordinate of the test point
   * @returns The closest segment or null
   */
  hitSegment(px: number, py: number): { index: number, start: Point, end: Point } | null;

  /**
   * @inheritdoc
   */
  hitTest(px: number, py: number): boolean;

  /**
   * @inheritdoc
   */
  createCommand(request: any): any;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): void;
}
