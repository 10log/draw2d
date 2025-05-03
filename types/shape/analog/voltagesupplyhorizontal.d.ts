import { SVGFigure } from '../../core/svgfigure';
import { Port } from '../../core/port';

/**
 * A horizontal voltage supply shape for electronic circuit diagrams.
 */
export class VoltageSupplyHorizontal extends SVGFigure {
  /**
   * Creates a new horizontal voltage supply figure
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