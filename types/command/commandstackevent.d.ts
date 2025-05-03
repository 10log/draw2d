import { Command } from './command';
import { CommandStack } from './commandstack';

/**
 * Event class which will be fired for every CommandStack operation.
 * Required for CommandStackListener.
 */
export class CommandStackEvent {
  /**
   * Create a new CommandStackEvent object.
   *
   * @param stack The CommandStack that generated this event
   * @param command The related command
   * @param details The current state of the command execution
   * @param action The action that triggered this event (execute, undo, redo)
   */
  constructor(stack: CommandStack, command: Command, details: number, action: string);

  /** The CommandStack that generated this event */
  stack: CommandStack;

  /** The Command associated with this event */
  command: Command;

  /** The details of this event, see CommandStack constants */
  details: number;

  /** The action that triggered this event (execute, undo, redo) */
  action: string;

  /**
   * Return the corresponding stack of the event.
   * @returns The CommandStack that generated this event
   */
  getStack(): CommandStack;

  /**
   * Returns null or a Command if a command is relevant to the current event.
   * @returns The Command associated with this event
   */
  getCommand(): Command;

  /**
   * Returns an integer identifying the type of event which has occurred.
   * Defined by {@link CommandStack}.
   * @returns The event type
   */
  getDetails(): number;

  /**
   * Returns true if this event is fired after the stack having changed.
   * @returns true if post-change event
   */
  isPostChangeEvent(): boolean;

  /**
   * Returns true if this event is fired prior to the stack changing.
   * @returns true if pre-change event
   */
  isPreChangeEvent(): boolean;
}
