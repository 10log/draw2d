import { SetFigure } from '../../setfigure';
import { Port } from '../../core/port';

/**
 * A transistor shape for electronic circuit diagrams.
 * This represents an NPN bipolar junction transistor.
 */
export class Transistor extends SetFigure {
  /**
   * Creates a new transistor figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The collector port */
  readonly collector: Port;

  /** The base port */
  readonly base: Port;

  /** The emitter port */
  readonly emitter: Port;

  /**
   * @inheritdoc
   */
  createSet(): any;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;
}
