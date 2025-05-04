import { Figure } from '../core/figure';
import { Color } from '../util/color';

/**
 * Diagram components and charts
 */
export namespace diagram {
  /**
   * Base class for diagram figures
   */
  export class Diagram extends Figure {
    /**
     * Creates a new diagram
     * @param attr Optional attributes for the diagram
     */
    constructor(attr?: any);
  }

  /**
   * A pie chart figure
   */
  export class Pie extends Diagram {
    /**
     * Creates a new pie chart
     * @param attr Optional attributes for the pie chart
     */
    constructor(attr?: any);

    /**
     * Set the data for the pie chart
     * @param data Array of values for chart segments
     * @returns this
     */
    setData(data: number[]): this;

    /**
     * Get the data for the pie chart
     * @returns Array of values
     */
    getData(): number[];

    /**
     * Set the colors for the pie segments
     * @param colors Array of colors
     * @returns this
     */
    setColors(colors: (string | Color)[]): this;

    /**
     * Get the colors for the pie segments
     * @returns Array of colors
     */
    getColors(): Color[];
  }

  /**
   * A sparkline chart to show data trends
   */
  export class Sparkline extends Diagram {
    /**
     * Creates a new sparkline chart
     * @param attr Optional attributes for the sparkline
     */
    constructor(attr?: any);

    /**
     * Set the data points for the sparkline
     * @param data Array of data points
     * @returns this
     */
    setData(data: number[]): this;

    /**
     * Get the data points for the sparkline
     * @returns Array of data points
     */
    getData(): number[];

    /**
     * Set the line color
     * @param color The new line color
     * @returns this
     */
    setColor(color: string | Color): this;

    /**
     * Get the line color
     * @returns The current line color
     */
    getColor(): Color;
  }
}