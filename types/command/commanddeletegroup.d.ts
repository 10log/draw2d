import { Command } from './command';
import { Figure } from '../core/figure';

/**
 * Command to delete a group figure with command stack support.
 */
export class CommandDeleteGroup extends Command {
  /**
   * Create a new group delete command.
   *
   * @param group The composite figure (group) to delete
   */
  constructor(group: Figure);

  /** The group to delete */
  protected group: Figure;

  /**
   * Returns true if the command can be executed, i.e., if a group exists
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
   * Redo the command after it has been undone
   * @returns True if successful
   */
  redo(): boolean;

  /**
   * Undo the command
   * @returns True if successful
   */
  undo(): boolean;
}
