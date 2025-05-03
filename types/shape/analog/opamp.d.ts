import { SetFigure } from '../../setfigure';
import { Port } from '../../core/port';

/**
 * An operational amplifier shape for electronic circuit diagrams.
 */
export class OpAmp extends SetFigure {
  /**
   * Creates a new operational amplifier figure
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The input port for the non-inverting input */
  readonly input1: Port;

  /** The input port for the inverting input */
  readonly input2: Port;

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
