import { Figure } from '../core/figure';
import { ArrayList } from '../util/arraylist';

/**
 * Layout components for arranging figures
 */
export namespace layout {
  /**
   * Base class for layout figures
   */
  export class Layout extends Figure {
    /**
     * Creates a new layout figure
     * @param attr Optional attributes for the layout
     */
    constructor(attr?: any);

    /**
     * Add a figure to this layout
     * @param figure The figure to add
     * @returns this
     */
    addFigure(figure: Figure): this;

    /**
     * Remove a figure from this layout
     * @param figure The figure to remove
     * @returns The removed figure or null
     */
    removeFigure(figure: Figure): Figure | null;

    /**
     * Get all child figures
     * @returns The list of figures
     */
    getAssignedFigures(): ArrayList<Figure>;
  }

  /**
   * A horizontal layout that arranges figures in a row
   */
  export class HorizontalLayout extends Layout {
    /**
     * Creates a new horizontal layout
     * @param attr Optional attributes for the layout
     */
    constructor(attr?: any);

    /**
     * Set the gap between elements
     * @param gap The gap size
     * @returns this
     */
    setGap(gap: number): this;

    /**
     * Get the gap between elements
     * @returns The gap size
     */
    getGap(): number;
  }

  /**
   * A vertical layout that arranges figures in a column
   */
  export class VerticalLayout extends Layout {
    /**
     * Creates a new vertical layout
     * @param attr Optional attributes for the layout
     */
    constructor(attr?: any);

    /**
     * Set the gap between elements
     * @param gap The gap size
     * @returns this
     */
    setGap(gap: number): this;

    /**
     * Get the gap between elements
     * @returns The gap size
     */
    getGap(): number;
  }

  /**
   * A stack layout that arranges figures on top of each other
   */
  export class StackLayout extends Layout {
    /**
     * Creates a new stack layout
     * @param attr Optional attributes for the layout
     */
    constructor(attr?: any);
  }

  /**
   * A table layout that arranges figures in a grid
   */
  export class TableLayout extends Layout {
    /**
     * Creates a new table layout
     * @param attr Optional attributes for the layout
     */
    constructor(attr?: any);

    /**
     * Add a figure to a specific cell
     * @param figure The figure to add
     * @param row The row index
     * @param column The column index
     * @returns this
     */
    addFigure(figure: Figure, row: number, column: number): this;

    /**
     * Set the padding between cells
     * @param padding The padding size
     * @returns this
     */
    setPadding(padding: number): this;

    /**
     * Get the padding between cells
     * @returns The padding size
     */
    getPadding(): number;
  }

  /**
   * A flexible grid layout
   */
  export class FlexGridLayout extends Layout {
    /**
     * Creates a new flex grid layout
     * @param attr Optional attributes for the layout
     */
    constructor(attr?: any);
  }
}