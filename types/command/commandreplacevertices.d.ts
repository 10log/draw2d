import { Command } from './command';
import { Line } from '../shape/basic/line';
import { Point } from '../geo/point';
import { ArrayList } from '../util/arraylist';

/**
 * Command to replace vertices in a polyline or polygon.
 */
export class CommandReplaceVertices extends Command {
  /**
   * Create a replace vertices command.
   *
   * @param line The polyline/polygon to modify
   * @param vertices The new vertices
   */
  constructor(line: Line, vertices: ArrayList<Point> | Point[]);

  /** The line to modify */
  protected line: Line;

  /** The new vertices */
  protected newVertices: ArrayList<Point>;

  /** The old vertices */
  protected oldVertices: ArrayList<Point>;

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