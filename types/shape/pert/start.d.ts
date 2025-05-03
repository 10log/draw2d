import { VerticalLayout } from '../../shape/layout/verticallayout';
import { Port } from '../../core/port';
import { Label } from '../../shape/basic/label';

/**
 * PERT Start shape for project management diagrams.
 *
 * Checkout Wikipedia PERT for more information.
 * http://en.wikipedia.org/wiki/Program_Evaluation_and_Review_Technique
 */
export class Start extends VerticalLayout {
  /**
   * Create a new Start shape
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The output port of the shape */
  readonly outputPort: Port;

  /** The label for the early finish value */
  readonly earlyFinishLabel: Label;

  /** The label for the late finish value */
  readonly lateFinishLabel: Label;

  /**
   * Create a label for the PERT diagram
   * @param {String|Object} txt the label text or configuration object
   * @returns {draw2d.shape.basic.Label} the created label
   * @private
   */
  createLabel(txt: string | any): Label;

  /**
   * Called if the value of any port has been changed
   * @param {Object} emitter the port which has been changed
   * @param {Object} event the event object
   * @private
   */
  onPortValueChanged(emitter: Port, event: any): void;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}
