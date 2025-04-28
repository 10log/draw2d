import { Decorator } from './decorator';

/**
 * Circle decorator for connection endpoints.
 *
 * Creates a circle-shaped decoration that can be used at the start
 * or end points of a connection.
 */
export class CircleDecorator extends Decorator {
  /**
   * The name of the decorator
   */
  NAME: string;

  /**
   * Creates a new circle decorator
   *
   * @param width The width/diameter of the circle (default: 20)
   * @param height The height of the circle (default: 15)
   */
  constructor(width?: number, height?: number);

  /**
   * Draw a filled circle decoration.
   *
   * @param paper The raphael paper object for the paint operation
   * @returns The raphael path set
   */
  paint(paper: any): any;
}
