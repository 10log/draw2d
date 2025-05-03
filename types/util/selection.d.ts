import { Figure } from '../core/figure';
import { ArrayList } from './arraylist';

/**
 * Represents a selection of figures in the canvas.
 */
export class Selection {
  /**
   * Creates a new Selection
   */
  constructor();

  /** The selected figures */
  figures: ArrayList<Figure>;

  /** The primary selection figure */
  primary: Figure | null;

  /**
   * Return the primary selected figure, if any
   * @returns The primary selection or null
   */
  getPrimary(): Figure | null;

  /**
   * Set the primary selection
   * @param figure The figure to set as primary selection
   * @returns this
   */
  setPrimary(figure: Figure | null): this;

  /**
   * Get all selected figures
   * @returns The selected figures
   */
  getAll(): ArrayList<Figure>;

  /**
   * Return the size of selected figures
   * @returns The number of selected figures
   */
  getSize(): number;

  /**
   * Check if the given figure is selected
   * @param figure The figure to check
   * @returns True if the figure is selected
   */
  contains(figure: Figure): boolean;

  /**
   * Select a figure in addition to already selected figures. Fires an 'select' event.
   * @param figure The figure to select
   * @returns this
   */
  add(figure: Figure): this;

  /**
   * Removes a figure from the selection. Fires an 'unselect' event.
   * @param figure The figure to remove
   * @returns this
   */
  remove(figure: Figure): this;

  /**
   * Removes all current selections and adds the given figure. Fires an 'unselect'
   * event for all previously selected figures and 'select' for the new selection.
   * @param figure The figure to select (exclusive)
   * @returns this
   */
  setFigure(figure: Figure): this;

  /**
   * Replace the current selection with the collection of figures
   * @param figures The new selection
   * @returns this
   */
  setAll(figures: Figure[] | ArrayList<Figure>): this;

  /**
   * Return the dimension of the selection
   * @returns The bounding box dimension
   */
  getBoundingBox(): any;

  /**
   * Checks if any figure is selected
   * @returns True if any figure is selected
   */
  isEmpty(): boolean;

  /**
   * Clear the current selection. Fires an 'unselect' event.
   * @returns this
   */
  clear(): this;

  /**
   * Performs a hit test with the selection geometry and returns a list of
   * figures which are affected of the current selection.
   * @param canvas The canvas to consider
   * @returns The affected figures
   */
  getAffectedFigures(canvas: any): ArrayList<Figure>;

  /**
   * Execute a function for each figure currently selected
   * @param func The function to execute for each selected figure
   * @param reverse True if iteration should be in reverse order
   */
  each(func: (figure: Figure, index: number) => void, reverse?: boolean): void;
}
