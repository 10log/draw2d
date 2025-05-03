import { SetFigure } from '../../core/setfigure';

/**
 * Base class for all diagram shapes.
 */
export class Diagram extends SetFigure {
  /**
   * Creates a new diagram figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * @inheritdoc
   */
  createSet(): any;
  
  /**
   * Set the data for the diagram
   * @param {Array} data the data to display
   */
  setData(data: any[]): this;
  
  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}