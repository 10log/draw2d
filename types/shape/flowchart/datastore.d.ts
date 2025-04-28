import { FlexGridLayout } from '../layout/flexgridlayout';
import { Label } from '../basic/label';

/**
 * A data store shape for flowcharts representing database or storage operations.
 * This shape is represented as a cylinder with a label inside.
 */
export class DataStore extends FlexGridLayout {
  /**
   * Create a new DataStore element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the data store text */
  readonly label: Label;

  /**
   * Set the text for the data store
   *
   * @param {String} text The data store text
   * @returns {this}
   */
  setText(text: string): this;

  /**
   * Get the text of the data store
   *
   * @returns {String} The data store text
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
