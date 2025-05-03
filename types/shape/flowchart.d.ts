import { Figure } from '../core/figure';
import { Color } from '../util/color';
import { node } from './node';

/**
 * Flowchart shapes namespace with diagram elements for flowcharts
 */
export namespace flowchart {
  /**
   * Base flowchart element
   */
  export class FlowChartBase extends node.Node {
    /**
     * Creates a new flowchart element
     * @param attr Optional attributes for the element
     */
    constructor(attr?: any);
  }

  /**
   * A process shape for flowcharts
   */
  export class Process extends FlowChartBase {
    /**
     * Creates a new process shape
     * @param attr Optional attributes for the shape
     */
    constructor(attr?: any);
  }

  /**
   * A decision diamond shape for flowcharts
   */
  export class Decision extends FlowChartBase {
    /**
     * Creates a new decision shape
     * @param attr Optional attributes for the shape
     */
    constructor(attr?: any);
  }

  /**
   * A document shape for flowcharts
   */
  export class Document extends FlowChartBase {
    /**
     * Creates a new document shape
     * @param attr Optional attributes for the shape
     */
    constructor(attr?: any);
  }

  /**
   * A predefined process shape for flowcharts
   */
  export class PredefinedProcess extends FlowChartBase {
    /**
     * Creates a new predefined process shape
     * @param attr Optional attributes for the shape
     */
    constructor(attr?: any);
  }

  /**
   * A loop limit (start/end) shape for flowcharts
   */
  export class LoopLimit extends FlowChartBase {
    /**
     * Creates a new loop limit shape
     * @param attr Optional attributes for the shape
     */
    constructor(attr?: any);
  }

  /**
   * A preparation shape for flowcharts
   */
  export class Preparation extends FlowChartBase {
    /**
     * Creates a new preparation shape
     * @param attr Optional attributes for the shape
     */
    constructor(attr?: any);
  }

  /**
   * A data shape for flowcharts
   */
  export class Data extends FlowChartBase {
    /**
     * Creates a new data shape
     * @param attr Optional attributes for the shape
     */
    constructor(attr?: any);
  }

  /**
   * A manual input shape for flowcharts
   */
  export class ManualInput extends FlowChartBase {
    /**
     * Creates a new manual input shape
     * @param attr Optional attributes for the shape
     */
    constructor(attr?: any);
  }

  /**
   * A manual operation shape for flowcharts
   */
  export class ManualOperation extends FlowChartBase {
    /**
     * Creates a new manual operation shape
     * @param attr Optional attributes for the shape
     */
    constructor(attr?: any);
  }
}
