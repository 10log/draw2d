import { Decorator } from './decorator';

/**
 * Arrow decorator for connection endpoints.
 *
 * Creates an arrow-shaped decoration that can be used at the start
 * or end points of a connection.
 */
export class ArrowDecorator extends Decorator {
  /**
   * The name of the decorator
   */
  NAME: string;

  /**
   * Creates a new arrow decorator
   *
   * @param width The width of the arrow (default: 20)
   * @param height The height of the arrow (default: 15)
   */
  constructor(width?: number, height?: number);

  /**
   * Draws a filled arrow decoration.
   *
   * ```
   *                       ---+ [length , width/2]
   *                -------   |
   * [0,0]  --------          |
   *    +---                  |==========================
   *        --------          |
   *                -------   |
   *                       ---+ [length ,-width/2]
   * ```
   *
   * @param paper The raphael paper object for the paint operation
   * @returns The raphael path set
   */
  paint(paper: any): any;
}
