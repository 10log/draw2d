import { Icon } from './icon';

/**
 * An attention/warning icon
 *
 * @example
 *
 *    let icon = new draw2d.shape.icon.Attention();
 *    icon.setDimension(150,100);
 *    canvas.add(icon,50,10);
 *
 */
export class Attention extends Icon {
  /**
   * Creates a new figure element which is not assigned to any canvas.
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * @private
   * @returns {Object} the raphaelJS path object
   */
  createSet(): any;
}
