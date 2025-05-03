import { Composite } from './composite';
import { Figure } from '../../core/figure';

/**
 * A Jailhouse is a composite figure with fixed child positions.
 * The children are locked into position in the container and can't be moved around.
 */
export class Jailhouse extends Composite {
  /**
   * Creates a new Jailhouse element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Set the dimension of the jailhouse
   *
   * @param {Number} w The new width
   * @param {Number} h The new height
   * @returns {this}
   */
  setDimension(w: number, h: number): this;

  /**
   * Add a figure to the jailhouse at a specific position
   *
   * @param {draw2d.Figure} figure The figure to add
   * @param {Object} [pos] The position where to add the figure
   * @param {Number} [pos.x] The x coordinate
   * @param {Number} [pos.y] The y coordinate
   * @returns {this}
   */
  add(figure: Figure, pos?: { x?: number, y?: number }): this;

  /**
   * Remove a figure from the jailhouse
   *
   * @param {draw2d.Figure} figure The figure to remove
   * @returns {this}
   */
  remove(figure: Figure): this;

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * Create the set of figures for this composite
   *
   * @returns {Object} The created set
   */
  createSet(): any;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}
