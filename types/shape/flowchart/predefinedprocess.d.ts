import { FlexGridLayout } from '../layout/flexgridlayout';
import { Label } from '../basic/label';

/**
 * A predefined process shape for flowchart diagrams.
 *
 * Layout:
 *     10px       grow         10px
 *
 *    -----+------------------+-----
 *    |    |  <LABEL>         |    |
 *    |    |                  |    |
 *    |    |                  |    |    grow
 *    |    |                  |    |
 *    |    |                  |    |
 *    -----+------------------+-----
 */
export class PredefinedProcess extends FlexGridLayout {
  /**
   * Create a new PredefinedProcess element
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The label for the process name */
  readonly label: Label;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}
