import { Figure } from './figure';
import { Connection } from './connection';
import { Port } from './port';
import { ArrayList } from '../util/arraylist';
import { CommandStack } from '../command/commandstack';

/**
 * Required for Node.js draw2d model read/write operations.
 */
export class HeadlessCanvas {
  /**
   * Create a new headless canvas
   */
  constructor();

  /** The name identifier of this canvas */
  readonly NAME: string;

  /** All figures in the canvas */
  readonly figures: ArrayList<Figure>;

  /** All connections in the canvas */
  readonly lines: ArrayList<Connection>;

  /** All ports in the canvas */
  readonly commonPorts: ArrayList<Port>;

  /** Event subscriptions */
  readonly eventSubscriptions: Record<string, Function[]>;

  /** The command stack for undo/redo operations */
  readonly commandStack: CommandStack;

  /**
   * Reset the canvas and delete all model elements.
   * @returns this
   */
  clear(): this;

  /**
   * Callback method for image export tools
   */
  calculateConnectionIntersection(): void;

  /**
   * Hide decorations during image export
   */
  hideDecoration(): void;

  /**
   * Show decorations after image export
   */
  showDecoration(): void;

  /**
   * Add a figure to the canvas
   * @param figure The figure to add
   * @param x Optional x position
   * @param y Optional y position
   * @returns this
   */
  add(figure: Figure, x?: number, y?: number): this;

  /**
   * Get all lines/connections
   * @returns List of lines
   * @protected
   */
  getLines(): ArrayList<Connection>;

  /**
   * Get all figures
   * @returns List of figures
   * @protected
   */
  getFigures(): ArrayList<Figure>;

  /**
   * Get a line by ID
   * @param id The ID to find
   * @returns The line or null
   */
  getLine(id: string): Connection | null;

  /**
   * Get a figure by ID
   * @param id The ID to find
   * @returns The figure or null
   */
  getFigure(id: string): Figure | null;

  /**
   * Register a port
   * @param port The port to register
   * @returns this
   */
  registerPort(port: Port): this;

  /**
   * Get all ports
   * @returns List of all ports
   */
  getAllPorts(): ArrayList<Port>;

  /**
   * Get the command stack
   * @returns The command stack
   */
  getCommandStack(): CommandStack;

  /**
   * Trigger an event
   * @param event Event name
   * @param args Optional arguments
   */
  fireEvent(event: string, args?: any): void;

  /**
   * Register an event handler
   * @param event Space-separated event types
   * @param callback Handler function
   * @returns this
   */
  on(event: string, callback: (emitter: HeadlessCanvas, args?: any) => void): this;

  /**
   * Remove event handlers
   * @param eventOrFunction Event name or handler function
   * @returns this
   */
  off(eventOrFunction?: string | Function): this;
}
