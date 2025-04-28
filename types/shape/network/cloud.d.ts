import { Figure } from '../../core/figure';
import { Label } from '../basic/label';

/**
 * A Cloud shape for network and architecture diagrams.
 * This shape represents cloud services or the internet in network diagrams.
 */
export class Cloud extends Figure {
  /**
   * Create a new Cloud element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the cloud name */
  readonly label: Label;

  /**
   * Set the name of the cloud element
   *
   * @param {String} name The cloud element name
   * @returns {this}
   */
  setName(name: string): this;

  /**
   * Get the name of the cloud element
   *
   * @returns {String} The cloud element name
   */
  getName(): string;

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
