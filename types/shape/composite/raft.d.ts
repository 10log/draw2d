import { Composite } from './composite';
import { Figure } from '../../core/figure';

/**
 * A Raft is a figure container with no specific layout. The child figures can be moved
 * around and are always bound to the raft area.
 *
 * The raft allows adding connection between the contained figures.
 */
export class Raft extends Composite {
  /**
   * Creates a new Raft element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Add a figure to the raft
   *
   * @param {draw2d.Figure} figure The figure to add
   * @param {Number} [x] The x position of the figure
   * @param {Number} [y] The y position of the figure
   * @returns {this}
   */
  add(figure: Figure, x?: number, y?: number): this;

  /**
   * Remove a figure from the raft
   *
   * @param {draw2d.Figure} figure The figure to remove
   * @returns {this}
   */
  remove(figure: Figure): this;

  /**
   * @inheritdoc
   */
  delegateTarget(figure: Figure): Figure;

  /**
   * @inheritdoc
   */
  onDrop(droppedDomNode: any, x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}
