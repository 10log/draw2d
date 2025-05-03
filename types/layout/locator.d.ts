import { Figure } from '../core/figure';

/**
 * Base interface for layout algorithms
 */
export interface Layout {
  /**
   * Layout the given figure
   * @param figure The figure to layout
   */
  layout(figure: Figure): void;
}

/**
 * Base class for locator implementations which are responsible for
 * placing elements in relation to a parent figure
 */
export class Locator implements Layout {
  /**
   * Creates a new locator
   */
  constructor();

  /**
   * Set the offset for the locator
   * @param x The x offset
   * @param y The y offset
   * @returns this
   */
  setOffset(x: number, y: number): this;

  /**
   * Get the x-offset of the locator
   * @returns The x offset
   */
  getXOffset(): number;

  /**
   * Get the y-offset of the locator
   * @returns The y offset
   */
  getYOffset(): number;

  /**
   * Set the x-offset for the locator
   * @param x The new x offset
   * @returns this
   */
  setXOffset(x: number): this;

  /**
   * Set the y-offset for the locator
   * @param y The new y offset
   * @returns this
   */
  setYOffset(y: number): this;

  /**
   * Relocates the given figure
   * @param index The index of the child figure
   * @param figure The figure to relocate
   */
  relocate(index: number, figure: Figure): void;

  /**
   * Implement the layout method from the base interface
   * @param figure The figure to layout
   */
  layout(figure: Figure): void;
}
