import { Figure } from '../core/figure';
import { SVGFigure } from '../core/svgfigure';

/**
 * Arrow components and shapes
 */
export namespace arrow {
  /**
   * A calligrapher arrow pointing down left
   */
  export class CalligrapherArrowDownLeft extends SVGFigure {
    /**
     * Creates a new calligrapher arrow pointing down left
     * @param attr Optional attributes for the arrow
     */
    constructor(attr?: any);
  }

  /**
   * A calligrapher arrow pointing left
   */
  export class CalligrapherArrowLeft extends SVGFigure {
    /**
     * Creates a new calligrapher arrow pointing left
     * @param attr Optional attributes for the arrow
     */
    constructor(attr?: any);
  }
}