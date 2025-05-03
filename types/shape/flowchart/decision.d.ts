import { FlexGridLayout } from '../layout/flexgridlayout';
import { Label } from '../basic/label';

/**
 * A decision shape for flowcharts representing a conditional branch.
 * This shape is represented as a diamond with a label inside.
 */
export class Decision extends FlexGridLayout {
  /**
   * Create a new Decision element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the decision text */
  readonly label: Label;

  /**
   * Set the text for the decision
   *
   * @param {String} text The decision text
   * @returns {this}
   */
  setText(text: string): this;

  /**
   * Get the text of the decision
   *
   * @returns {String} The decision text
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
