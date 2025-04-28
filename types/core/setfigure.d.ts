import { Figure } from './figure';
import { ArrayList } from '../util/arraylist';

/**
 * A SetFigure is a figure that acts as a container for other figures.
 */
export class SetFigure extends Figure {
  /**
   * Creates a new set figure
   * @param attr Attributes for initial configuration
   * @param setter Custom setters for attributes
   * @param getter Custom getters for attributes
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The contained figures */
  assignedFigures: ArrayList<Figure>;

  /**
   * Set the assigned figures of this set
   * @param figures The figures to assign
   * @returns this
   */
  assignFigures(figures: Figure[]): this;

  /**
   * Get assigned figures
   * @returns The assigned figures
   */
  getAssignedFigures(): ArrayList<Figure>;

  /**
   * Check if a figure is assigned to this set
   * @param figure The figure to check
   * @returns True if the figure is assigned to this set
   */
  contains(figure: Figure): boolean;

  /**
   * Remove a figure from this set
   * @param figure The figure to remove
   * @returns this
   */
  unassignFigure(figure: Figure): this;

  /**
   * Assign a figure to this set
   * @param figure The figure to add
   * @returns this
   */
  assignFigure(figure: Figure): this;

  /**
   * Get attributes for serialization
   * @returns Object with serializable attributes
   */
  getPersistentAttributes(): any;

  /**
   * Set attributes from serialized data
   * @param memento The serialized data
   * @returns this
   */
  setPersistentAttributes(memento: any): this;
}