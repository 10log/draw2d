import { Figure } from '../core/figure';
import { Color } from '../util/color';

/**
 * Basic shape namespace with common shapes
 */
export namespace basic {
  /**
   * A basic rectangle shape
   */
  export class Rectangle extends Figure {
    /**
     * Creates a new rectangle
     * @param attr Optional attributes for the rectangle
     */
    constructor(attr?: any);

    /**
     * Set the radius of the rectangle edges
     * @param radius Corner radius
     * @returns this
     */
    setRadius(radius: number): this;

    /**
     * Get the radius of the rectangle edges
     * @returns Corner radius
     */
    getRadius(): number;
  }

  /**
   * A basic circle shape
   */
  export class Circle extends Figure {
    /**
     * Creates a new circle
     * @param attr Optional attributes for the circle
     */
    constructor(attr?: any);

    /**
     * Set the diameter of the circle
     * @param d The new diameter
     * @returns this
     */
    setDiameter(d: number): this;

    /**
     * Get the diameter of the circle
     * @returns The current diameter
     */
    getDiameter(): number;
  }

  /**
   * A basic line shape
   */
  export class Line extends Figure {
    /**
     * Creates a new line
     * @param attr Optional attributes for the line
     */
    constructor(attr?: any);

    /**
     * Set the start point of the line
     * @param x The x coordinate
     * @param y The y coordinate
     * @returns this
     */
    setStartPoint(x: number, y: number): this;

    /**
     * Set the end point of the line
     * @param x The x coordinate
     * @param y The y coordinate
     * @returns this
     */
    setEndPoint(x: number, y: number): this;

    /**
     * Set the color of the line
     * @param color The new color
     * @returns this
     */
    setColor(color: string | Color): this;

    /**
     * Get the color of the line
     * @returns The current color
     */
    getColor(): Color;

    /**
     * Set the stroke width of the line
     * @param w The new stroke width
     * @returns this
     */
    setStroke(w: number): this;

    /**
     * Get the stroke width of the line
     * @returns The current stroke width
     */
    getStroke(): number;
  }

  /**
   * A basic label
   */
  export class Label extends Figure {
    /**
     * Creates a new label
     * @param attr Optional attributes for the label
     */
    constructor(attr?: any);

    /**
     * Set the text of the label
     * @param text The new text
     * @returns this
     */
    setText(text: string): this;

    /**
     * Get the text of the label
     * @returns The current text
     */
    getText(): string;

    /**
     * Set the font size
     * @param size The new font size
     * @returns this
     */
    setFontSize(size: number): this;

    /**
     * Get the font size
     * @returns The current font size
     */
    getFontSize(): number;

    /**
     * Set the font color
     * @param color The new font color
     * @returns this
     */
    setFontColor(color: string | Color): this;

    /**
     * Get the font color
     * @returns The current font color
     */
    getFontColor(): Color;

    /**
     * Set bold text style
     * @param bold True for bold text
     * @returns this
     */
    setBold(bold: boolean): this;

    /**
     * Check if text is bold
     * @returns True if text is bold
     */
    isBold(): boolean;

    /**
     * Set the font family
     * @param font The new font family
     * @returns this
     */
    setFontFamily(font: string): this;

    /**
     * Get the font family
     * @returns The current font family
     */
    getFontFamily(): string;
  }

  /**
   * A basic image
   */
  export class Image extends Figure {
    /**
     * Creates a new image
     * @param attr Optional attributes for the image
     */
    constructor(attr?: any);

    /**
     * Set the path/URL of the image
     * @param path The new image path
     * @returns this
     */
    setPath(path: string): this;

    /**
     * Get the path/URL of the image
     * @returns The current image path
     */
    getPath(): string;
  }

  /**
   * A text field shape
   */
  export class Text extends Figure {
    /**
     * Creates a new text field
     * @param attr Optional attributes for the text field
     */
    constructor(attr?: any);

    /**
     * Set the text
     * @param text The new text
     * @returns this
     */
    setText(text: string): this;

    /**
     * Get the text
     * @returns The current text
     */
    getText(): string;
  }
}
