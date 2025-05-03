import { SelectionFeedbackPolicy } from '../figure';
import { Figure } from '../../core/figure';
import { Canvas } from '../../core/canvas';

/**
 * Feedback policy that shows a glow effect around the selected figure
 */
export class GlowSelectionFeedbackPolicy extends SelectionFeedbackPolicy {
  /**
   * Creates a glow selection feedback policy
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
}