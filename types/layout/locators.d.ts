import { Figure } from '../core/figure';
import { Locator } from './locator';

/**
 * A CenterLocator is used to place figures in the center of a parent figure.
 */
export class CenterLocator extends Locator {
  /**
   * Creates a new center locator
   */
  constructor();

  /**
   * Relocates the given figure to the center of the parent
   * @param index The index of the child figure
   * @param figure The figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}

/**
 * A TopLocator is used to place figures at the top of a parent figure.
 */
export class TopLocator extends Locator {
  /**
   * Creates a new top locator
   */
  constructor();

  /**
   * Relocates the given figure to the top of the parent
   * @param index The index of the child figure
   * @param figure The figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}

/**
 * A BottomLocator is used to place figures at the bottom of a parent figure.
 */
export class BottomLocator extends Locator {
  /**
   * Creates a new bottom locator
   */
  constructor();

  /**
   * Relocates the given figure to the bottom of the parent
   * @param index The index of the child figure
   * @param figure The figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}

/**
 * A LeftLocator is used to place figures on the left border of a parent figure.
 */
export class LeftLocator extends Locator {
  /**
   * Creates a new left locator
   */
  constructor();

  /**
   * Relocates the given figure to the left of the parent
   * @param index The index of the child figure
   * @param figure The figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}

/**
 * A RightLocator is used to place figures on the right border of a parent figure.
 */
export class RightLocator extends Locator {
  /**
   * Creates a new right locator
   */
  constructor();

  /**
   * Relocates the given figure to the right of the parent
   * @param index The index of the child figure
   * @param figure The figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}

/**
 * A XYLocator is used to place figures at a specific position relative to the parent.
 */
export class XYLocator extends Locator {
  /**
   * Creates a new XY locator
   * @param x The x coordinate (0-1) where 0 is left and 1 is right
   * @param y The y coordinate (0-1) where 0 is top and 1 is bottom
   */
  constructor(x: number, y: number);

  /** The x coordinate (0-1) where 0 is left and 1 is right */
  x: number;

  /** The y coordinate (0-1) where 0 is top and 1 is bottom */
  y: number;

  /**
   * Set the x coordinate for the locator
   * @param x The x coordinate (0-1)
   * @returns this
   */
  setX(x: number): this;

  /**
   * Set the y coordinate for the locator
   * @param y The y coordinate (0-1)
   * @returns this
   */
  setY(y: number): this;

  /**
   * Relocates the given figure based on the x/y coordinates
   * @param index The index of the child figure
   * @param figure The figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}
