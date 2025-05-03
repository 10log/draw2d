import { Locator } from './locator';
import { Figure } from '../../core/figure';
import { Connection } from '../../core/connection';

/**
 * Repositions a Figure attached to a Connection when the
 * Connection is moved. Provides for alignment at the start
 * (source), middle, or end (target) of the Connection.
 */
export class ConnectionLocator extends Locator {
  /**
   * Default constructor for a Locator which can layout a figure in context of a Connection
   * @param attr Optional attributes
   * @param setter Optional setters
   * @param getter Optional getters
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * Relocates the given Figure by the given Connection
   * @param index Index of the figure
   * @param figure The figure to relocate
   */
  relocate(index: number, figure: Figure): void;
}