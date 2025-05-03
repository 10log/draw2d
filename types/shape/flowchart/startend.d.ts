import { FlexGridLayout } from '../layout/flexgridlayout';
import { Label } from '../basic/label';

/**
 * A Start/End shape for flowcharts representing the beginning or end of a flow.
 * This shape is represented as a rounded rectangle or oval with a label inside.
 */
export class StartEnd extends FlexGridLayout {
  /**
   * Create a new StartEnd element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the start/end text */
  readonly label: Label;

  /**
   * Set the text for the start/end shape
   *
   * @param {String} text The start/end text
   * @returns {this}
   */
  setText(text: string): this;

  /**
   * Get the text of the start/end shape
   *
   * @returns {String} The start/end text
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
