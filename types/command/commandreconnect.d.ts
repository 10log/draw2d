import { Command } from './command';
import { Connection } from '../core/connection';
import { Port } from '../core/port';

/**
 * Command to reconnect a connection to another port.
 */
export class CommandReconnect extends Command {
  /**
   * Create a reconnect command for the given connection.
   *
   * @param connection The connection to reconnect
   */
  constructor(connection: Connection);

  /** The connection to reconnect */
  protected connection: Connection;

  /** The old source port */
  protected oldSourcePort: Port;

  /** The old target port */
  protected oldTargetPort: Port;

  /** The new source port */
  protected newSourcePort: Port | null;

  /** The new target port */
  protected newTargetPort: Port | null;

  /**
   * Set the new source port
   *
   * @param port The new source port
   */
  setNewSourcePort(port: Port): void;

  /**
   * Set the new target port
   *
   * @param port The new target port
   */
  setNewTargetPort(port: Port): void;

  /**
   * Returns true if the command can be executed
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