import { Connection } from '../../core/connection';
import { Color } from '../../util/color';

/**
 * Base class for any kind of Connection end/start decorations like arrows, bullets, circles, bars.
 */
export class Decorator {
  /**
   * The name of the decorator
   */
  NAME: string;

  /**
   * Width of the decorator
   */
  width: number;

  /**
   * Height of the decorator
   */
  height: number;

  /**
   * Parent connection that uses this decorator
   */
  protected parent: Connection | null;

  /**
   * Line color (null means use the color of the connection)
   */
  protected color: Color | null;

  /**
   * Background fill color
   */
  protected backgroundColor: Color;

  /**
   * Creates a new decorator for connection endpoints
   *
   * @param width Width of the decorator (default: 20)
   * @param height Height of the decorator (default: 15)
   */
  constructor(width?: number, height?: number);

  /**
   * Paint the decoration for a connector. The Connector starts always in
   * [0,0] and ends in [x,0].
   * It is not necessary to consider any rotation of the connection. This will be done by the
   * framework.
   *
   * @param paper The Raphael paper object for drawing
   */
  paint(paper: any): void;

  /**
   * Set the parent connection
   *
   * @param parent The parent connection
   */
  setParent(parent: Connection): void;

  /**
   * Set the stroke color for the decoration
   *
   * @param c The color to set
   * @returns this for method chaining
   */
  setColor(c: Color | string): this;

  /**
   * Get the line color of the decoration
   *
   * @returns The current line color or null if the Decoration should use the color of the host connection
   */
  getColor(): Color | null;

  /**
   * Set the background color for the decoration
   *
   * @param c The color to set
   * @returns this for method chaining
   */
  setBackgroundColor(c: Color | string): this;

  /**
   * Returns the fill color
   *
   * @returns The background color
   */
  getBackgroundColor(): Color;

  /**
   * Change the dimension of the decoration shape
   *
   * @param width The new width of the decoration
   * @param height The new height of the decoration
   * @returns this for method chaining
   */
  setDimension(width: number, height: number): this;
}
