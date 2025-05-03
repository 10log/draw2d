import { Command } from './command';
import { Figure } from '../core/figure';
import { Point } from '../geo/point';

/**
 * Command to move a figure with command stack support.
 */
export class CommandMove extends Command {
  /**
   * Create a move command for the given figure.
   *
   * @param figure The figure to move
   * @param x The new x coordinate or the complete new position as Point
   * @param y The new y coordinate if x is a number and not a Point
   */
  constructor(figure: Figure, x: number | Point, y?: number);

  /** The figure to move */
  protected figure: Figure;

  /** The old x position */
  protected oldX: number;

  /** The old y position */
  protected oldY: number;

  /** The new x position */
  protected newX: number;

  /** The new y position */
  protected newY: number;

  /**
   * Returns true if the command can be executed, i.e., if the figure exists and
   * the new position is different from the old position.
   *
   * @returns True if the command can be executed
   */
  canExecute(): boolean;

  /**
   * Execute the command the first time.
   * Moves the figure to the new position.
   * @returns True if successful
   */
  execute(): boolean;

  /**
   * Undo the command.
   * Moves the figure back to the old position.
   * @returns True if successful
   */
  undo(): boolean;

  /**
   * Redo the command after it has been undone.
   * Moves the figure to the new position again.
   * @returns True if successful
   */
  redo(): boolean;
}
