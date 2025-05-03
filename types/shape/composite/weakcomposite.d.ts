import { Composite } from './composite';

/**
 * A weak composite doesn't modify the behavior of any added figure.
 * It's a pure collector without any influence to the behavior.
 */
export class WeakComposite extends Composite {
  /**
   * Creates a new weak composite figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);
}