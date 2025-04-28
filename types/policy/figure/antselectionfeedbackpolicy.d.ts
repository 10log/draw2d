import { SelectionFeedbackPolicy } from '../figure';
import { ResizeHandle } from '../../core/resizehandle';
import { Figure } from '../../core/figure';

/**
 * Selection feedback policy that uses dashed line (ants walking) for highlighting the selected shape.
 *
 * @example
 *      circle = new draw2d.shape.basic.Circle();
 *      circle.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
 *      canvas.add(circle, 90, 50);
 */
export class AntSelectionFeedbackPolicy extends SelectionFeedbackPolicy {
  /**
   * Creates a new policy
   * @param {Object} [attr] the configuration of the policy
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Called by the framework if the related shape has been selected.
   *
   * @param {draw2d.Canvas} canvas The canvas where the selection happened
   * @param {draw2d.Figure} figure The figure to show the selection feedback
   * @param {Boolean} primary True if this figure is the primary selection
   */
  onSelect(canvas: any, figure: Figure, primary: boolean): void;

  /**
   * Called by the framework if the related shape has been unselected.
   *
   * @param {draw2d.Canvas} canvas The canvas where the selection happened
   * @param {draw2d.Figure} figure The figure to remove the selection feedback
   */
  onUnselect(canvas: any, figure: Figure): void;
}
