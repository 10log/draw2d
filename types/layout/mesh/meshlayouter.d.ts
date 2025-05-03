import { Canvas } from '../../core/canvas';
import { Figure } from '../../core/figure';
import { ArrayList } from '../../util/arraylist';

/**
 * Layouter for a mesh or grid.
 * Provides utilities to arrange figures in a mesh/grid layout structure.
 */
export class MeshLayouter {
  /**
   * Creates a new layouter object.
   */
  constructor();

  /**
   * Return a changes list for an existing mesh/canvas to ensure that the element to insert
   * has enough space.
   *
   * @param canvas The canvas to use for the analysis
   * @param figure The figure to add to the existing canvas
   * @returns A list of changes to apply if the user wants to insert the figure
   */
  add(canvas: Canvas, figure: Figure): ArrayList;
}