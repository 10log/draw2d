import { Command } from './command';
import { Line } from '../shape/basic/line';
import { Point } from '../geo/point';

/**
 * Command to move a line with command stack support.
 */
export class CommandMoveLine extends Command {
  /**
   * Create a move line command.
   *
   * @param line The line to move
   * @param dx The x delta for the move operation
   * @param dy The y delta for the move operation
   */
  constructor(line: Line, dx: number, dy: number);

  /** The line to move */
  protected line: Line;

  /** The x delta for the move operation */
  protected dx: number;

  /** The y delta for the move operation */
  protected dy: number;

  /** The old start point */
  protected oldStartPoint: Point;

  /** The old end point */
  protected oldEndPoint: Point;

  /**
   * Returns true if the command can be executed, i.e., if at least one coordinate changes.
   *
   * @returns True if the command can be executed
   */
  canExecute(): boolean;

  /**
   * Execute the command the first time.
   * Move the line.
   * @returns True if successful
   */
  execute(): boolean;

  /**
   * Undo the command.
   * Reset to the old line points.
   * @returns True if successful
   */
  undo(): boolean;

  /**
   * Redo the command after it has been undone.
   * Move the line again.
   * @returns True if successful
   */
  redo(): boolean;
}