import { Figure } from '../core/figure';

/**
 * PERT chart components (Program Evaluation and Review Technique)
 */
export namespace pert {
  /**
   * A PERT chart activity node
   */
  export class Activity extends Figure {
    /**
     * Creates a new activity node
     * @param attr Optional attributes for the activity
     */
    constructor(attr?: any);

    /**
     * Set the label for the activity
     * @param label The activity label
     * @returns this
     */
    setLabel(label: string): this;

    /**
     * Get the label for the activity
     * @returns The activity label
     */
    getLabel(): string;

    /**
     * Set the duration of the activity
     * @param duration The activity duration
     * @returns this
     */
    setDuration(duration: number): this;

    /**
     * Get the duration of the activity
     * @returns The activity duration
     */
    getDuration(): number;

    /**
     * Set the earliest start time
     * @param time The earliest start time
     * @returns this
     */
    setEarliestStart(time: number): this;

    /**
     * Get the earliest start time
     * @returns The earliest start time
     */
    getEarliestStart(): number;

    /**
     * Set the earliest finish time
     * @param time The earliest finish time
     * @returns this
     */
    setEarliestFinish(time: number): this;

    /**
     * Get the earliest finish time
     * @returns The earliest finish time
     */
    getEarliestFinish(): number;

    /**
     * Set the latest start time
     * @param time The latest start time
     * @returns this
     */
    setLatestStart(time: number): this;

    /**
     * Get the latest start time
     * @returns The latest start time
     */
    getLatestStart(): number;

    /**
     * Set the latest finish time
     * @param time The latest finish time
     * @returns this
     */
    setLatestFinish(time: number): this;

    /**
     * Get the latest finish time
     * @returns The latest finish time
     */
    getLatestFinish(): number;
  }

  /**
   * A start node for PERT charts
   */
  export class Start extends Figure {
    /**
     * Creates a new start node
     * @param attr Optional attributes for the start node
     */
    constructor(attr?: any);
  }
}