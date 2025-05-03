import { SVGFigure } from '../../core/svgfigure';

/**
 * A Post-it note shape.
 */
export class PostIt extends SVGFigure {
  /**
   * Creates a new post-it note figure
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

  /**
   * Set the text of the post-it
   * @param {string} text The new text
   */
  setText(text: string): this;

  /**
   * Get the text of the post-it
   * @returns {string} The current text
   */
  getText(): string;
}