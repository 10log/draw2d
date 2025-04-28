import { Command } from './command';
import { ArrayList } from '../util/arraylist';

/**
 * A CommandCollection works as a single command. You can add more than one
 * Command to this CommandCollection and execute/undo them onto the CommandStack as a
 * single Command.
 */
export class CommandCollection extends Command {
  /**
   * Create a new CommandCollection which can be executed via the CommandStack.
   *
   * @param commandLabel The label to show on the command stack for the undo/redo operation
   */
  constructor(commandLabel?: string);

  /** List of commands in this collection */
  protected commands: ArrayList<Command>;

  /**
   * Add a command to the collection.
   *
   * @param command The command to add
   */
  add(command: Command): void;

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
   * Redo the command after the user has undone this command.
   * @returns True if successful
   */
  redo(): boolean;

  /**
   * Undo the command.
   * @returns True if successful
   */
  undo(): boolean;
}