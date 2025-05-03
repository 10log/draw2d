import { FlexGridLayout } from '../layout/flexgridlayout';
import { Label } from '../basic/label';

/**
 * A document shape for flowcharts representing data or input/output.
 * This shape is represented as a parallelogram with a label inside.
 */
export class Document extends FlexGridLayout {
  /**
   * Create a new Document element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the document text */
  readonly label: Label;

  /**
   * Set the text for the document
   *
   * @param {String} text The document text
   * @returns {this}
   */
  setText(text: string): this;

  /**
   * Get the text of the document
   *
   * @returns {String} The document text
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
