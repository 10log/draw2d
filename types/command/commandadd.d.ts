import { Command } from './command';
import { Canvas } from '../core/canvas';
import { Figure } from '../core/figure';
import { Point } from '../geo/point';

/**
 * Command to add a figure with CommandStack support.
 */
export class CommandAdd extends Command {
  /**
   * Create an add command for the given figure.
   *
   * @param canvas The canvas to use
   * @param figure The figure to add
   * @param x The x-coordinate or a complete point where to place the figure
   * @param y The y-coordinate if x is a number and not a complete point
   */
  constructor(canvas: Canvas, figure: Figure, x: number | Point, y?: number);

  /** The figure to add */
  protected figure: Figure;

  /** The canvas to add the figure to */
  protected canvas: Canvas;

  /** The position where to add the figure */
  protected pos: Point;

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
   * Redo the command after the user has undone this command
   * @returns True if successful
   */
  redo(): boolean;

  /**
   * Undo the command
   * @returns True if successful
   */
  undo(): boolean;
}
