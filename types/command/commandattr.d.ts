import { Command } from './command';
import { Figure } from '../core/figure';

/**
 * Command to change attributes of a shape with undo/redo support
 */
export class CommandAttr extends Command {
  /**
   * Create a new Command object which provides undo/redo for attributes.
   *
   * @param figure The figure to handle
   * @param newAttributes New attributes to set
   */
  constructor(figure: Figure, newAttributes: Record<string, any>);

  /** The figure to modify */
  protected figure: Figure;

  /** The new attributes to set */
  protected newAttributes: Record<string, any>;

  /** The old attributes for undo */
  protected oldAttributes: Record<string, any>;

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
