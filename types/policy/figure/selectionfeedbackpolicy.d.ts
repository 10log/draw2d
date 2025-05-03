import { Figure } from '../../core/figure';
import { Canvas } from '../../core/canvas';
import { FigurePolicy } from '../figure';
import { SelectionPolicy } from './selectionpolicy';

/**
 * Base class for all feedback policies for selections
 */
export class SelectionFeedbackPolicy extends SelectionPolicy {
  /**
   * Creates a selection feedback policy
   * 
   * @param {Object} [attr] Configuration attributes
   * @param {Object} [setter] Setter methods for attributes
   * @param {Object} [getter] Getter methods for attributes
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Called by the framework if the related figure has been selected.
   *
   * @param canvas The canvas where the selection occurs
   * @param figure The selected figure
   * @param isPrimarySelection True if this is the primary selection
   */
  onSelect(canvas: Canvas, figure: Figure, isPrimarySelection: boolean): void;

  /**
   * Called by the framework if the related figure has been unselected.
   *
   * @param canvas The canvas where the deselection occurs
   * @param figure The unselected figure
   */
  onUnselect(canvas: Canvas, figure: Figure): void;

  /**
   * Called if the figure has been moved
   * 
   * @param canvas The canvas where the figure exists
   * @param figure The figure that has been moved
   */
  moved(canvas: Canvas, figure: Figure): void;

  /**
   * Called when the policy is installed
   * 
   * @param figure The figure where the policy is installed
   */
  onInstall(figure: Figure): void;

  /**
   * Called when the policy is uninstalled
   * 
   * @param figure The figure from which the policy is uninstalled
   */
  onUninstall(figure: Figure): void;
}