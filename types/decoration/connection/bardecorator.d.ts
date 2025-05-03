import { Decorator } from './decorator';

/**
 * Bar decorator for connection endpoints.
 *
 * Creates a vertical bar-shaped decoration that can be used at the start
 * or end points of a connection.
 */
export class BarDecorator extends Decorator {
  /**
   * The name of the decorator
   */
  NAME: string;

  /**
   * Creates a new bar decorator
   *
   * @param width The width of the bar (default: 20)
   * @param height The height of the bar (default: 15)
   */
  constructor(width?: number, height?: number);

  /**
   * Draw a bar decoration.
   *
   * ```
   *               | [length , width/2]
   *               |
   * [0,0]         |                          (Connection)
   *    +==========|==========================
   *               |
   *               |
   *               | [length ,-width/2]
   * ```
   *
   * @param paper The raphael paper object for the paint operation
   * @returns The raphael path set
   */
  paint(paper: any): any;
}
