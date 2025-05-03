import { SVGFigure } from '../../core/svgfigure';
import { Port } from '../../core/port';

/**
 * A vertical voltage supply shape for electronic circuit diagrams.
 */
export class VoltageSupplyVertical extends SVGFigure {
  /**
   * Creates a new vertical voltage supply figure
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