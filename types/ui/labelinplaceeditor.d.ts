import { CommandAttr } from '../command/commandattr';
import { Canvas } from '../core/canvas';
import { Label } from '../shape/basic/label';
import { LabelEditor } from './labeleditor';

/**
 * Inplace editor for Label elements
 * Provides an inline text editor that appears directly on the canvas
 */
export class LabelInplaceEditor extends LabelEditor {
  /** The label being edited */
  protected label: Label;

  /** The HTML input element used for editing */
  protected html: any; // JQuery;

  /** The commit callback function */
  protected commitCallback: () => void;

  /** Listener configuration */
  protected listener: {
    /** Callback when the edit is committed */
    onCommit: (text?: string) => void;
    /** Callback when the edit is canceled */
    onCancel: () => void;
    /** Callback when the edit starts */
    onStart: () => void;
  };

  /**
   * Creates a new inplace label editor
   * @param listener Configuration options and callback handlers
   */
  constructor(listener?: {
    /** Callback when the edit is committed */
    onCommit?: (text?: string) => void;
    /** Callback when the edit is canceled */
    onCancel?: () => void;
    /** Callback when the edit starts */
    onStart?: () => void;
  });

  /**
   * Trigger the edit of the label text
   * @param label The label to edit
   */
  start(label: Label): void;

  /**
   * Transfer the data from the editor into the label and remove the editor
   * @private
   */
  protected commit(): void;

  /**
   * Cancel editing and remove the editor
   * @private
   */
  protected cancel(): void;
}
