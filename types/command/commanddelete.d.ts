import { Command } from './command';
import { Figure } from '../core/figure';
import { Canvas } from '../core/canvas';
import { ArrayList } from '../util/arraylist';
import { Connection } from '../core/connection';

/**
 * Command to remove a figure with all its connections from a canvas.
 */
export class CommandDelete extends Command {
  /**
   * Create a delete command for the given figure.
   *
   * @param figure The figure to remove
   */
  constructor(figure: Figure);

  /** The figure to remove */
  protected figure: Figure;

  /** The parent of the figure */
  protected parent: Figure | null;

  /** Locator for the element */
  protected locator: any;

  /** The assigned canvas */
  protected canvas: Canvas | null;

  /** The composite figure which contains the figure if any exists */
  protected composite: Figure | null;

  /** Stores connections of the figure */
  protected connections: ArrayList<Connection>;

  /** All affected connections if the figure is a composite like a group */
  protected recursiveConnections: ArrayList<Connection>;

  /** All removed sub figures if the figure is a composite like a group */
  protected subFigures: ArrayList<Figure>;

  /** Cached children of the figure - using Map instead of Record */
  protected children: Map<Figure, any>;

  /**
   * Returns true if the command can be executed. A figure must be assigned to the canvas
   * and is not already deleted.
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
   * Redo the command after the user has undone it.
   * @returns True if successful
   */
  redo(): boolean;

  /**
   * Undo the command.
   * @returns True if successful
   */
  undo(): boolean;
}
