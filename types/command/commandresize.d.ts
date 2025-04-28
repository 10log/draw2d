import { Command } from './command';
import { Figure } from '../core/figure';
import { Rectangle } from '../geo/rectangle';

/**
 * Command to resize a figure with undo/redo support.
 */
export class CommandResize extends Command {
  /**
   * Create a resize command for the given figure.
   *
   * @param figure The figure to resize
   * @param width The new width
   * @param height The new height
   */
  constructor(figure: Figure, width: number, height: number);

  /** The figure to resize */
  protected figure: Figure;

  /** The new width */
  protected newWidth: number;

  /** The new height */
  protected newHeight: number;

  /** The old width */
  protected oldWidth: number;

  /** The old height */
  protected oldHeight: number;

  /** The old bounding box */
  protected oldBoundingBox: Rectangle;

  /**
   * Returns true if the command can be executed, i.e., if the figure exists and
   * the dimensions actually changed.
   *
   * @returns True if the command can be executed
   */
  canExecute(): boolean;

  /**
   * Execute the command the first time.
   * Resizes the figure to the new dimensions.
   * @returns True if successful
   */
  execute(): boolean;

  /**
   * Undo the command.
   * Resizes the figure to the old dimensions.
   * @returns True if successful
   */
  undo(): boolean;

  /**
   * Redo the command after it has been undone.
   * Resizes the figure to the new dimensions again.
   * @returns True if successful
   */
  redo(): boolean;
}
