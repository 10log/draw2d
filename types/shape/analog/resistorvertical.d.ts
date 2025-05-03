import { SVGFigure } from '../../core/svgfigure';
import { Port } from '../../core/port';

/**
 * A vertical resistor shape for electronic circuit diagrams.
 */
export class ResistorVertical extends SVGFigure {
  /**
   * Creates a new vertical resistor figure
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