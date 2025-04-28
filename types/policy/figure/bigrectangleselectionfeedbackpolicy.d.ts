import { RectangleSelectionFeedbackPolicy } from '../figure';
import { ResizeHandle } from '../../core/resizehandle';
import { Figure } from '../../core/figure';

/**
 * Selection feedback policy using a big rectangle with resize handles for feedback.
 * The rectangle is significantly larger than the standard rectangle feedback.
 *
 * @example
 *      circle = new draw2d.shape.basic.Circle();
 *      circle.installEditPolicy(new draw2d.policy.figure.BigRectangleSelectionFeedbackPolicy());
 *      canvas.add(circle, 90, 50);
 */
export class BigRectangleSelectionFeedbackPolicy extends RectangleSelectionFeedbackPolicy {
  /**
   * Creates a new policy
   * @param {Object} [attr] the configuration of the policy
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Creates a resize handle for the given owner and orientation
   *
   * @param {draw2d.Figure} owner The owner/host of the ResizeHandle
   * @param {Number} type The orientation of the ResizeHandle (e.g. NORTH, NORTH_EAST, etc.)
   * @returns {draw2d.ResizeHandle}
   */
  createResizeHandle(owner: Figure, type: number): ResizeHandle;
}
