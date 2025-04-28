import { SetFigure } from '../../setfigure';
import { Port } from '../../core/port';

/**
 * A diode shape for electronic circuit diagrams.
 */
export class Diode extends SetFigure {
  /**
   * Creates a new diode figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The anode port */
  readonly anode: Port;

  /** The cathode port */
  readonly cathode: Port;

  /**
   * @inheritdoc
   */
  createSet(): any;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}
