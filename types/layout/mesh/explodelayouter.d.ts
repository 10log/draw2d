import { Canvas } from '../../core/canvas';
import { Figure } from '../../core/figure';
import { Rectangle } from '../../geo';
import { ArrayList } from '../../util/arraylist';
import { MeshLayouter } from './meshlayouter';
import { ProposedMeshChange } from './proposedmeshchange';

/**
 * ExplodeLayouter is a specialized mesh layouter that arranges figures by 
 * "pushing" them away from each other when they get too close,
 * creating an exploding effect.
 */
export class ExplodeLayouter extends MeshLayouter {
  /**
   * Creates a new ExplodeLayouter.
   */
  constructor();

  /** Minimum margin between figures */
  MIN_MARGIN: number;

  /**
   * Return a changes list for an existing mesh/canvas to ensure that the element to insert 
   * has enough space. This calculates how existing figures need to move to accommodate
   * the new figure with proper spacing.
   * 
   * @param canvas The canvas to use for the analysis
   * @param figureToAdd The figure to add to the existing canvas
   * @returns A list of changes to apply if the user wants to insert the figure
   */
  add(canvas: Canvas, figureToAdd: Figure): ArrayList<ProposedMeshChange>;

  /**
   * Determine which octant a rectangle is in relative to another rectangle.
   * The octants are numbered 0-8:
   *
   *     0 | 1 | 2
   *    ---|---|---
   *     7 | 8 | 3
   *    ---|---|---
   *     6 | 5 | 4
   *
   * where 8 represents an overlap of the two rectangles.
   *
   * @param r1 The reference rectangle
   * @param r2 The rectangle to test
   * @returns The octant number (0-8)
   */
  determineOctant(r1: Rectangle, r2: Rectangle): number;
}