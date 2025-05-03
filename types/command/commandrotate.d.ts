import { Command } from './command';
import { Figure } from '../core/figure';
import { Point } from '../geo/point';

/**
 * Command to rotate a figure with undo/redo support.
 */
export class CommandRotate extends Command {
  /**
   * Create a rotate command for the given figure.
   *
   * @param figure The figure to rotate
   * @param angle The rotation angle in degrees
   */
  constructor(figure: Figure, angle: number);

  /** The figure to rotate */
  protected figure: Figure;

  /** The new rotation angle */
  protected newAngle: number;

  /** The old rotation angle */
  protected oldAngle: number;

  /**
   * Returns true if the command can be executed, i.e., if the figure exists and
   * the angle actually changed.
   *
   * @returns True if the command can be executed
   */
  canExecute(): boolean;

  /**
   * Execute the command the first time.
   * Rotates the figure.
   * @returns True if successful
   */
  execute(): boolean;

  /**
   * Undo the command.
   * Restores the original angle.
   * @returns True if successful
   */
  undo(): boolean;

  /**
   * Redo the command after it has been undone.
   * Applies the rotation again.
   * @returns True if successful
   */
  redo(): boolean;
}