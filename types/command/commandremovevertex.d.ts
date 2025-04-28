import { Command } from './command';
import { Line } from '../shape/basic/line';
import { Point } from '../geo/point';

/**
 * Command to remove a vertex from a polyline or polygon.
 */
export class CommandRemoveVertex extends Command {
  /**
   * Create a remove vertex command.
   *
   * @param line The polyline/polygon to modify
   * @param index The index of the vertex to remove
   */
  constructor(line: Line, index: number);

  /** The line to modify */
  protected line: Line;

  /** The index of the vertex to remove */
  protected index: number;

  /** The removed point */
  protected removedPoint: Point | null;

  /**
   * Returns true if the command can be executed
   *
   * @returns True if the command can be executed
   */
  canExecute(): boolean;

  /**
   * Execute the command the first time
   * @returns True if successful
   */
  execute(): boolean;

  /**
   * Undo the command
   * @returns True if successful
   */
  undo(): boolean;

  /**
   * Redo the command after it has been undone
   * @returns True if successful
   */
  redo(): boolean;
}
