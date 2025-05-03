import { SVGFigure } from '../../core/svgfigure';
import { Port } from '../../core/port';

/**
 * A resistor bridge shape for electronic circuit diagrams.
 */
export class ResistorBridge extends SVGFigure {
  /**
   * Creates a new resistor bridge figure
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