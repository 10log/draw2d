import { Command } from './command';
import { Connection } from '../core/connection';
import { Point } from '../geo/point';

/**
 * Command to move a connection with command stack support.
 */
export class CommandMoveConnection extends Command {
  /**
   * Create a move connection command.
   *
   * @param connection The connection to move
   * @param dx The x offset for the move operation
   * @param dy The y offset for the move operation
   */
  constructor(connection: Connection, dx: number, dy: number);

  /** The connection to move */
  protected connection: Connection;

  /** The x offset */
  protected dx: number;

  /** The y offset */
  protected dy: number;

  /** The old connection vertices */
  protected oldVertices: Point[];

  /** The new connection vertices */
  protected newVertices: Point[];

  /**
   * Returns true if the command can be executed, i.e., if the offset is not zero.
   *
   * @returns True if the command can be executed
   */
  canExecute(): boolean;

  /**
   * Execute the command the first time.
   * Apply the offset to the connection.
   * @returns True if successful
   */
  execute(): boolean;

  /**
   * Undo the command.
   * Reset to the old connection vertices.
   * @returns True if successful
   */
  undo(): boolean;

  /**
   * Redo the command after it has been undone.
   * Apply the offset to the connection again.
   * @returns True if successful
   */
  redo(): boolean;
}
