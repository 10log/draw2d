import { Command } from './command';
import { Figure } from '../core/figure';
import { Rectangle } from '../geo/rectangle';

/**
 * Set the bounding box of a figure with undo/redo support
 */
export class CommandBoundingBox extends Command {
  /**
   * Create a new resize Command object which can be executed via the CommandStack.
   *
   * @param figure The figure to resize
   * @param boundingBox The new bounding box of the figure
   */
  constructor(figure: Figure, boundingBox: Rectangle);

  /** The figure to resize */
  protected figure: Figure;
  
  /** The old bounding box for undo */
  protected oldBoundingBox: Rectangle;
  
  /** The new bounding box to apply */
  protected newBoundingBox: Rectangle;

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