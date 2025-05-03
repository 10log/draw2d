import { Command } from './command';
import { Figure } from '../core/figure';
import { ArrayList } from '../util/arraylist';
import { Rectangle } from '../geo/rectangle';

/**
 * Assign a figure to a composite
 */
export class CommandAssignFigure extends Command {
  /**
   * Create a new Command object which can be executed via the CommandStack.
   *
   * @param figure The figure to assign
   * @param composite The composite where the figure should be assigned
   */
  constructor(figure: Figure, composite: Figure);

  /** The figure to assign */
  protected figure: Figure;

  /** The composite where the figure should be assigned */
  protected composite: Figure;

  /** List of connections that were automatically assigned */
  protected assignedConnections: ArrayList<{ oldComposite: Figure | null, connection: Figure }>;

  /** Whether the figure is a node */
  protected isNode: boolean;

  /** The old bounding box of the composite */
  protected oldBoundingBox: Rectangle;

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
   * Undo the command
   * @returns True if successful
   */
  undo(): boolean;

  /**
   * Redo the command after the user has undone this command
   * @returns True if successful
   */
  redo(): boolean;
}