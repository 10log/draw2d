import { Figure } from '../core/figure';
import { Color } from '../util/color';

/**
 * Note and annotation shapes
 */
export namespace note {
  /**
   * A post-it note shape
   */
  export class PostIt extends Figure {
    /**
     * Creates a new post-it note
     * @param attr Optional attributes for the note
     */
    constructor(attr?: any);

    /**
     * Set the text of the note
     * @param text The new text
     * @returns this
     */
    setText(text: string): this;

    /**
     * Get the text of the note
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
     * Set the background color
     * @param color The new background color
     * @returns this
     */
    setBackgroundColor(color: string | Color): this;

    /**
     * Get the background color
     * @returns The current background color
     */
    getBackgroundColor(): Color;

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
  }
}