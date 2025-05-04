import { Figure } from '../core/figure';
import { Color } from '../util/color';

/**
 * Interactive widget components
 */
export namespace widget {
  /**
   * Base class for widget figures
   */
  export class Widget extends Figure {
    /**
     * Creates a new widget
     * @param attr Optional attributes for the widget
     */
    constructor(attr?: any);
  }

  /**
   * A slider control widget
   */
  export class Slider extends Widget {
    /**
     * Creates a new slider widget
     * @param attr Optional attributes for the slider
     */
    constructor(attr?: any);

    /**
     * Set the current value of the slider
     * @param value The new value
     * @param silent If true, don't trigger change events
     * @returns this
     */
    setValue(value: number, silent?: boolean): this;

    /**
     * Get the current value of the slider
     * @returns The current value
     */
    getValue(): number;

    /**
     * Set the minimum value
     * @param min The minimum value
     * @returns this
     */
    setMinValue(min: number): this;

    /**
     * Get the minimum value
     * @returns The minimum value
     */
    getMinValue(): number;

    /**
     * Set the maximum value
     * @param max The maximum value
     * @returns this
     */
    setMaxValue(max: number): this;

    /**
     * Get the maximum value
     * @returns The maximum value
     */
    getMaxValue(): number;

    /**
     * Set the slider orientation
     * @param isHorizontal True for horizontal, false for vertical
     * @returns this
     */
    setOrientation(isHorizontal: boolean): this;

    /**
     * Check if the slider is horizontal
     * @returns True if horizontal, false if vertical
     */
    isHorizontal(): boolean;

    /**
     * Set the thumb color
     * @param color The new thumb color
     * @returns this
     */
    setThumbColor(color: string | Color): this;

    /**
     * Get the thumb color
     * @returns The current thumb color
     */
    getThumbColor(): Color;

    /**
     * Set the track color
     * @param color The new track color
     * @returns this
     */
    setTrackColor(color: string | Color): this;

    /**
     * Get the track color
     * @returns The current track color
     */
    getTrackColor(): Color;
  }
}