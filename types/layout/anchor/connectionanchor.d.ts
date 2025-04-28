import { Figure } from '../../core/figure';
import { Connection } from '../../core/connection';
import { Point, Rectangle } from '../../geo';

/**
 * An object to which a Connection will be anchored.
 * This is the base class for all connection anchor implementations.
 */
export class ConnectionAnchor {
  /**
   * Creates a new ConnectionAnchor
   * @param owner The figure to use for anchor calculation
   */
  constructor(owner: Figure);

  /** The figure that contains this ConnectionAnchor */
  owner: Figure;

  /**
   * Returns the location where the Connection should be anchored in absolute coordinates.
   * The anchor may use the given reference Point to calculate this location.
   *
   * @param reference The opposite reference point
   * @param inquiringConnection The connection that asks for the location
   * @returns The location point in absolute coordinates
   */
  getLocation(reference: Point, inquiringConnection: Connection): Point;

  /**
   * Returns the Figure that contains this ConnectionAnchor.
   * @returns The Figure that contains this ConnectionAnchor
   */
  getOwner(): Figure;

  /**
   * Set the owner of the Anchor.
   * @param owner The new owner of the anchor locator
   */
  setOwner(owner: Figure): void;

  /**
   * Returns the bounds of this Anchor's owner. Subclasses can override this method
   * to adjust the box. Maybe you return the box of the port parent (the parent figure)
   * @returns The bounds of this Anchor's owner
   */
  getBox(): Rectangle;

  /**
   * Returns the reference point for this anchor in absolute coordinates. This might be used
   * by another anchor to determine its own location.
   * @param inquiringConnection The connection who asks for the location
   * @returns The reference Point
   */
  getReferencePoint(inquiringConnection?: Connection): Point;
}