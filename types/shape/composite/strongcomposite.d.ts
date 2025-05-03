import { Composite } from './composite';

/**
 * A strong composite treats its children as inseparable parts of itself.
 */
export class StrongComposite extends Composite {
  /**
   * Creates a new strong composite figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * @inheritdoc
   */
  toFront(figure?: any): this;
  
  /**
   * @inheritdoc
   */
  toBack(figure?: any): this;
  
  /**
   * @inheritdoc
   */
  delegateTarget(draggedFigure: any): this;
}