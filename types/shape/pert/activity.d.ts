import { VerticalLayout } from '../../shape/layout/verticallayout';
import { Port } from '../../core/port';
import { Label } from '../../shape/basic/label';
import { Connection } from '../../core/connection';

/**
 * PERT Activity shape for project management diagrams.
 *
 * Checkout Wikipedia PERT for more information.
 * http://en.wikipedia.org/wiki/Program_Evaluation_and_Review_Technique
 *
 * Double click on the Task name or the top middle number to change the value.
 */
export class Activity extends VerticalLayout {
  /**
   * Create a new Activity shape
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The input port of the activity */
  readonly inputPort: Port;

  /** The output port of the activity */
  readonly outputPort: Port;

  /** Label for editing the activity name */
  readonly activityLabel: Label;

  /** Label for early start value */
  readonly earlyStartLabel: Label;

  /** Label for early end value */
  readonly earlyEndLabel: Label;

  /** Label for late start value */
  readonly lateStartLabel: Label;

  /** Label for late end value */
  readonly lateEndLabel: Label;

  /** Label for stack value */
  readonly stackLabel: Label;

  /** Label for duration value */
  readonly durationLabel: Label;

  /** Memento values to store current activity state */
  readonly mementoValues: { duration: number | null };

  /**
   * Set the duration for the activity. This triggers a complete recalculation of the complete diagram.
   * @param {Number} duration the new Duration for the activity
   */
  setDuration(duration: number): void;

  /**
   * Calculate and return the early start of the activity
   * @returns {Number} the early start value
   */
  getEarlyStart(): number;

  /**
   * Calculate and return the early end of the activity
   * @returns {Number} the early end value
   */
  getEarlyEnd(): number;

  /**
   * Set the late finish of the activity and propagate the values to related activities
   * @param {Number} value the late finish value
   */
  setLateFinish(value: number): void;

  /**
   * Create a label for the PERT diagram
   * @param {String|Object} txt the label text or configuration object
   * @returns {draw2d.shape.basic.Label} the created label
   * @private
   */
  createLabel(txt: string | any): Label;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}
