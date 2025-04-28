import { SetFigure } from '../../setfigure';
import { Port } from '../../core/port';

/**
 * A capacitor shape for electronic circuit diagrams.
 */
export class Capacitor extends SetFigure {
  /**
   * Creates a new capacitor figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The input port */
  readonly input: Port;

  /** The output port */
  readonly output: Port;

  /**
   * @inheritdoc
   */
  createSet(): any;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}
