import { Command } from './command';
import { Figure } from '../core/figure';
import { Canvas } from '../core/canvas';
import { ArrayList } from '../util/arraylist';

/**
 * Command to group a collection of figures.
 */
export class CommandGroup extends Command {
  /**
   * Create a group command for the given figure.
   *
   * @param canvas The canvas containing the figures
   * @param figures The figures to group
   */
  constructor(canvas: Canvas, figures: ArrayList<Figure>);

  /** The figures to group */
  protected figures: ArrayList<Figure>;

  /** The canvas */
  protected canvas: Canvas;

  /** The created group */
  protected group: Figure | null;

  /**
   * Returns [true] if the command can be executed and the execution of the
   * command changes the model. A CommandMove with [startX,startX] == [endX,endY] should
   * return false in this method
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
   * Redo the command after the user has undone it
   * @returns True if successful
   */
  redo(): boolean;
}
