import { Figure } from '../core/figure';
import { Locator } from './locator';

/**
 * A PortLocator is used to place ports on a figure
 */
export class PortLocator extends Locator {
  /**
   * Creates a new port locator
   */
  constructor();
}

/**
 * Locator for placing a port at the top center of a figure
 */
export class TopLocator extends PortLocator {
  /**
   * Creates a new top port locator
   */
  constructor();

  /**
   * Relocates the port to the top center of the parent
   * @param index The index of the port
   * @param figure The port figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}

/**
 * Locator for placing a port at the bottom center of a figure
 */
export class BottomLocator extends PortLocator {
  /**
   * Creates a new bottom port locator
   */
  constructor();

  /**
   * Relocates the port to the bottom center of the parent
   * @param index The index of the port
   * @param figure The port figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}

/**
 * Locator for placing a port at the left center of a figure
 */
export class LeftLocator extends PortLocator {
  /**
   * Creates a new left port locator
   */
  constructor();

  /**
   * Relocates the port to the left center of the parent
   * @param index The index of the port
   * @param figure The port figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}

/**
 * Locator for placing a port at the right center of a figure
 */
export class RightLocator extends PortLocator {
  /**
   * Creates a new right port locator
   */
  constructor();

  /**
   * Relocates the port to the right center of the parent
   * @param index The index of the port
   * @param figure The port figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}

/**
 * Locator for positioning input ports (typically on the left side)
 */
export class InputPortLocator extends PortLocator {
  /**
   * Creates a new input port locator
   */
  constructor();

  /**
   * Relocates the input port (typically left side)
   * @param index The index of the port
   * @param figure The port figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}

/**
 * Locator for positioning output ports (typically on the right side)
 */
export class OutputPortLocator extends PortLocator {
  /**
   * Creates a new output port locator
   */
  constructor();

  /**
   * Relocates the output port (typically right side)
   * @param index The index of the port
   * @param figure The port figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}
