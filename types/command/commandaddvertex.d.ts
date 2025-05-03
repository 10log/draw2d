import { Command } from './command';
import { Point } from '../geo/point';
import { PolyLine } from '../shape/basic/polyline';

/**
 * Add a vertex to a polyline or polygon
 */
export class CommandAddVertex extends Command {
  /**
   * Create a new Command object which adds a vertex to a PolyLine / Polygon.
   *
   * @param line The related line
   * @param index The index where to add
   * @param x The x coordinate for the new vertex
   * @param y The y coordinate for the new vertex
   */
  constructor(line: PolyLine, index: number, x: number, y: number);

  /** The line to modify */
  protected line: PolyLine;

  /** The index where to add the new vertex */
  protected index: number;

  /** The new vertex point */
  protected newPoint: Point;

  /**
   * Returns [true] if the command can be executed and the execution of the
   * command modifies the model.
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
   * Redo the command after the user has undone this command
   * @returns True if successful
   */
  redo(): boolean;
}
