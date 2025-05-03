import { Figure } from '../../core/figure';
import { Locator } from './locator';

/**
 * A TopLocator is used to place figures at the top/center of a parent shape.
 * This locator positions the target figure at the top edge, centered horizontally.
 */
export class TopLocator extends Locator {
  /**
   * Creates a new TopLocator
   *
   * @param attr Additional initialization attributes
   * @param setter Key/value map of injected setter methods
   * @param getter Key/value map of injected getter methods
   */
  constructor(attr?: object, setter?: object, getter?: object);

  /**
   * Relocates the given Figure to the top of its parent.
   *
   * @param index Child index of the target
   * @param target The figure to relocate
   */
  relocate(index: number, target: Figure): void;
}