import { VectorFigure } from '../../core/vectorfigure';
import { Point } from '../../geo/point';
import { ArrayList } from '../../util/arraylist';

/**
 * A Polygon figure.
 */
export class Polygon extends VectorFigure {
  /**
   * Creates a new Polygon figure.
   *
   * @param attr Optional attributes for the polygon
   * @param setter Add or replace setter methods
   * @param getter Add or replace getter methods
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** Minimum X coordinate of the polygon */
  minX: number;

  /** Minimum Y coordinate of the polygon */
  minY: number;

  /** Maximum X coordinate of the polygon */
  maxX: number;

  /** Maximum Y coordinate of the polygon */
  maxY: number;

  /** Array of vertices that make up the polygon */
  vertices: ArrayList<Point>;

  /** SVG path string cache */
  svgPathString: string | null;

  /**
   * Sets the corner radius of the edges.
   * @param radius The corner radius
   * @returns this
   */
  setRadius(radius: number | string): this;

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * Calculate the path of the polygon
   * @returns this
   */
  calculatePath(): this;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;

  /**
   * Translate the figure with the given x/y offset.
   * This method modifies all vertices and the bounding box.
   *
   * @param dx The new x translate offset
   * @param dy The new y translate offset
   * @returns this
   */
  translate(dx: number, dy: number): this;

  /**
   * Change the position of the polygon. This method updates all vertices.
   *
   * @param x The x coordinate or a Point object
   * @param y The y coordinate (if x is a number)
   * @returns this
   */
  setPosition(x: number | Point, y?: number): this;

  /**
   * @inheritdoc
   */
  setDimension(w: number, h: number): this;

  /**
   * Return all vertices of the polygon.
   * @returns ArrayList of vertices
   */
  getVertices(): ArrayList<Point>;

  /**
   * Return the Vertex with the given index.
   * @param index The index of the vertex to return
   * @returns The vertex at the given index
   * @since 5.0.2
   */
  getVertex(index: number): Point;

  /**
   * Reset all vertices of the polygon.
   * @returns this
   */
  resetVertices(): this;

  /**
   * Update the vertex at the given index. The method call doesn't have any effect
   * if the vertex doesn't exist.
   *
   * @param index The index of the vertex to update
   * @param x The x coordinate or a Point object
   * @param y The y coordinate (if x is a number)
   * @returns this
   */
  setVertex(index: number, x: number | Point, y?: number): this;

  /**
   * Append a new vertex to the polygon.
   *
   * @param x The x coordinate or a Point object
   * @param y The y coordinate (if x is a number)
   * @returns this
   */
  addVertex(x: number | Point, y?: number): this;

  /**
   * Insert a new vertex at the given index. All vertices will be shifted to
   * free the requested index.
   *
   * @param index The index at which to insert the vertex
   * @param x The x coordinate or a Point object
   * @param y The y coordinate (if x is a number)
   * @returns this
   */
  insertVertexAt(index: number, x: number | Point, y?: number): this;

  /**
   * Remove a vertex from the polygon and return the removed point.
   *
   * @param index The index of the vertex to remove
   * @returns The removed vertex
   */
  removeVertexAt(index: number): Point | null;

  /**
   * @inheritdoc
   */
  setRotationAngle(angle: number): this;

  /**
   * Calculate the bounding box of the shape and store them in internal
   * variables for fast access.
   *
   * @private
   */
  updateBoundingBox(): void;

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
  setPersistentAttributes(memento: any): this;
}
