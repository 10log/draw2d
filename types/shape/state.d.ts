import { Figure } from '../core/figure';
import { Connection } from '../core/connection';

/**
 * State machine diagram components
 */
export namespace state {
  /**
   * A state machine state node
   */
  export class State extends Figure {
    /**
     * Creates a new state node
     * @param attr Optional attributes for the state
     */
    constructor(attr?: any);

    /**
     * Set the name of the state
     * @param name The state name
     * @returns this
     */
    setName(name: string): this;

    /**
     * Get the name of the state
     * @returns The state name
     */
    getName(): string;
  }

  /**
   * A connection between state nodes
   */
  export class Connection extends Connection {
    /**
     * Creates a new state connection
     * @param attr Optional attributes for the connection
     */
    constructor(attr?: any);

    /**
     * Set the label for the transition
     * @param label The transition label
     * @returns this
     */
    setLabel(label: string): this;

    /**
     * Get the label for the transition
     * @returns The transition label
     */
    getLabel(): string;
  }

  /**
   * A start state node
   */
  export class Start extends Figure {
    /**
     * Creates a new start state
     * @param attr Optional attributes for the start state
     */
    constructor(attr?: any);
  }

  /**
   * An end state node
   */
  export class End extends Figure {
    /**
     * Creates a new end state
     * @param attr Optional attributes for the end state
     */
    constructor(attr?: any);
  }
}