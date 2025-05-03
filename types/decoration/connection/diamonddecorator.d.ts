import { Decorator } from './decorator';

/**
 * Diamond decorator for connection endpoints.
 *
 * Creates a diamond-shaped decoration that can be used at the start
 * or end points of a connection.
 */
export class DiamondDecorator extends Decorator {
  /**
   * The name of the decorator
   */
  NAME: string;

  /**
   * Creates a new diamond decorator
   *
   * @param width The width of the diamond (default: 20)
   * @param height The height of the diamond (default: 15)
   */
  constructor(width?: number, height?: number);

  /**
   * Draw a filled diamond decoration.
   *
   * It's not your work to rotate the diamond. The draw2d does this job for you.
   *
   * @param paper The raphael paper object for the paint operation
   * @returns The raphael path set
   */
  paint(paper: any): any;
}
