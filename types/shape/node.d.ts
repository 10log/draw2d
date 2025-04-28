import { Figure } from '../core/figure';
import { Color } from '../util/color';

/**
 * Node shapes namespace with diagram elements
 */
export namespace node {
  /**
   * Base class for all node shapes
   */
  export class Node extends Figure {
    /**
     * Creates a new node
     * @param attr Optional attributes for the node
     */
    constructor(attr?: any);

    /**
     * Set the color of the figure
     * @param color The new color
     * @returns this
     */
    setColor(color: string | Color): this;

    /**
     * Get the color of the figure
     * @returns The current color
     */
    getColor(): Color;

    /**
     * Set the background color
     * @param color The new background color
     * @returns this
     */
    setBackgroundColor(color: string | Color): this;

    /**
     * Get the background color
     * @returns The current background color
     */
    getBackgroundColor(): Color;

    /**
     * Create an InputPort for this node
     * @returns this
     */
    createPort(type: string, locator: any): any;
  }

  /**
   * A start node for a flowchart or process diagram
   */
  export class Start extends Node {
    /**
     * Creates a new start node
     * @param attr Optional attributes for the node
     */
    constructor(attr?: any);
  }

  /**
   * An end node for a flowchart or process diagram
   */
  export class End extends Node {
    /**
     * Creates a new end node
     * @param attr Optional attributes for the node
     */
    constructor(attr?: any);
  }

  /**
   * A between node for a flowchart or process diagram
   */
  export class Between extends Node {
    /**
     * Creates a new between node
     * @param attr Optional attributes for the node
     */
    constructor(attr?: any);
  }

  /**
   * A decision node for branching in flowcharts
   */
  export class Decision extends Node {
    /**
     * Creates a new decision node
     * @param attr Optional attributes for the node
     */
    constructor(attr?: any);
  }

  /**
   * A delay node for flowcharts
   */
  export class Delay extends Node {
    /**
     * Creates a new delay node
     * @param attr Optional attributes for the node
     */
    constructor(attr?: any);
  }

  /**
   * A vertex node (simple circle)
   */
  export class Vertex extends Node {
    /**
     * Creates a new vertex node
     * @param attr Optional attributes for the node
     */
    constructor(attr?: any);
  }
}
