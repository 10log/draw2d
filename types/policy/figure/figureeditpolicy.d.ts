import { AbstractPolicy } from '../editpolicy';
import { Figure } from '../../core/figure';
import { Canvas } from '../../core/canvas';

/**
 * Base class for figure edit policies
 */
export class FigureEditPolicy extends AbstractPolicy {
  /**
   * Creates a figure policy
   * 
   * @param {Object} [attr] Configuration attributes
   * @param {Object} [setter] Setter methods for attributes
   * @param {Object} [getter] Getter methods for attributes
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Called if the related figure has been moved.
   *
   * @param canvas The canvas where the figure resides
   * @param figure The moved figure
   */
  moved(canvas: Canvas, figure: Figure): void;
}