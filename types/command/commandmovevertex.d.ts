import { Command } from './command';
import { Line } from '../shape/basic/line';
import { Point } from '../geo/point';

/**
 * Command to move a vertex of a polyline or polygon.
 */
export class CommandMoveVertex extends Command {
  /**
   * Create a move vertex command.
   *
   * @param line The polyline/polygon to modify
   * @param index The index of the vertex to move
   * @param x The new x coordinate or a Point with the new coordinates
   * @param y The new y coordinate if x is a number
   */
  constructor(line: Line, index: number, x: number | Point, y?: number);

  /** The line to modify */
  protected line: Line;

  /** The index of the vertex to move */
  protected index: number;

  /** The old x coordinate */
  protected oldX: number;

  /** The old y coordinate */
  protected oldY: number;

  /** The new x coordinate */
  protected newX: number;

  /** The new y coordinate */
  protected newY: number;

  /**
   * Returns true if the command can be executed, i.e., if the coordinates changed.
   *
   * @returns True if the command can be executed
   */
  canExecute(): boolean;

  /**
   * Execute the command the first time.
   * Move the vertex.
   * @returns True if successful
   */
  execute(): boolean;

  /**
   * Undo the command.
   * Restore the old vertex position.
   * @returns True if successful
   */
  undo(): boolean;

  /**
   * Redo the command after it has been undone.
   * Move the vertex again.
   * @returns True if successful
   */
  redo(): boolean;
}
