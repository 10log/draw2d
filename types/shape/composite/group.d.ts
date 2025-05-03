import { Composite } from './composite';

/**
 * A group is a figure that acts as a container for other figures.
 */
export class Group extends Composite {
  /**
   * Creates a new group figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * @inheritdoc
   */
  ungroup(): void;
}