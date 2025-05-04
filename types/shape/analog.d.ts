import { Figure } from '../core/figure';

/**
 * An operational amplifier
 */
export class OpAmp extends Figure {
  /**
   * Creates a new operational amplifier
   * @param attr Optional attributes for the component
   */
  constructor(attr?: any);

  /**
   * Create an input port
   * @param name Port name
   * @returns The created port
   */
  createPort(name: string): any;
}

/**
 * A resistor bridge component
 */
export class ResistorBridge extends Figure {
  /**
   * Creates a new resistor bridge
   * @param attr Optional attributes for the component
   */
  constructor(attr?: any);

  /**
   * Create an input port
   * @param name Port name
   * @returns The created port
   */
  createPort(name: string): any;
}

/**
 * A vertical resistor component
 */
export class ResistorVertical extends Figure {
  /**
   * Creates a new vertical resistor
   * @param attr Optional attributes for the component
   */
  constructor(attr?: any);

  /**
   * Create an input port
   * @param name Port name
   * @returns The created port
   */
  createPort(name: string): any;
}

/**
 * A horizontal voltage supply component
 */
export class VoltageSupplyHorizontal extends Figure {
  /**
   * Creates a new horizontal voltage supply
   * @param attr Optional attributes for the component
   */
  constructor(attr?: any);

  /**
   * Create an input port
   * @param name Port name
   * @returns The created port
   */
  createPort(name: string): any;
}

/**
 * A vertical voltage supply component
 */
export class VoltageSupplyVertical extends Figure {
  /**
   * Creates a new vertical voltage supply
   * @param attr Optional attributes for the component
   */
  constructor(attr?: any);

  /**
   * Create an input port
   * @param name Port name
   * @returns The created port
   */
  createPort(name: string): any;
}

// Export namespace for backwards compatibility
export namespace analog {
  export { 
    OpAmp, ResistorBridge, ResistorVertical, 
    VoltageSupplyHorizontal, VoltageSupplyVertical 
  };
}