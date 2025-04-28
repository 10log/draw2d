import { VectorFigure } from '../../core/vectorfigure';

/**
 * A Rectangle Figure.
 */
export class Rectangle extends VectorFigure {
  /**
   * Creates a new Rectangle
   * @param attr Optional attributes for the rectangle
   * @param setter Add or replace setter methods
   * @param getter Add or replace getter methods
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** Internal storage for dash pattern */
  private dasharray: string | null;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;

  /**
   * @inheritdoc
   */
  applyTransformation(): this;

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * Set the line style for dot/dash styling. Possible values are
   * ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]
   *
   * @param pattern The string with the dot/dash pattern
   * @returns this
   */
  setDashArray(pattern: string): this;

  /**
   * Get the line style for this object.
   * @returns The current dash pattern
   */
  getDashArray(): string | null;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}
