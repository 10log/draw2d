import { Figure } from '../../core/figure';

/**
 * Change proposal for grid/mesh layout changes.
 * Represents a suggested position change for a figure within a mesh layout.
 */
export class ProposedMeshChange {
  /**
   * Creates a change object.
   *
   * @param figure The figure to reposition
   * @param x The proposed x-coordinate
   * @param y The proposed y-coordinate
   */
  constructor(figure: Figure, x: number, y: number);

  /** The figure to change */
  figure: Figure;

  /** The proposed x-coordinate */
  x: number;

  /** The proposed y-coordinate */
  y: number;

  /**
   * Return the related figure.
   *
   * @returns The figure related to this change proposal
   */
  getFigure(): Figure;

  /**
   * The proposed x-coordinate.
   *
   * @returns The x-coordinate
   */
  getX(): number;

  /**
   * The proposed y-coordinate.
   *
   * @returns The y-coordinate
   */
  getY(): number;
}
