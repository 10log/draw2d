import { Figure } from '../core/figure';
import { ArrayList } from '../util/arraylist';
import { ResizeHandle } from '../core/resizehandle';

/**
 * Composite components that can contain other figures
 */
export namespace composite {
  /**
   * Base class for all composite figures
   */
  export class Composite extends Figure {
    /**
     * Creates a new composite figure
     * @param attr Optional attributes for the composite
     */
    constructor(attr?: any);

    /**
     * Add a figure to this composite
     * @param figure The figure to add
     * @returns this
     */
    addFigure(figure: Figure): this;

    /**
     * Remove a figure from this composite
     * @param figure The figure to remove
     * @returns The removed figure or null
     */
    removeFigure(figure: Figure): Figure | null;

    /**
     * Get all child figures
     * @returns The list of figures
     */
    getAssignedFigures(): ArrayList<Figure>;

    /**
     * Check if a figure is assigned to this composite
     * @param figure The figure to check
     * @returns True if figure is assigned
     */
    containsFigure(figure: Figure): boolean;
  }

  /**
   * A group container that can hold multiple figures
   */
  export class Group extends Composite {
    /**
     * Creates a new group
     * @param attr Optional attributes for the group
     */
    constructor(attr?: any);
  }

  /**
   * A jailhouse composite with fixed grid layout
   */
  export class Jailhouse extends Composite {
    /**
     * Creates a new jailhouse composite
     * @param attr Optional attributes for the jailhouse
     */
    constructor(attr?: any);
  }

  /**
   * A raft composite with free-form layout
   */
  export class Raft extends Composite {
    /**
     * Creates a new raft composite
     * @param attr Optional attributes for the raft
     */
    constructor(attr?: any);
  }

  /**
   * A resize handle for raft composites
   */
  export class RaftResizeHandle extends ResizeHandle {
    /**
     * Creates a new raft resize handle
     * @param owner The raft that owns this handle
     */
    constructor(owner: Raft);
  }

  /**
   * A strong composite where children move with the composite
   */
  export class StrongComposite extends Composite {
    /**
     * Creates a new strong composite
     * @param attr Optional attributes for the composite
     */
    constructor(attr?: any);
  }

  /**
   * A weak composite where children remain in place when composite moves
   */
  export class WeakComposite extends Composite {
    /**
     * Creates a new weak composite
     * @param attr Optional attributes for the composite
     */
    constructor(attr?: any);
  }
}