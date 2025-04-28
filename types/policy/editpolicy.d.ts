import { Figure } from '../core/figure';
import { Canvas } from '../core/canvas';
import { Command } from '../command/command';
import { CommandType } from '../command/commandtype';

/**
 * Base interface for all edit policies in draw2d
 */
export interface EditPolicy {
  /**
   * The name of the policy
   */
  NAME: string;

  /**
   * Called if the policy is installed in a figure or canvas
   * @param host The figure or canvas where this policy is installed
   */
  onInstall(host: Figure | Canvas): void;

  /**
   * Called if the policy is removed from the figure or canvas
   * @param host The figure or canvas where this policy was installed
   */
  onUninstall(host: Figure | Canvas): void;
}

/**
 * Base class for edit policy implementations
 */
export class AbstractPolicy implements EditPolicy {
  /**
   * Creates a new policy
   */
  constructor();

  /**
   * The name of the policy
   */
  NAME: string;

  /**
   * Called if the policy is installed in a figure or canvas
   * @param host The figure or canvas where this policy is installed
   */
  onInstall(host: Figure | Canvas): void;

  /**
   * Called if the policy is removed from the figure or canvas
   * @param host The figure or canvas where this policy was installed
   */
  onUninstall(host: Figure | Canvas): void;
}

/**
 * Base class for all figure related edit policies
 */
export class FigureEditPolicy extends AbstractPolicy {
  /**
   * Creates a figure policy
   */
  constructor();
}

/**
 * Base class for all canvas related edit policies
 */
export class CanvasEditPolicy extends AbstractPolicy {
  /**
   * Creates a canvas policy
   */
  constructor();
}

/**
 * Base class for all connection related edit policies
 */
export class ConnectionEditPolicy extends AbstractPolicy {
  /**
   * Creates a connection policy
   */
  constructor();
}

/**
 * Policy for generating commands based on user requests
 */
export class CommandPolicy extends AbstractPolicy {
  /**
   * Creates a command policy
   */
  constructor();

  /**
   * Create a command for the given request
   * @param request The command request
   * @returns The created command or null
   */
  createCommand(request: CommandType): Command | null;
}
