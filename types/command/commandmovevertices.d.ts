import { Command } from './command';
import { Line } from '../shape/basic/line';
import { Point } from '../geo/point';
import { ArrayList } from '../util/arraylist';

/**
 * Command to move all vertices of a polyline or polygon.
 */
export class CommandMoveVertices extends Command {
  /**
   * Create a move vertices command.
   *
   * @param line The polyline/polygon to modify
   * @param dx The x delta for the move operation
   * @param dy The y delta for the move operation
   */
  constructor(line: Line, dx: number, dy: number);

  /** The line to modify */
  protected line: Line;

  /** The x delta for the move operation */
  protected dx: number;

  /** The y delta for the move operation */
  protected dy: number;

  /** The old vertices */
  protected oldVertices: ArrayList<Point>;

  /**
   * Returns true if the command can be executed, i.e., if at least one coordinate changes.
   *
   * @returns True if the command can be executed
   */
  canExecute(): boolean;

  /**
   * Execute the command the first time.
   * Move all vertices.
   * @returns True if successful
   */
  execute(): boolean;

  /**
   * Undo the command.
   * Restore the old vertices.
   * @returns True if successful
   */
  undo(): boolean;

  /**
   * Redo the command after it has been undone.
   * Move the vertices again.
   * @returns True if successful
   */
  redo(): boolean;
}
