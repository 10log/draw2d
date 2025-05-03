import { Figure } from '../../core/figure';
import { Connection } from '../../core/connection';
import { Point, Rectangle } from '../../geo';
import { ConnectionAnchor } from './connectionanchor';

/**
 * The CenterEdgeConnectionAnchor's location is found by calculating the intersection of a
 * line drawn from the center point of its owner's box (the parent of the
 * connection port) to a reference point on that box. The anchor will be positioned
 * at the center of the nearest edge based on the reference point direction.
 */
export class CenterEdgeConnectionAnchor extends ConnectionAnchor {
  /**
   * Creates a new CenterEdgeConnectionAnchor
   * @param owner The figure to use for the anchor calculation
   */
  constructor(owner: Figure);

  /**
   * Returns the location where the Connection should be anchored in
   * absolute coordinates. The anchor may use the given reference
   * Point to calculate this location.
   *
   * @param reference The reference Point in absolute coordinates
   * @param inquiringConnection The connection who asks for the location
   * @returns The anchor's location
   */
  getLocation(reference: Point, inquiringConnection?: Connection): Point;

  /**
   * Returns the bounds of this Anchor's owner. Subclasses can
   * override this method to adjust the box. Maybe you return the box
   * of the port parent (the parent figure)
   *
   * @returns The bounds of this Anchor's owner
   */
  getBox(): Rectangle;

  /**
   * Returns the reference point for this anchor in absolute coordinates.
   * This might be used by another anchor to determine its own location.
   *
   * @param inquiringConnection The connection who asks for the location
   * @returns The reference point
   */
  getReferencePoint(inquiringConnection?: Connection): Point;
}