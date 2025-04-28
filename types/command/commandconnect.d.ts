import { Command } from './command';
import { Canvas } from '../core/canvas';
import { Connection } from '../core/connection';
import { Port } from '../core/port';

/**
 * Command for the connection of two ports with a connection.
 */
export class CommandConnect extends Command {
  /**
   * Create a new connection command for the CommandStack.
   *
   * @param canvas The canvas containing the connections
   * @param source The source port for the connection
   * @param target The target port for the connection
   * @param connection The connection to create or null if the framework should create one
   */
  constructor(canvas: Canvas, source: Port, target: Port, connection?: Connection | null);

  /** The target port of the connection */
  protected target: Port;

  /** The source port of the connection */
  protected source: Port;

  /** The connection to create */
  protected connection: Connection;

  /** The canvas to add the connection */
  protected canvas: Canvas;

  /**
   * Returns true if the command can be executed, i.e. if source and target port
   * exist and are different.
   *
   * @returns True if the command can be executed
   */
  canExecute(): boolean;

  /**
   * Execute the command the first time.
   * Executes the creation of the connection.
   * @returns True if successful
   */
  execute(): boolean;

  /**
   * Undo the command.
   * Removes the connection.
   * @returns True if successful
   */
  undo(): boolean;

  /**
   * Redo the command after it has been undone.
   * Recreates the connection.
   * @returns True if successful
   */
  redo(): boolean;
}
