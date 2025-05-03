/**
 * Commands are the core concept of any draw2d application to enable undo/redo
 * support. Commands are used to change the model and provide methods to revert
 * the change.
 */
export class Command {
  /**
   * Creates a new command
   * @param label The label to show on the undo/redo stack
   */
  constructor(label?: string);

  /** Unique ID for this command instance */
  id: string;

  /** The user-friendly name for this command to display in UI */
  label: string;

  /**
   * Returns whether we can undo this command
   * @returns True if the command can be undone
   */
  canUndo(): boolean;

  /**
   * Returns whether we can redo this command
   * @returns True if the command can be redone
   */
  canRedo(): boolean;

  /**
   * Execute the command the first time
   * @returns true if successful
   */
  execute(): boolean;

  /**
   * Undo the command
   * @returns true if successful
   */
  undo(): boolean;

  /**
   * Redo the command after being undone
   * @returns true if successful
   */
  redo(): boolean;
}
