import { Command } from './command';

/**
 * The CommandStack is responsible for executing, undoing, and redoing Commands.
 * CommandStack manages the execution, undo, and redo of Commands.
 * Commands are executed by calling {@link execute}. Commands can be undone and redone
 * as long as they support it.
 */
export class CommandStack {
  /**
   * Creates a new command stack
   */
  constructor();

  /** The max size of the undo / redo stack. */
  maxSize: number;

  /** @private The undo stack */
  private undostack: Command[];

  /** @private The redo stack */
  private redostack: Command[];

  /**
   * Execute a command and push it onto the stack if successful
   * @param command The command to execute
   * @returns true if successful
   */
  execute(command: Command): boolean;

  /**
   * Undo the last executed command
   * @returns true if successful
   */
  undo(): boolean;

  /**
   * Redo the last undone command
   * @returns true if successful
   */
  redo(): boolean;

  /**
   * Clear the command stack
   * @returns this
   */
  clear(): this;

  /**
   * Returns the command which can be undone
   * @returns The command that would be undone with the next call to undo()
   */
  getUndoLabel(): string | null;

  /**
   * Returns the command which can be redone
   * @returns The command that would be redone with the next call to redo()
   */
  getRedoLabel(): string | null;

  /**
   * Returns if it is possible to redo
   * @returns True if possible to redo
   */
  canRedo(): boolean;

  /**
   * Returns if it is possible to undo
   * @returns True if possible to undo
   */
  canUndo(): boolean;

  /**
   * Return the undo stack
   * @returns The undo stack
   */
  getUndoStack(): Command[];

  /**
   * Return the redo stack
   * @returns The redo stack
   */
  getRedoStack(): Command[];
}
