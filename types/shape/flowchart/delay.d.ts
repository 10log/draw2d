import { FlexGridLayout } from '../layout/flexgridlayout';
import { Label } from '../basic/label';

/**
 * A delay shape for flowcharts representing a waiting or delay operation.
 * This shape is represented as a semi-circle with a label inside.
 */
export class Delay extends FlexGridLayout {
  /**
   * Create a new Delay element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the delay text */
  readonly label: Label;

  /**
   * Set the text for the delay
   *
   * @param {String} text The delay text
   * @returns {this}
   */
  setText(text: string): this;

  /**
   * Get the text of the delay
   *
   * @returns {String} The delay text
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
