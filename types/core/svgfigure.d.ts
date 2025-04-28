import { SetFigure } from './setfigure';

/**
 * Abstract class which can handle plain SVG content.
 */
export class SVGFigure extends SetFigure {
  /**
   * Creates a new figure element which is not assigned to any canvas.
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The SVG content of the figure */
  svg: string;

  /**
   * Set the SVG content of this figure
   * @param {String} svg The SVG document as string
   * @returns {this}
   */
  setSVG(svg: string): this;

  /**
   * Get the SVG content of this figure
   * @returns {String} The SVG document
   */
  getSVG(): string;

  /**
   * @inheritdoc
   */
  createSet(): any;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}
