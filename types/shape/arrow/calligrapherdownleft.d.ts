import { SVGFigure } from '../../core/svgfigure';

/**
 * Hand drawn arrow which points down left.
 */
export class CalligrapherArrowDownLeft extends SVGFigure {
  /**
   * Creates a new calligrapher arrow down left figure
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