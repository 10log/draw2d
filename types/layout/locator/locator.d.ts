import { Figure } from '../../core/figure';

/**
 * Controls the location of a Figure within its parent.
 * Locators are used to position elements like labels, ports, or other figures
 * relative to their parent figure.
 */
export class Locator {
  /**
   * Creates a new Locator
   *
   * @param attr Additional initialization attributes
   * @param setter Key/value map of injected setter methods
   * @param getter Key/value map of injected getter methods
   */
  constructor(attr?: object, setter?: object, getter?: object);

  /** A whitelist of setter functions available for this locator */
  setterWhitelist: Record<string, Function>;

  /** A whitelist of getter functions available for this locator */
  getterWhitelist: Record<string, Function>;

  /**
   * Read or set locator attributes.
   * When no value is given, reads specified attribute from the element.
   * When value is given, sets the attribute to that value.
   * Multiple attributes can be set by passing an object with name-value pairs.
   *
   * @param name The attribute name or an object with multiple attributes
   * @param value Optional value to set
   * @returns Either the requested attribute if used as getter or this if used as setter
   */
  attr(name?: string | string[] | Record<string, any>, value?: any): any;

  /**
   * Callback method when a child is bound to a parent.
   * This is the perfect moment to prepare the child node with some basic
   * behavior which is forced by the Locator.
   *
   * @param figure The parent figure
   * @param child The child figure being bound
   * @returns This locator for method chaining
   */
  bind(figure: Figure, child: Figure): this;

  /**
   * Callback method when a child is unbound from the locator.
   *
   * @param figure The parent figure
   * @param child The child figure being unbound
   * @returns This locator for method chaining
   */
  unbind(figure: Figure, child: Figure): this;

  /**
   * Controls the location of a Figure
   *
   * @param index Child index of the figure
   * @param figure The figure to control
   */
  relocate(index: number, figure: Figure): void;

  /**
   * Return a clone of the locator object
   *
   * @returns A new instance of this locator
   */
  clone(): Locator;
}