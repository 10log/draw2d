import { Command } from './command';
import { Figure } from '../core/figure';

/**
 * Command to ungroup a group figure (or composite) with command stack support.
 */
export class CommandUngroup extends Command {
  /**
   * Create a new ungroup command for the given composite figure.
   *
   * @param group The composite figure to ungroup
   */
  constructor(group: Figure);

  /** The composite figure to ungroup */
  protected group: Figure;

  /**
   * Returns true if the command can be executed, i.e., if a valid composite figure exists
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
