import { SVGFigure } from '../../core/svgfigure';

/**
 * Hand drawn arrow which points left.
 */
export class CalligrapherArrowLeft extends SVGFigure {
  /**
   * Creates a new calligrapher arrow left figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * @inheritdoc
   */
  getSVG(): string;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}