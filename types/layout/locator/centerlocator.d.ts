import { Figure } from '../../core/figure';
import { Locator } from './locator';

/**
 * A CenterLocator is used to place figures in the center of a parent shape.
 * This locator positions the target figure exactly in the middle of its parent.
 */
export class CenterLocator extends Locator {
  /**
   * Creates a new CenterLocator
   *
   * @param attr Additional initialization attributes
   * @param setter Key/value map of injected setter methods
   * @param getter Key/value map of injected getter methods
   */
  constructor(attr?: object, setter?: object, getter?: object);

  /**
   * Relocates the given Figure to the center of its parent.
   *
   * @param index Child index of the target
   * @param target The figure to relocate
   */
  relocate(index: number, target: Figure): void;
}
