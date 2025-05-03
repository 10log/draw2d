import { Figure } from '../../core/figure';
import { Canvas } from '../../core/canvas';
import { FigurePolicy } from '../figure';

/**
 * Base class for all selection policies for figures
 */
export class SelectionPolicy extends FigurePolicy {
  /**
   * Creates a selection policy
   * 
   * @param {Object} [attr] Configuration attributes
   * @param {Object} [setter] Setter methods for attributes
   * @param {Object} [getter] Getter methods for attributes
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Called when the figure is clicked
   * 
   * @param figure The figure that was clicked
   * @param x The x-coordinate of the click
   * @param y The y-coordinate of the click
   * @param shiftKey True if the shift key was pressed
   * @param ctrlKey True if the ctrl key was pressed
   */
  onClick(figure: Figure, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * Called when the figure is double-clicked
   * 
   * @param figure The figure that was double-clicked
   * @param x The x-coordinate of the click
   * @param y The y-coordinate of the click
   * @param shiftKey True if the shift key was pressed
   * @param ctrlKey True if the ctrl key was pressed
   */
  onDoubleClick(figure: Figure, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;
}