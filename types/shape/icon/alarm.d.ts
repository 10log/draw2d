import { Icon } from './icon';

/**
 * An alarm icon.
 */
export class Alarm extends Icon {
  /**
   * Creates a new alarm icon
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * @inheritdoc
   */
  createSet(): any;
}