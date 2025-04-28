import { FlexGridLayout } from '../layout/flexgridlayout';
import { Label } from '../basic/label';

/**
 * A process shape for flowcharts representing a process or action step.
 * This shape is represented as a rectangle with a label inside.
 */
export class Process extends FlexGridLayout {
  /**
   * Create a new Process element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the process text */
  readonly label: Label;

  /**
   * Set the text for the process
   *
   * @param {String} text The process text
   * @returns {this}
   */
  setText(text: string): this;

  /**
   * Get the text of the process
   *
   * @returns {String} The process text
   */
  getText(): string;

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}
