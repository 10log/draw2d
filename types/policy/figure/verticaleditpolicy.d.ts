import { FigureEditPolicy } from './figureeditpolicy';
import { Figure } from '../../core/figure';
import { Canvas } from '../../core/canvas';

/**
 * Policy that restricts movement to vertical direction only
 */
export class VerticalEditPolicy extends FigureEditPolicy {
  /**
   * Creates a vertical constraint policy
   * 
   * @param {Object} [attr] Configuration attributes
   * @param {Object} [setter] Setter methods for attributes
   * @param {Object} [getter] Getter methods for attributes
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Called by the framework if the user edit the position of a figure with drag&drop
   * or arrow keys.
   *
   * @param canvas The related canvas
   * @param figure The figure to modify
   * @param x The new x-coordinate
   * @param y The new y-coordinate
   */
  moved(canvas: Canvas, figure: Figure, x: number, y: number): {x: number, y: number};
}