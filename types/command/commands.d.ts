import { Figure } from '../core/figure';
import { Canvas } from '../core/canvas';
import { Command } from './command';
import { Point } from '../geo';

/**
 * Command to add a figure to a canvas
 */
export class CommandAdd extends Command {
  /**
   * Create a new add command
   * @param figure The figure to add
   * @param x The x position
   * @param y The y position
   * @param canvas The canvas to add the figure to
   */
  constructor(figure: Figure, x: number, y: number, canvas: Canvas);

  /** The figure to add */
  figure: Figure;

  /** The x position */
  x: number;

  /** The y position */
  y: number;

  /** The target canvas */
  canvas: Canvas;

  /**
   * Execute the command (add the figure to the canvas)
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

/**
 * Command to delete a figure from a canvas
 */
export class CommandDelete extends Command {
  /**
   * Create a new delete command
   * @param figure The figure to delete
   */
  constructor(figure: Figure);

  /** The figure to delete */
  figure: Figure;

  /** The canvas the figure belongs to */
  canvas: Canvas | null;

  /** Original position of the figure */
  pos: Point | null;

  /**
   * Execute the command (delete the figure)
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

/**
 * Command to move a figure
 */
export class CommandMove extends Command {
  /**
   * Create a new move command
   * @param figure The figure to move
   * @param x The new x position
   * @param y The new y position
   */
  constructor(figure: Figure, x: number, y: number);

  /** The figure to move */
  figure: Figure;

  /** The new x position */
  newX: number;

  /** The new y position */
  newY: number;

  /** The old x position */
  oldX: number;

  /** The old y position */
  oldY: number;

  /**
   * Execute the command (move the figure)
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

/**
 * Command to connect two figures
 */
export class CommandConnect extends Command {
  /**
   * Create a new connect command
   * @param source The source port
   * @param target The target port
   * @param connection The connection to create
   * @param canvas The canvas
   */
  constructor(source: any, target: any, connection: any, canvas: Canvas);

  /** The source port */
  source: any;

  /** The target port */
  target: any;

  /** The connection */
  connection: any;

  /** The canvas */
  canvas: Canvas;

  /**
   * Execute the command (create the connection)
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
