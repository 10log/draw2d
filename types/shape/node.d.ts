import { Figure } from '../core/figure';
import { Color } from '../util/color';

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
   * @param type The port type ('input', 'output', or hybrid)
   * @param locator Optional locator for positioning
   * @returns The created port
   */
  createPort(type: string, locator?: any): any;

  /**
   * Get all ports
   * @returns Array of ports
   */
  getPorts(): any;
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

/**
 * A hub node with multiple connections
 */
export class Hub extends Node {
  /**
   * Creates a new hub node
   * @param attr Optional attributes for the hub
   */
  constructor(attr?: any);
}

/**
 * A fulcrum node for connections
 */
export class Fulcrum extends Node {
  /**
   * Creates a new fulcrum node
   * @param attr Optional attributes for the node
   */
  constructor(attr?: any);
}

/**
 * A horizontal bus for connections
 */
export class HorizontalBus extends Node {
  /**
   * Creates a new horizontal bus
   * @param attr Optional attributes for the bus
   */
  constructor(attr?: any);
}

/**
 * A vertical bus for connections
 */
export class VerticalBus extends Node {
  /**
   * Creates a new vertical bus
   * @param attr Optional attributes for the bus
   */
  constructor(attr?: any);
}

// Export namespace for backwards compatibility
export namespace node {
  export { 
    Node, Start, End, Between, Decision, Delay, Vertex,
    Hub, Fulcrum, HorizontalBus, VerticalBus 
  };
}
