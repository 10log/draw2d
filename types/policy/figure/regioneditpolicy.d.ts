import { FigureEditPolicy } from './figureeditpolicy';
import { Figure } from '../../core/figure';
import { Rectangle } from '../../geo/rectangle';

/**
 * Policy that restricts movement to a specific region
 */
export class RegionEditPolicy extends FigureEditPolicy {
  /**
   * Creates a region constraint policy
   *
   * @param x The x-coordinate of the allowed region
   * @param y The y-coordinate of the allowed region
   * @param width The width of the allowed region
   * @param height The height of the allowed region
   * @param [attr] Additional configuration attributes
   * @param [setter] Setter methods
   * @param [getter] Getter methods
   */
  constructor(x: number, y: number, width: number, height: number, attr?: any, setter?: any, getter?: any);

  /**
   * The constraint region
   */
  constRect: Rectangle;

  /**
   * Adjust the coordinates to constraint the figure to the defined region
   *
   * @param figure The figure to constraint
   * @param x The desired x-coordinate
   * @param y The desired y-coordinate
   */
  adjustPosition(figure: Figure, x: number, y: number): {x: number, y: number};

  /**
   * Adjust the dimensions to constraint the figure to the defined region
   *
   * @param figure The figure to constraint
   * @param w The desired width
   * @param h The desired height
   */
  adjustDimension(figure: Figure, w: number, h: number): {w: number, h: number};
}